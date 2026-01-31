import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getDefaultViewMode,
  isMobilePhoneUserAgent
} from '../utils/viewMode.mjs';

test('defaults to coverflow on desktop for coding explorations', () => {
  assert.equal(getDefaultViewMode('/stuff/coding-explorations', false), 'coverflow');
});

test('defaults to coverflow on desktop for in the wild', () => {
  assert.equal(getDefaultViewMode('/stuff/in-the-wild', false), 'coverflow');
});

test('defaults to list on mobile phones for coverflow pages', () => {
  assert.equal(getDefaultViewMode('/stuff/coding-explorations', true), 'list');
  assert.equal(getDefaultViewMode('/stuff/in-the-wild', true), 'list');
});

test('defaults to list on non-coverflow pages', () => {
  assert.equal(getDefaultViewMode('/work', false), 'list');
});

test('mobile phone user agent detection', () => {
  assert.equal(
    isMobilePhoneUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15'),
    true
  );
  assert.equal(
    isMobilePhoneUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15'),
    false
  );
  assert.equal(isMobilePhoneUserAgent('', true), true);
});
