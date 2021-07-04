"use strict";
var Test = /** @class */ (function () {
    function Test(count) {
        if (count === void 0) { count = 1; }
        this.count = count;
    }
    Test.prototype.increase = function () {
        console.log("2222222222222222222");
    };
    return Test;
}());
var test = new Test();
