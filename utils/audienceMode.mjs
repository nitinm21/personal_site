/** @typedef {'human' | 'machine'} AudienceMode */

export const HUMAN_AUDIENCE_MODE = 'human';
export const MACHINE_AUDIENCE_MODE = 'machine';
export const DEFAULT_AUDIENCE_MODE = HUMAN_AUDIENCE_MODE;

const AUDIENCE_MODES = [HUMAN_AUDIENCE_MODE, MACHINE_AUDIENCE_MODE];

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isAudienceMode(value) {
  return typeof value === 'string' && AUDIENCE_MODES.includes(value);
}

export { AUDIENCE_MODES };
