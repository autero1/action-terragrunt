import * as core from '@actions/core';
import {Inputs, Outputs} from './interfaces';
import * as path from 'path';
import fs from 'fs';

function showInputs(inps: Inputs): void {
  core.info(`[INFO] TerragruntVersion: ${inps.TerragruntVersion}`);
}

export function getTerragruntVersionFromFile(versionFilePath: string): string {
  if (!fs.existsSync(versionFilePath)) {
    throw new Error(
      `The specified Terragrunt version file at: ${versionFilePath} does not exist`
    );
  }

  const contents = fs.readFileSync(versionFilePath, 'utf8');
  return contents.trim().replace(/\r?\n|\r/g, '');
}

function prepareInputs(tgVersion: string): Inputs {
  if (
    tgVersion &&
    !tgVersion.startsWith('v') &&
    tgVersion.toLowerCase() !== 'latest'
  ) {
    tgVersion = `v${tgVersion}`;
  }

  const token = core.getInput('token') || undefined;

  const inps: Inputs = {
    TerragruntVersion: tgVersion,
    GithubToken: token
  };

  showInputs(inps);

  return inps;
}

export function getInputs(): Inputs {
  let tgVersion = core.getInput('terragrunt-version');
  const tgVersionFile = core.getInput('terragrunt-version-file');

  if (tgVersion && tgVersionFile) {
    core.warning(
      '[WARN] Both terragrunt-version and terragrunt-version-file inputs are specified, only terragrunt-version will be used'
    );
    return prepareInputs(tgVersion);
  }

  if (tgVersionFile) {
    const versionFilePath = path.join(
      process.env.GITHUB_WORKSPACE!,
      tgVersionFile
    );

    tgVersion = getTerragruntVersionFromFile(versionFilePath);
  }
  return prepareInputs(tgVersion);
}

export function getOutputs(): Outputs {
  const outs: Outputs = {
    TerragruntPath: 'terragrunt-path'
  };

  return outs;
}
