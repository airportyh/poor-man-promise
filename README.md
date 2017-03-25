# Poor Man's Promise Implementation

## Install

```
npm install poor-man-promise
```

## Use

```js
var Promise = require('poor-man-promise');

new Promise(function(accept) {
  setTimeout(function() {
    accept(1);
  }, 1000);
})
.then(function(value) {
  return value * 2;
})
.then(function(value) {
  return new Promise(function(accept) {
    setTimeout(function() {
      accept(value + 5);
    }, 1000);
  });
})
.then(function(finalAnswer) {
  console.log('The final answer is ' + finalAnswer);
});
```

The above prints:

```
The final answer is 7
```
