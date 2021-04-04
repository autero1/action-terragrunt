import * as os from 'os';
import {getDownloadURL, getLatestVersion} from '../src/action';
import got from 'got';

jest.mock('os');

async function checkHead(url: string): Promise<number> {
  // Due to funky redirects with GitHub, just making sure we get the 302 found and not follow
  const response = await got.get(url, {followRedirect: false});
  return response.statusCode;
}

describe('getDownloadURL()', () => {
  test('get windows url', async () => {
    const spy = jest.spyOn(os, 'type');
    spy.mockReturnValue('Windows_NT');
    const winDLUrl = getDownloadURL('v0.21.13');
    expect(winDLUrl).toBe(
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_windows_amd64.exe'
    );
    expect(await checkHead(winDLUrl)).toEqual(302);
  });

  test('get darwin url', async () => {
    const spy = jest.spyOn(os, 'type');
    spy.mockReturnValue('Darwin');
    const darwinDLUrl = getDownloadURL('v0.21.13');
    expect(darwinDLUrl).toBe(
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_darwin_amd64'
    );
    expect(await checkHead(darwinDLUrl)).toEqual(302);
  });

  test('get linux url', async () => {
    const spy = jest.spyOn(os, 'type');
    spy.mockReturnValue('Linux');
    const linuxDLUrl = getDownloadURL('v0.21.13');
    expect(linuxDLUrl).toBe(
      'https://github.com/gruntwork-io/terragrunt/releases/download/v0.21.13/terragrunt_linux_amd64'
    );
    expect(await checkHead(linuxDLUrl)).toEqual(302);
  });

  test('get latest url', async () => {
    const latestVersion = (await getLatestVersion()) || '';
    const spy = jest.spyOn(os, 'type');
    spy.mockReturnValue('Linux');
    const linuxDLUrl = getDownloadURL(latestVersion);
    expect(await checkHead(linuxDLUrl)).toEqual(302);
  });
});
