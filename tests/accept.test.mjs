import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HTML_TYPE,
  MARKDOWN_TYPE,
  mergeVary,
  negotiateType,
  parseAccept,
} from '../utils/accept.mjs';

test('defaults to HTML when no Accept header is sent', () => {
  assert.equal(negotiateType(null), HTML_TYPE);
  assert.equal(negotiateType(undefined), HTML_TYPE);
  assert.equal(negotiateType(''), HTML_TYPE);
});

test('serves markdown when the client asks for it', () => {
  assert.equal(negotiateType('text/markdown'), MARKDOWN_TYPE);
  assert.equal(negotiateType('text/markdown, text/html;q=0.9'), MARKDOWN_TYPE);
  assert.equal(negotiateType('TEXT/MARKDOWN'), MARKDOWN_TYPE);
});

test('serves HTML to a browser', () => {
  const browserAccept =
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';
  assert.equal(negotiateType(browserAccept), HTML_TYPE);
});

test('a bare wildcard prefers HTML, the first type we produce', () => {
  assert.equal(negotiateType('*/*'), HTML_TYPE);
  assert.equal(negotiateType('text/*'), HTML_TYPE);
});

test('ranks by q-value, not by position', () => {
  assert.equal(negotiateType('text/markdown;q=0.5, text/html;q=0.9'), HTML_TYPE);
  assert.equal(negotiateType('text/html;q=0.4, text/markdown;q=0.8'), MARKDOWN_TYPE);
});

test('honours q=0 as an explicit rejection, even against a wildcard', () => {
  // RFC 9110 12.5.1: the more specific range wins regardless of q.
  assert.equal(negotiateType('text/html;q=0, */*'), MARKDOWN_TYPE);
  assert.equal(negotiateType('text/markdown;q=0, */*'), HTML_TYPE);
  assert.equal(negotiateType('*/*;q=0'), null);
});

test('returns null when nothing we produce is acceptable', () => {
  assert.equal(negotiateType('application/pdf'), null);
  assert.equal(negotiateType('image/png, application/json'), null);
  assert.equal(negotiateType('text/html;q=0, text/markdown;q=0'), null);
});

test('parses parameters without crashing on malformed input', () => {
  assert.deepEqual(parseAccept('text/html;q=abc'), [
    { type: 'text/html', q: 1, specificity: 2 },
  ]);
  assert.deepEqual(parseAccept('text/html;q=9'), [
    { type: 'text/html', q: 1, specificity: 2 },
  ]);
  assert.deepEqual(parseAccept('text/html;q=-1'), [
    { type: 'text/html', q: 0, specificity: 2 },
  ]);
  assert.deepEqual(parseAccept(' , text/html , '), [
    { type: 'text/html', q: 1, specificity: 2 },
  ]);
});

test('mergeVary appends Accept without duplicating existing tokens', () => {
  assert.equal(mergeVary(null), 'Accept, Accept-Encoding');
  assert.equal(
    mergeVary('rsc, next-router-state-tree'),
    'rsc, next-router-state-tree, Accept, Accept-Encoding',
  );
  assert.equal(mergeVary('accept, Accept-Encoding'), 'accept, Accept-Encoding');
  assert.equal(mergeVary('ACCEPT'), 'ACCEPT, Accept-Encoding');
});
