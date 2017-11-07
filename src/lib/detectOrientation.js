/**
 * Created by elimenchaca on 11/6/17.
 */
exports.detectOrientation = function () {
    console.log("detectOrientation");
    if (!('ondeviceorientation' in window)) {
        console.log("Device Orientation is not detected");
    } else {
        console.log("Device Orientation detected")
    }
};