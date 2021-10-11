"use strict";
// webwoker 只负责倒计时，不负责具体业务
// function createInlineWorker(fn: Function) {
// 	console.log(fn.toString());
// 	const blob = new Blob(["self.onmessage = ", fn.toString()], { type: "text/javascript" });
// 	const url = URL.createObjectURL(blob);
// 	return new Worker(url);
// }
const worker = new Worker("./worker.js");
worker.onmessage = function (e) {
    console.log(e);
};
class Ticker {
    // static timeout(f: Function, delay: number = 0) {
    // 	return this.new({
    // 		interval: delay,
    // 		times: 1,
    // 	});
    // }
    // static interval(f: Function, interval: number = 0) {
    // 	return this.new({
    // 		interval,
    // 	});
    // }
    // static worker = createInlineWorker(worker);
    constructor(option) {
        worker.postMessage({
            type: 0 /* NEW */,
            id: this.id,
            data: option,
        });
    }
    id = Math.random().toString(32).slice(2);
    queue = new Set();
    push(type) {
        worker.postMessage({
            type,
            id: this.id,
        });
    }
    call(f) {
        f();
    }
    add(f) {
        this.queue.add(f);
        return f;
    }
    remove(f) {
        if (!Array.isArray(f))
            f = [f];
        f.forEach((i) => {
            this.queue.delete(i);
        });
    }
    run() {
        this.push(1 /* RUN */);
    }
    stop() {
        this.push(3 /* STOP */);
    }
    clear() {
        this.queue = null;
        this.push(5 /* CLEAR */);
    }
}
const ticker = new Ticker(1000);
