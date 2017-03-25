var Promise = require('../my_promise');
describe('Promise', function() {
  it('can then', function() {
    var p = new Promise(function(accept) {
      accept(1);
    });
    var f = jasmine.createSpy('callback');
    p.then(f);
    expect(f).toHaveBeenCalledWith(1);
  });

  it('can do async them', function(done) {
    var p = new Promise(function(accept) {
      setTimeout(function() {
        accept(1);
      }, 1);
    });
    p.then(function(value) {
      expect(value).toEqual(1);
      done();
    });
  });

  it('returns another promise with then', function() {
    var p1 = new Promise(function(accept) {
      accept(1);
    });
    var p2 = p1.then(function(one) {
      return one * 2;
    });
    var f = jasmine.createSpy();
    p2.then(f);
    expect(f).toHaveBeenCalledWith(2);
  });

  it('chaining async', function(done) {
    var p1 = new Promise(function(accept) {
      setTimeout(function() {
        accept(1);
      }, 1)
    });
    var p2 = p1.then(function(one) {
      return one * 2;
    });
    p2.then(function(value) {
      expect(value).toEqual(2);
      done();
    });
  });

  it('chains promises', function(done) {
    var p1 = new Promise(function(accept) {
      setTimeout(function() {
        accept(1);
      }, 1)
    });
    var p2 = p1.then(function(one) {
      return new Promise(function(accept) {
        setTimeout(function() {
          accept(2);
        }, 1);
      });
    });
    p2.then(function(value) {
      expect(value).toEqual(2);
      done();
    });
  });
});
