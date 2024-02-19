import * as assert from 'assert';
import os from 'node:os';
import {getDownloadURL, getLatestVersion} from '../src/action';
import got from 'got';
import {afterEach, describe, it, mock} from 'node:test';

afterEach(() => {
  delete process.env['INPUT_TERRAGRUNT-VERSION'];
  delete process.env['INPUT_TERRAGRUNT-VERSION-FILE'];
  delete process.env['GITHUB_WORKSPACE'];
  mock.reset();
  mock.restoreAll();
});

async function checkHead(url: string): Promise<number> {
  const response = await got.get(url, {followRedirect: false});
  return response.statusCode;
}

describe('getDownloadURL()', () => {
  it('get windows url', async () => {
    mock.method(os, 'type', () => {
      return 'Windows_NT';
    });
    mock.method(os, 'arch', () => {
      return 'x64';
    });
    const winDLUrl = getDownloadURL('v0.21.13');
    assert.strictEqual(
      winDLUrl,
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_windows_amd64.exe'
    );
    assert.strictEqual(await checkHead(winDLUrl), 302);
  });

  it('get darwin url', async () => {
    mock.method(os, 'type', () => {
      return 'Darwin';
    });
    mock.method(os, 'arch', () => {
      return 'x64';
    });
    const darwinDLUrl = getDownloadURL('v0.21.13');
    assert.strictEqual(
      darwinDLUrl,
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_darwin_amd64'
    );
    assert.strictEqual(await checkHead(darwinDLUrl), 302);
  });

  it('get linux url', async () => {
    mock.method(os, 'type', () => {
      return 'Linux';
    });
    mock.method(os, 'arch', () => {
      return 'x64';
    });
    const linuxDLUrl = getDownloadURL('v0.21.13');
    assert.strictEqual(
      linuxDLUrl,
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_linux_amd64'
    );
    assert.strictEqual(await checkHead(linuxDLUrl), 302);
  });

  it('get latest url', async () => {
    process.env['INPUT_TERRAGRUNT-VERSION'] = 'latest';
    const latestVersion = (await getLatestVersion()) || '';
    mock.method(os, 'type', () => {
      return 'Linux';
    });
    mock.method(os, 'arch', () => {
      return 'x64';
    });
    const linuxDLUrl = getDownloadURL(latestVersion);
    assert.strictEqual(await checkHead(linuxDLUrl), 302);
  });
});
