describe("Car", function() {
  var car;
  var driver;

  beforeEach(function() {
    car = new Car();
    driver = 'Charles Bronson';
  });

  it("should have a 4 wheels", function() {
    expect(car.wheels).toEqual(4);
  });

  it("could have a driver", function() {
    car.sit(driver);
    expect(car.driver).toEqual(driver);

    //demonstrates use of custom matcher
    // expect(player).toBePlaying(song);
  });

  it("do not have a driver", function() {
    car.sit(driver);
    car.exit();
    expect(car.driver).toBeNull();
  });

  describe('with driver', function() {
    beforeEach(function() {
      car.sit(driver);
    });

    it("when drives should be moving", function() {
      car.drive();
      expect(car.isMoving).toBeTruthy();
    });

    it("when stops should not be moving", function() {
      car.drive();
      car.stop();
      expect(car.isMoving).toBeFalsy();
    });
  });

});
