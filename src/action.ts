import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import {Octokit} from '@octokit/rest';
import {getInputs, getOutputs} from './get-inputs-and-outputs';

const executableName = 'terragrunt';
const fullExecutableFormat = 'terragrunt_%s_amd64';
const downloadUrlFormat = `https://github.com/gruntwork-io/terragrunt/releases/download/%s/${fullExecutableFormat}`;

export function getExecutableExtension(): string {
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

export const getLatestVersion = async (): Promise<string | null> => {
  const octokit = new Octokit();

  const latestRelease = await octokit.repos.getLatestRelease({
    owner: 'gruntwork-io',
    repo: 'terragrunt'
  });

  return latestRelease.data.name;
};

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

  let actualVersion = version;

  // Get latest version number and reassign version param to it.
  if (version.toLowerCase() === 'latest') {
    const latestVersion = await getLatestVersion();
    actualVersion = latestVersion || '';
    core.info(`[INFO] Latest Terragrunt version: '${actualVersion}'`);
  }

  // See if we already have it installed
  let cachedToolpath = toolCache.find(executableName, actualVersion);
  if (!cachedToolpath) {
    let dlPath: string;
    const dlURL = getDownloadURL(actualVersion);
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

    // Cache the tool
    cachedToolpath = await toolCache.cacheFile(
      dlPath,
      executableName + getExecutableExtension(),
      executableName,
      actualVersion
    );
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
