export default [
  {
    front: `
function whatIsThis() {
  console.log(this);
}
whatIsThis();
    `,
    back: `
Window
    `,
  },
  {
    front: `
var obj = {
  a: 1,
  b: 2,
  whatIsThis: function () {
    console.log(this);
  },
};
obj.whatIsThis();
    `,
    back: `
{ a: 1, b: 2, whatIsThis: f }
// When a function lives in an object and
// is called from that object, 'this' is
// bound to the object.
    `,
  },
  {
    front: `
var obj = {
  a: 1,
  b: 2,
  nested: {
    c: 3,
    d: 4,
    whatIsThis: function () {
      console.log(this);
    },
  },
};
obj.nested.whatIsThis();
    `,
    back: `
{ c: 3, d: 4, whatIsThis: f }
// When a function lives in an object and
// is called from that object, 'this' is
// bound to the object. 'whatIsThis' lives
// in the nested object, not the top-level
// one
    `,
  },
  {
    front: `
var obj = {
  a: 1,
  b: 2,
  whatIsThis: function() {
    console.log(this);
  },
};
var func = obj.whatIsThis;
func();
      `,
    back: `
Window
// Even though 'func' _used_ to be attached
// to 'obj', the 'this' context is
// determined at the point of call
    `,
  },
  {
    front: `
var obj = {
  a: 1,
  b: 2,
  whatIsThis: function() {
    console.log(this);
  },
};
obj['whatIsThis']();
      `,
    back: `
{ a: 1, b: 2, whatIsThis: f }
// even though there's no dot,
// we're accessing the function
// via its attachment to 'obj',
// so 'this' is bound to 'obj'
    `,
  },
  {
    front: `
var lst = [ 1, 2, 3 ];
lst.whatIsThis = function() {
  console.log(this);
};
lst.whatIsThis();
      `,
    back: `
[ 1, 2, 3, whatIsThis: f ]
// Arrays in javascript are objects that
// have some extra methods on them.
// so when we call lst.whatIsThis(),
// the same rule about objects applies
    `,
  },
  {
    front: `
var arr = [
  'apple', 'banana',
  function() { console.log(this); },
];
arr[2]();
      `,
    back: `
[ 'apple', 'banana', f ]
// Arrays in javascript are objects that
// have some extra methods on them.
// so when we call arr[2](),
// the same rule about objects applies,
// and 'this' is bound to the array.
    `,
  },
  {
    front: `
function whatIsThis() {
  console.log(this);
}
whatIsThis.call(42);
    `,
    back: `
42
// Using '.call' is a way of explictly
// setting the 'this' context for a
// function call.
    `,
  },
  {
    front: `
function whatIsThis() {
  console.log(this);
}
function wrapper() {
  whatIsThis()
}
wrapper.call('101 dalmations');
    `,
    back: `
Window
// even though 'wrapper' has 'this' set
// to '101 dalmations', the nested call to
// 'whatIsThis' doesn't inherit the context
    `,
  },
  {
    front: `
function whatIsThis() {
  console.log(this);
}
document.body.addEventListener(
  'click', whatIsThis);
// then click on the page
    `,
    back: `
document.body
// all html events (like click, keyup, etc)
// set the 'this' context on listeners to be
// the html element that received the event.
    `,
  },
  {
    front: `
function whatIsThis() {
  console.log(this);
}

document.body.addEventListener(
  'click',
  function() { whatIsthis() },
});
// then click on the page
  `,
    back: `
Window
// Even though the listener for
// the html event has 'this' set to
// document.body, the nested call to
// 'whatIsThis' doesn't inherit the context
    `,
  },
  {
    front: `
function whatIsThis() {
  'use strict';
  console.log(this);
}
whatIsThis();
    `,
    back: `
undefined
// in strict mode, this will not fall back
// to the global Window object. instead, it
// will be undefined.
    `,
  },
  {
    front:
`function whatIsThis() {
  console.log(this);
}

var whatNow = whatIsThis.bind(24);
whatNow();
    `,
    back:
`24
// calling '.bind()' on a function
// creates a new function with
// 'this' set to the provided value.
// Once bound in this way, 'this'
// cannot be overridden.
`
  },
  {
    front:
`function whatIsThis() {
  console.log(this);
}
var whatNow = whatIsThis.bind(24);
whatIsThis();
`,
    back:
`Window
// 'whatIsThis.bind(24)' creates and
// returns a new function. It doesn't
// affect the original function.
`
  },
  {
    front:
`function whatIsThis() {
  console.log(this);
}
var whatNow = whatIsThis.bind(24);
whatNow.call(18);
`,
  back:
`
24
// Once set using '.bind()',
// 'this' cannot be overwritten.
`
  },
  {
      front:
  `function whatIsThis() {
    console.log(this);
  }
  var whatNow = whatIsThis
    .bind(24)
    .bind(44);
  whatNow();
  `,
    back:
  `
  24
  // Once set using '.bind()',
  // 'this' cannot be overwritten.
  `
  },
  {
      front:
`const func = () => {
  console.log(this);
}
func.call(33);
  `,
    back:
  `
Window
// fat-arrow functions have their
// 'this' context bound at the time
// they are defined. In this case,
// it is like we had written
// const func = (function() {
//   console.log(this);
// }.bind(this));
  `
  },
  {
    front:
`function setup() {
  const inner = () => {
    console.log(this);
  };
  return inner;
}
const func = setup.call(54);
}
func();
`,
  back:
`
54
// fat-arrow functions have their
// 'this' context bound at the time
// they are created. In this case,
// setup is .call'd with a context
// of 54, so 'this' is 54 when the
// inner function is defined, and
`
  },
];