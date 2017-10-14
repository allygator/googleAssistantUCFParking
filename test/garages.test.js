const assert = require('assert');
const garages = require('../garages');

describe('getAllGarages', () => {

  let testGarages;
  let testGaragesPromise;

  before((done) => {
    const testGaragesPromise = garages.getAllGarages();
    testGaragesPromise.then( gar => {
      testGarages = gar
      done();
    });
  })

  it("promise resolves", () => {
    return testGaragesPromise;
  });
  
  it("Promise returns something", () => {
    if(testGarages)
      assert.ok(true);
    else
      assert.fail("No garages found");
  });

  it('Promise returns a list of items', () => {
    if(testGarages && testGarages.length > 0)
      assert.ok(true);
    else
      assert.fail("No garages found");
  })

  it("Items on the list have 'perc' property", () => {

    if(testGarages[0].hasOwnProperty("perc"))
      assert.ok(true);
    else
      assert.fail("Items on array have no 'perc' property");
  });

  it("Items on the list have 'garage' property", () => {
    
    if(testGarages[0].hasOwnProperty("garage"))
      assert.ok(true);
    else
      assert.fail("Items on array have no 'garage' property");
  });
});