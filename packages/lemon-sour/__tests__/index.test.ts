// https://github.com/facebook/jest/issues/5089
process.argv.push('--yml', '../../example/app_basic_no_archive/index.yml');

import '../src/index';

describe('index', () => {
  test('run index.', () => {});
});
