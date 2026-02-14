import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_AUDIENCE_MODE,
  HUMAN_AUDIENCE_MODE,
  MACHINE_AUDIENCE_MODE,
  isAudienceMode,
} from '../utils/audienceMode.mjs';

test('default audience mode is human', () => {
  assert.equal(DEFAULT_AUDIENCE_MODE, HUMAN_AUDIENCE_MODE);
});

test('recognizes supported audience modes', () => {
  assert.equal(isAudienceMode(HUMAN_AUDIENCE_MODE), true);
  assert.equal(isAudienceMode(MACHINE_AUDIENCE_MODE), true);
});

test('rejects unsupported audience modes', () => {
  assert.equal(isAudienceMode(''), false);
  assert.equal(isAudienceMode('list'), false);
  assert.equal(isAudienceMode('agent'), false);
  assert.equal(isAudienceMode(null), false);
});
