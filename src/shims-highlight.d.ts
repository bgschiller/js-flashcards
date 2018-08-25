declare module "highlight.js/lib/highlight.js" {
  import hljs from "highlight.js";
  export default hljs;
}

declare module "highlight.js/lib/languages/javascript" {
  import { IModeBase, HLJSStatic } from 'highlight.js';
  import hljs from 'highlight.js/lib/languages/javascript';
  var x: (hljs?: HLJSStatic) => IModeBase;
  export default x;
}