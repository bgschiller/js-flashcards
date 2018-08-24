import hljs from 'highlight.js/lib/highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

export default function(code: string) {
  return hljs.highlight('javascript', code, true).value;
}