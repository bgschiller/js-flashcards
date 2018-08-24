import { highlight } from 'highlight.js';

export default function(code: string) {
  return highlight('js', code, true).value;
}