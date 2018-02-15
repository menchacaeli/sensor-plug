"use strict";

/**
 * Created by elimenchaca on 11/6/17.
 */
var Device = function IIFE() {
    var detectAcceleration = function detectAcceleration() {
        if (!('ondevicemotion' in window)) {
            return "sensorplug: Device Acceleration is not supported";
        } else {
            return "sensorplug: Device Acceleration is supported!";
        }
    };

    var detectOrientation = function detectOrientation() {
        if (!('ondeviceorientation' in window)) {
            return "sensorplug: Device Orientation is not supported";
        } else {
            return "sensorplug: Device Orientation is supported!";
        }
    };

    var detectGeolocation = function detectGeolocation() {
        if (!("geolocation" in navigator)) {
            return "sensorplug: Device Geolocation is not supported.";
        } else {
            return "sensorplug: Device Geolocation is supported!";
        }
    };

    var handleOrientation = function handleOrientation() {
			if (window.DeviceOrientation) {
        window.addEventListener('deviceorientation', function (eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var gamma = eventData.gamma;
            // beta is the front-to-back tilt in degrees, where front is positive
            var beta = eventData.beta;
            // alpha is the compass direction the device is facing in degrees
            var alpha = eventData.alpha;
						
						// creating an object to pass to the server-side
            var oriObj = { "gamma": gamma, "beta": beta, "alpha": alpha };
						
						// emitting the oriObj to the server-side
            socket.emit('orientation', oriObj);
        }, false);
			} else {
				console.log("error: Check sensorplug documentation");
			}
    };

    var handleGeolocation = function handleGeolocation() {
        var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000, // 10 seconds
            maximumAge: 30 * 1000 // 30 seconds
        };

        function success(position) {
						// specifies the north–south position of a point on the Earth's surface
            var latitude = position.coords.latitude;
						// specifies the east-west position of a point on the Earth's surface
            var longitude = position.coords.longitude;
						
						// creating an object to pass to the server-side
            var geoObj = { "latitude": latitude, "longitude": longitude };
						
						// emitting the oriObj to the server-side
            socket.emit('geolocation', geoObj);
        }

        function error() {
            console.log("error: Check sensorplug documentation");
        }

        navigator.geolocation.getCurrentPosition(success, error, positionOptions);
    };

    var handleAcceleration = function handleAcceleration() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (motion) {
                // provides acceleration data, in m/s² for each of the x, y, and z axes
                var accelerationX = motion.acceleration.x;
                var accelerationY = motion.acceleration.y;
                var accelerationZ = motion.acceleration.z;
								
								// creating an object to pass to the server-side
                var accObj = { "accelerationX": accelerationX, "accelerationY": accelerationY, "accelerationZ": accelerationZ };
								
								// emitting the oriObj to the server-side
                socket.emit('acceleration', accObj);
            }, false);
        } else {
            console.log("error: Check sensorplug documentation");
        }
    };

    var render = function render() {
        console.log(detectGeolocation());
        console.log(detectOrientation());
        console.log(detectAcceleration());
    };

    render();

    return {
        handleOrientation: handleOrientation,
        handleGeolocation: handleGeolocation,
        handleAcceleration: handleAcceleration
    };
}();