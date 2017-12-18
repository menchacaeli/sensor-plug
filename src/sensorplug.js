/**
 * Created by elimenchaca on 11/6/17.
 */
var Device = (function IIFE() {
    var detectAcceleration = function() {
        if (!('ondevicemotion' in window)) {
            return "sensorplug: Device Acceleration is not supported";
        } else {
            return "sensorplug: Device Acceleration is supported!";
        }
    };

    var detectOrientation = function() {
        if (!('ondeviceorientation' in window)) {
            return "sensorplug: Device Orientation is not supported";
        } else {
            return "sensorplug: Device Orientation is supported!" ;
        }
    };

    var detectGeolocation = function() {
        if (!("geolocation" in navigator)) {
            return "sensorplug: Device Geolocation is not supported.";
        } else {
            return "sensorplug: Device Geolocation is supported!";
        }
    };

    var handleOrientation = function () {
        window.addEventListener('deviceorientation', function (eventData) {
            // gamma is the left-to-right tilt in degrees, where right is positive
            var gamma = eventData.gamma;
            // beta is the front-to-back tilt in degrees, where front is positive
            var beta = eventData.beta;
            // alpha is the compass direction the device is facing in degrees
            var alpha = eventData.alpha;
        
            var oriObj = {"gamma": gamma, "beta": beta, "alpha" : alpha};
            socket.emit('orientation', oriObj);
        
        }, false);
    };

    var handleGeolocation = function() {
        var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000, // 10 seconds
            maximumAge: 30 * 1000 // 30 seconds
        };

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var geoObj = {"latitude": latitude, "longitude": longitude};
            socket.emit('geolocation', geoObj);
        }

        function error() {
            console.log("error: Check sensorplug documentation");
        }

        navigator.geolocation.getCurrentPosition(success, error, positionOptions);
    };

    var handleAcceleration = function() {
        if (window.DeviceMotionEvent) {
            window.addEventListener('devicemotion', function (motion) {
                // Acceleration
                var accelerationX = motion.acceleration.x;
                var accelerationY = motion.acceleration.y;
                var accelerationZ = motion.acceleration.z;

                var accObj = { "accelerationX": accelerationX, "accelerationY": accelerationY, "accelerationZ": accelerationZ };
                socket.emit('acceleration', accObj);

            }, false);
        } else {
            console.log("error: Check sensorplug documentation");
        }
    };

    var render = function() {
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

})();

