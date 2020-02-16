import {Inputs, Outputs} from '../src/interfaces';
import {getInputs, getOutputs} from '../src/get-inputs-and-outputs';

beforeEach(() => {
  jest.resetModules();
});

afterEach(() => {
  delete process.env['INPUT_TERRAGRUNT_VERSION'];
});

describe('getInputs()', () => {
  test('get spec inputs', () => {
    process.env['INPUT_TERRAGRUNT_VERSION'] = 'v0.21.13';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.21.13');
  });

  test('get spec input prefixes with v', () => {
    process.env['INPUT_TERRAGRUNT_VERSION'] = '0.21.13';

    const inputs: Inputs = getInputs();

    expect(inputs.TerragruntVersion).toMatch('v0.21.13');
  });

  test('get spec outputs', () => {
    const outputs: Outputs = getOutputs();

    expect(outputs.TerragruntPath).toMatch('terragrunt_path');
  });
});
