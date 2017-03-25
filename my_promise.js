function MyPromise(fn) {
  // the promise
  var p = {};
  // listeners to the fulfillment of this promise
  var fulfillListeners = [];
  var state = 'PENDING';
  // fulfilled value
  var value;

  // immediately execute the passed in function
  fn(resolve);

  p.then = function(onFulfilled) {
    // generate new promise which is then-able
    // attach to the onFulfilled callback function
    // so that when the callback is called later
    // we can use the returned result of the callback
    // to fulfill the attached promise
    onFulfilled.nextPromise = new MyPromise(function(){});

    if (state === 'FULFILLED') {
      // if already fulfilled, notify immediately
      notifyFulfilled(onFulfilled);
    } else {
      // if pending, save the onFulfilled callback
      // for later
      fulfillListeners.push(onFulfilled);
    }

    // return the new promise to allow then calls
    return onFulfilled.nextPromise;
  };

  // Add a non-standard resolve(value) API to allow
  // easier resolving of the next promise in the chain
  p.resolve = resolve;

  // resolves this promise
  function resolve(v) {
    state = 'FULFILLED';
    value = v;
    notifyFulfilledListeners();
  }

  // notify each fulfillment listener
  function notifyFulfilledListeners() {
    fulfillListeners.forEach(notifyFulfilled);
  }

  // notify a individual fulfillment listener
  function notifyFulfilled(listener) {
    // call the listener callback function
    // and get its result
    var result = listener(value);
    if (listener.nextPromise) {
      if (result && result.then) {
        // the result is a promise, defer to
        // its resolution to resolve the next
        // promise with the same value
        result.then(listener.nextPromise.resolve);
      } else {
        // the result is a regular value
        // resolve the next promise
        listener.nextPromise.resolve(result);
      }
    }
  }

  return p;
}

module.exports = MyPromise;
