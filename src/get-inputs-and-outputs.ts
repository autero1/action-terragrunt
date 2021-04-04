import * as core from '@actions/core';
import {Inputs, Outputs} from './interfaces';

function showInputs(inps: Inputs): void {
  core.info(`[INFO] TerragruntVersion: ${inps.TerragruntVersion}`);
}

export function getInputs(): Inputs {
  let tgVersion = core.getInput('terragrunt_version');
  if (!tgVersion.startsWith('v') && tgVersion.toLowerCase() !== 'latest') {
    tgVersion = `v${tgVersion}`;
  }
  const inps: Inputs = {
    TerragruntVersion: tgVersion
  };

  showInputs(inps);

  return inps;
}

export function getOutputs(): Outputs {
  const outs: Outputs = {
    TerragruntPath: 'terragrunt_path'
  };

  return outs;
}
