/** @typedef {'list' | 'coverflow'} ViewMode */

const COVERFLOW_DEFAULT_PATHS = ['/stuff/coding-explorations', '/stuff/in-the-wild'];
const DEFAULT_VIEW_MODE = 'list';

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function isCoverflowDefaultPath(pathname = '') {
  return COVERFLOW_DEFAULT_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * @param {string} pathname
 * @param {boolean} isMobilePhone
 * @returns {ViewMode}
 */
export function getDefaultViewMode(pathname = '', isMobilePhone = false) {
  if (isCoverflowDefaultPath(pathname)) {
    return isMobilePhone ? 'list' : 'coverflow';
  }
  return DEFAULT_VIEW_MODE;
}

/**
 * @param {string} userAgent
 * @param {boolean | undefined} uaDataMobile
 * @returns {boolean}
 */
export function isMobilePhoneUserAgent(userAgent = '', uaDataMobile) {
  if (typeof uaDataMobile === 'boolean') {
    return uaDataMobile;
  }
  return /iPhone|iPod|Android.*Mobile|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini/i.test(userAgent);
}

/**
 * @returns {boolean}
 */
export function detectMobilePhone() {
  if (typeof navigator === 'undefined') {
    return false;
  }
  return isMobilePhoneUserAgent(navigator.userAgent || '', navigator.userAgentData?.mobile);
}

export { COVERFLOW_DEFAULT_PATHS, DEFAULT_VIEW_MODE };
