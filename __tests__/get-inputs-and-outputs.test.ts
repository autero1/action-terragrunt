import {Inputs, Outputs} from '../src/interfaces';
import {getInputs, getOutputs} from '../src/get-inputs-and-outputs';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_TERRAGRUNT-VERSION'];
  delete process.env['INPUT_TERRAGRUNT-VERSION-FILE'];
  delete process.env['GITHUB_WORKSPACE'];
});

describe('getInputs()', () => {
  test('get spec input version only', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'v0.21.13';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.21.13');
  });

  test('get spec input version file only', () => {
    process.env['GITHUB_WORKSPACE'] = './__tests__';
    process.env['INPUT_TERRAGRUNT-VERSION-FILE'] = '.terragrunt-version';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.50.0');
  });

  test('get spec input version latest', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'latest';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('latest');
  });

  test('get spec input version and version-file', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'v0.22.0';
    process.env['INPUT_TERRAGRUNT-VERSION-FILE'] = '.terragrunt-version';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.22.0');
  });

  test('get spec neither input version or version-file', () => {
    const inputs: Inputs = getInputs();
    expect(inputs.TerragruntVersion).toMatch('');
  });

  test('get spec input prefixes with v', () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = '0.21.13';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.21.13');
  });

  test('get spec outputs', () => {
    const outputs: Outputs = getOutputs();

    expect(outputs.TerragruntPath).toMatch('terragrunt-path');
  });
});
