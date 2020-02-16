import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import {getInputs, getOutputs} from './get-inputs-and-outputs';

const executableName = 'terragrunt';
const fullExecutableFormat = 'terragrunt_%s_amd64';
const downloadUrlFormat = `https://github.com/gruntwork-io/terragrunt/releases/download/%s/${fullExecutableFormat}`;

export function getExecutableExtension(): string {
  core.info(`[INFO] OS Type: '${os.type()}'`);
  if (os.type().match(/^Win/)) {
    return '.exe';
  }
  return '';
}

export function getDownloadURL(version: string): string {
  switch (os.type()) {
    case 'Windows_NT':
      return `${util.format(downloadUrlFormat, version, 'windows')}.exe`;

    case 'Darwin':
      return util.format(downloadUrlFormat, version, 'darwin');

    case 'Linux':
    default:
      return util.format(downloadUrlFormat, version, 'linux');
  }
}

export function getFullExecutableName(): string {
  switch (os.type()) {
    case 'Windows_NT':
      return `${util.format(fullExecutableFormat, 'windows')}.exe`;

    case 'Darwin':
      return util.format(fullExecutableFormat, 'darwin');

    case 'Linux':
    default:
      return util.format(fullExecutableFormat, 'linux');
  }
}

const walkSync = function(
  dir: string,
  filelist: string[],
  fileToFind: string
): string[] {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist, fileToFind);
    } else {
      core.debug(file);
      if (file == fileToFind) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

export function findExecutable(rootFolder: string): string {
  fs.chmodSync(rootFolder, '777');
  const filelist: string[] = [];
  walkSync(rootFolder, filelist, executableName + getExecutableExtension());
  if (!filelist) {
    throw new Error(
      util.format('Terragrunt executable not found in path ', rootFolder)
    );
  } else {
    return filelist[0];
  }
}

export async function downloadTerragrunt(version: string): Promise<string> {
  core.info(`[INFO] Setting up Terragrunt version: '${version}'`);
  let cachedToolpath = toolCache.find(executableName, version);
  if (!cachedToolpath) {
    let dlPath: string;
    const dlURL = getDownloadURL(version);
    core.info(`[INFO] Downloading from: '${dlURL}'`);
    try {
      dlPath = await toolCache.downloadTool(dlURL);
    } catch (exception) {
      throw new Error(
        util.format('Failed to download Terragrunt from ', dlURL)
      );
    }

    // Changing temp path permissions
    fs.chmodSync(dlPath, '777');

    // Make it executable
    const absExecutable = `${dlPath}${path.sep}${getFullExecutableName()}`;
    const newExecutable = `${dlPath}${
      path.sep
    }terragrunt${getExecutableExtension()}`;
    core.info(`[INFO] Setting file permissions 755 to: '${absExecutable}'`);
    core.info(`[DEBUG] Stat: '${fs.statSync(dlPath)}'`);

    fs.chmodSync(absExecutable, '755');

    // Rename
    fs.renameSync(absExecutable, newExecutable);

    // Cache the tool
    cachedToolpath = await toolCache.cacheDir(dlPath, executableName, version);
  }

  const executablePath = findExecutable(cachedToolpath);
  if (!executablePath) {
    throw new Error(
      util.format('Terragrunt executable not found in path ', cachedToolpath)
    );
  }

  fs.chmodSync(executablePath, '777');
  return executablePath;
}

export async function run(): Promise<void> {
  const terragruntVersion: string = getInputs().TerragruntVersion;
  const cachedPath = await downloadTerragrunt(terragruntVersion);

  // Add the cached tool to path
  core.addPath(path.dirname(cachedPath));
  core.info(
    `[INFO] Terragrunt version: '${terragruntVersion}' has been cached at ${cachedPath}`
  );
  core.setOutput(getOutputs().TerragruntPath, cachedPath);
}
