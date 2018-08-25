export default [
  {
    front: `
var obj = {
  a: 1,
  b: 2,
};

var objAgain = obj;
objAgain.c = 3;

console.log(obj);
    `,
    back: `
{ a: 1, b: 2, c: 3 }
// objAgain is an alias for obj
// both point to the same chunk of memory
// a change to objAgain affects obj as well
    `,
  },
  {
    front: `
var obj = {
  a: 1,
  b: 2,
};

var objCopy = { ...obj };
objCopy.d = 4;
console.log(obj);
    `,
    back: `
{ a: 1, b: 2 }
// objCopy is a shallow copy of obj
// the spread operator copied all top-level
// keys and values into objCopy.
// changes to objCopy do not affect obj
    `,
  },
  {
    front: `
var left = {
  apples: 12,
  bananas: 14,
  coconuts: 8,
};

var right = {
  grapes: 4,
  hamburgers: 9,
};

var together = {
  ...left,
  ...right,
};
console.log(together);
    `,
    back: `
{
  apples: 12,
  bananas: 14,
  coconuts: 8,
  grapes: 4,
  hamburgers: 9,
}
    `,
  },
  {
    front: `
var east = {
  lobsters: 3,
  peaches: 5,
  apples: 10,
  // apples in the east
};

var west = {
  salmon: 5,
  blueberries: 18,
  apples: 20,
  // apples in the west
};

var together = {
  ...east,
  ...west,
};
console.log(together);
    `,
    back: `
{
  lobsters: 3,
  peaches: 5,
  salmon: 5,
  blueberries: 18,
  apples: 20,
}
// the last appearance of a key wins
    `,
  },
  {
    front: `
var up = [ 1, 2, 3, 4 ];
var down = [ 5, 6, 7, 8 ];
var juntos = [ ...up, ...down ];
console.log(juntos);
    `,
    back: `
[ 1, 2, 3, 4, 5, 6, 7, 8 ]
    `,
  },
  {
    front: `
var up = [ 1, 2, 3, 4 ];
var down = [ 5, 6, 7, 8 ];
var juntos = [ up, down ];
console.log(juntos);
    `,
    back: `
[ [1, 2, 3, 4], [5, 6, 7, 8] ]
    `,
  },
  {
    front: `
var up = [ 1, 2, 3, 4 ];
var down = [ 5, 6, 7, 8 ];
var juntos = [ ...up, down ];
console.log(juntos);
`,
    back: `
[ 1, 2, 3, 4, [ 5, 6, 7, 8 ] ]
    `,
  },
  {
    front: `
var first = ['tomato', 'potato'];
var second = ['cabbage', 'radish'];
var together = [
  ...first,
  'zucchini',
  ...second,
];
console.log(together);
`,
    back: `
[
  'tomato', 'potato',
  'zucchini', 'cabbage',
  'radish',
]`,
  },
  {
    front: `
var solo = [ 1, 2, 3 ];
var again = [
  ...solo, ...solo, ...solo,
];
console.log(again);
    `,
    back: `
[ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
    `,
  },
  {
    front: `
function print_spread_args(...args) {
  console.log('args is', args);
}
print_spread_args(1, 2, 3);
    `,
    back: `
args is [1, 2, 3]
    `,
  },
  {
    front: `
function print_spread_args(...args) {
  console.log('args is', args);
}
print_spread_args([1, 2, 3]);
    `,
    back: `
args is [[1, 2, 3]]
    `,
  },
  {
    front: `
function print_spread_args(...args) {
  console.log('args is', args);
}
print_spread_args([1, 2, 3], [4, 5, 6]);
    `,
    back: `
args is [[1, 2, 3], [4, 5, 6]]
    `,
  },
  {
    front: `
function print_spread_args(
  first, ...rest
) {
  console.log(
    'first is', first,
    'rest is', rest,
  );
}
print_spread_args(1, 2, 3, 4);
    `,
    back: `
first is 1 rest is [2, 3, 4]
    `,
  },
  {
    front: `
function print_spread_args(
  first, ...middle, last
) {
  console.log(
    'first is', first,
    'middle is', middle,
    'last is', last
  );
}
print_spread_args(1, 2, 3, 4);
    `,
    back: `
SyntaxError: Rest parameter must be
last formal parameter
    `,
  },
];