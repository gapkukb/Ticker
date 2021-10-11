self.onmessage = function ({ data: { type, option, id } }: TickerMessageEvent) {
	const map: Record<string, any> = {};
	switch (type) {
		case TICKER.NEW:
			const interval = typeof option === "number" ? option : option?.interval || 1000;
			map[id] = self.setInterval(self.postMessage, interval, TICKER.UPDATE);
			break;
		case TICKER.STOP:
			break;
		case TICKER.RUN:
			break;
		case TICKER.CLEAR:
			break;
	}
};
