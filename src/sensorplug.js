/**
 * Created by elimenchaca on 11/6/17.
 */
var Device = (function IIFE() {
    var detectOrientation = function () {
        if (!('ondeviceorientation' in window)) {
            console.log("Device Orientation is not detected");
        } else {
            console.log("Device Orientation detected")
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
        
            var obj = {"gamma": gamma, "beta": beta, "alpha" : alpha};
            socket.emit('orientation', obj);
        
        }, false);
    };

    return {
        detectOrientation: detectOrientation,
        handleOrientation: handleOrientation
    };

})();

