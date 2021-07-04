"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var InlineWorker = /** @class */ (function () {
    function InlineWorker() {
    }
    InlineWorker.create = function (fn) {
        var blob = new Blob([fn.toString().trim().slice(14, -1).trim()], { type: 'text/javascript' });
        var url = URL.createObjectURL(blob);
        return new Worker(url);
    };
    InlineWorker.func = function () {
        self.onmessage = function (e) {
            console.log(e.data);
        };
    };
    return InlineWorker;
}());
InlineWorker.create(InlineWorker.func).postMessage("CREATE");
var Ticker = /** @class */ (function () {
    function Ticker(option) {
        this.timer = null;
        this.option = {
            mode: "interval",
            delay: 0,
            interval: 1000,
            immediate: true,
            worker: true,
        };
        this.hooks = [];
        this.option = __assign(__assign({}, this.option), option);
        this.exec = this.exec.bind(this);
    }
    Ticker.new = function (option) {
        return new Ticker(option);
    };
    Ticker.prototype.start = function () {
        var ticker = this.option.mode === "timeout" ? setTimeout : setInterval;
        this.timer = ticker(this.exec, this.option.interval);
    };
    Ticker.prototype.exec = function () {
        this.hooks.forEach(function (item) {
            item.hook();
        });
    };
    Ticker.prototype.run = function () {
        this.option.immediate && this.exec();
        this.start();
    };
    Ticker.prototype.stop = function () {
        this.pause();
        this.remove();
    };
    Ticker.prototype.pause = function () {
        clearInterval(this.timer);
        clearTimeout(this.timer);
    };
    Ticker.prototype.resume = function () {
        this.start();
    };
    Ticker.prototype.add = function (hook, id) {
        this.hooks.push({ id: id, hook: hook });
    };
    Ticker.prototype.remove = function (hookOrId) {
        if (!hookOrId) {
            this.hooks = [];
            return;
        }
        var predicate = typeof hookOrId === "function" ? "hook" : "id";
        var index = this.hooks.findIndex(function (i) { return i[predicate] === hookOrId; });
        if (index !== -1) {
            this.hooks.splice(index, 1);
        }
    };
    return Ticker;
}());
