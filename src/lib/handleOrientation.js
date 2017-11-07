/**
 * Created by elimenchaca on 11/4/17.
 */
exports.handleOrientation = function () {
    console.log("handleOrientation");
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