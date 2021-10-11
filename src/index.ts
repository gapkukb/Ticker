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
	constructor(option: TickerOption | number) {
		worker.postMessage({
			type: TICKER.NEW,
			id: this.id,
			data: option,
		});
	}
	id: string = Math.random().toString(32).slice(2);
	queue: Set<Function> = new Set();
	push(type: TICKER) {
		worker.postMessage({
			type,
			id: this.id,
		});
	}
	call(f: Function) {
		f();
	}
	add(f: Function) {
		this.queue.add(f);
		return f;
	}
	remove(f: Function | Function[]) {
		if (!Array.isArray(f)) f = [f];
		f.forEach((i) => {
			this.queue.delete(i);
		});
	}
	run() {
		this.push(TICKER.RUN);
	}
	stop() {
		this.push(TICKER.STOP);
	}
	clear() {
		this.queue = null as any;
		this.push(TICKER.CLEAR);
	}
}

const ticker = new Ticker(1000);
