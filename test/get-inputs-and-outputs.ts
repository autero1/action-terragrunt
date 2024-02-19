import {Inputs, Outputs} from '../src/interfaces';
import {getInputs, getOutputs} from '../src/get-inputs-and-outputs';
import assert from 'node:assert/strict';
import {afterEach, beforeEach, describe, it, mock} from 'node:test';

beforeEach(() => {
  mock.reset();
});

afterEach(() => {
  delete process.env['INPUT_TERRAGRUNT-VERSION'];
  delete process.env['INPUT_TERRAGRUNT-VERSION-FILE'];
  delete process.env['GITHUB_WORKSPACE'];
});

describe('getInputs()', () => {
  it('should get proper value from version input', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'v0.21.13';

    const inputs: Inputs = getInputs();

    assert.strictEqual(inputs.TerragruntVersion, 'v0.21.13');
  });

  it('should get proper value from input version file only', () => {
    process.env['GITHUB_WORKSPACE'] = './test';
    process.env['INPUT_TERRAGRUNT-VERSION-FILE'] = '.terragrunt-version';

    const inputs: Inputs = getInputs();

    assert.strictEqual(inputs.TerragruntVersion, 'v0.50.0');
  });

  it('should get proper value from input version latest', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'latest';

    const inputs: Inputs = getInputs();

    assert.strictEqual(inputs.TerragruntVersion, 'latest');
  });

  it('should get proper value from input version and version-file', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'v0.22.0';
    process.env['INPUT_TERRAGRUNT-VERSION-FILE'] = '.terragrunt-version';

    const inputs: Inputs = getInputs();

    assert.strictEqual(inputs.TerragruntVersion, 'v0.22.0');
  });

  it('should get proper value from neither input version or version-file', () => {
    const inputs: Inputs = getInputs();
    assert.strictEqual(inputs.TerragruntVersion, '');
  });

  it('should prefix with v', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = '0.21.13';

    const inputs: Inputs = getInputs();

    assert.strictEqual(inputs.TerragruntVersion, 'v0.21.13');
  });

  it('should get spec outputs', () => {
    const outputs: Outputs = getOutputs();

    assert.strictEqual(outputs.TerragruntPath, 'terragrunt-path');
  });
});
