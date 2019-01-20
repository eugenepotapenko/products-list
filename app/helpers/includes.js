import { helper } from '@ember/component/helper';

export function includes([value, search]) {
  return value.toLowerCase().includes(search.toLowerCase());
}

export default helper(includes);
