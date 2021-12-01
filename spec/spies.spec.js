describe('and.callThrough spy', () => {
  var stuff;
  var thing;

  beforeEach(() => {
    stuff = [];
    thing = {
      addThing: function(value) {
        stuff.push(value);
      }
    };

    spyOn(thing, 'addThing').and.callThrough();

    thing.addThing('thing1');
  });

  it('should track calls', () => {
    expect(thing.addThing).toHaveBeenCalled();
    expect(thing.addThing).toHaveBeenCalledTimes(1);
    thing.addThing('thing2');
    expect(thing.addThing).toHaveBeenCalledTimes(2);
  });

  it('should pass through to the original function', () => {
    expect(thing.addThing).toHaveBeenCalledWith('thing1');
    expect(stuff[0]).toEqual('thing1');
    
  });
});

describe('and.callFake spy', () => {
  var stuff;
  var thing;

  beforeEach(() => {
    stuff = [];
    thing = {
      getThing: function() {
        return 'defaultThing';
      }
    };

    spyOn(thing, 'getThing').and.callFake(() => 'fakeThing');

    stuff.push(thing.getThing());
  });

  it(`should have added 'fakeThing', not 'defaultThing'`, () => {
    expect(stuff[0]).toEqual('fakeThing');
  });
});

describe('and.throwError', () => {
  thing = {
    getThing: function() {
      return 'defaultThing';
    }
  };

  beforeEach(() => {
    spyOn(thing, 'getThing').and.throwError('thing error');
  });

  it(`should return the error instaed of 'defaultThing'`, () => {
    expect(function() {thing.getThing()}).toThrowError('thing error');
  });
});