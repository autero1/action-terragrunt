import * as core from '@actions/core';
import {run} from './action';

(async (): Promise<void> => {
  try {
    await run();
  } catch (e) {
    core.setFailed(`Action failed with "${e}"`);
  }
})();
