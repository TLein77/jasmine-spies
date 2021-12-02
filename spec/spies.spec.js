describe('and.callThrough spy', () => {
  var stuff = [];
  var thing = {
    addThing: function(value) {
      stuff.push(value);
    }
  };

  it('calls through and tracks', () => {
    spyOn(thing, 'addThing').and.callThrough();

    thing.addThing('thing1');
    thing.addThing('thing2');

    expect(thing.addThing).toHaveBeenCalled();
    expect(thing.addThing).toHaveBeenCalledTimes(2);
  });
});

describe('and.callFake', () => {
  var calc = {
    add: function(x, y) {
      return x + y;
    }
  };

  it('return the fake calculation', () => {
    spyOn(calc, 'add').and.callFake((x, y) => {return x + y + x});

    expect(calc.add(2, 1)).toEqual(5);
    expect(calc.add).toHaveBeenCalled();
  })
});

describe('and.returnValue', () => {
  var calc = {
    twoPlusTwo: function() {
      return 4;
    }
  };

  it('returns the value specified by the spy', () => {
    spyOn(calc, 'twoPlusTwo').and.returnValue(5);

    expect(calc.twoPlusTwo()).toEqual(5);
  });
})

describe('and.throwError', () => {
  var stuff = [];
  var thing = {
    addThing: function(value) {
      stuff.push(value);
    }
  };

  it('throws error on every call', () => {
    spyOn(thing, 'addThing').and.throwError('ERROR');

    expect(function() { thing.addThing('thing1') }).toThrowError('ERROR');
    expect(function() { thing.addThing('thing2') }).toThrowError('ERROR');
    expect(thing.addThing).toHaveBeenCalledTimes(2);
  });
});
