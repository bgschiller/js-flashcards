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
    tag: 'spread',
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
    tag: 'spread',
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
    tag: 'spread',
  },
  {
    front: `
var east = {
  lobsters: 3,
  peaches: 5,
  apples: 10, // apples in the east
};

var west = {
  salmon: 5,
  blueberries: 18,
  apples: 20, // apples in the west
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
    tag: 'spread',
  },
].map((card, ix) => ({ ...card, id: ix }));