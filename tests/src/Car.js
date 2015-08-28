function Car() {
	this.wheels = 4;
}
Car.prototype.sit = function(driver) {
	if (this.driver) {
		throw new Error("driver sit is busy");
	} else {
		this.driver = driver;
	}
	// this.isMoving = false;
};
Car.prototype.exit = function() {
	if (this.isMoving) {
		throw new Error("car is moving!!!");
	} else {
		this.driver = null;
		// this.isMoving = false;
	}
};
Car.prototype.drive = function() {
	if (this.driver) {
		this.isMoving = true;
	} else {
		throw new Error("driver sit is empty");
	}
};

Car.prototype.stop = function() {
	if (this.driver) {
		this.isMoving = false;
	}
};
