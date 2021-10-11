type numeric = number | string;
type TickerOption = Partial<{
	/** 每次执行间隔 ， 默认0 */
	interval: number;
	/** 执行次数，默认0-不限次数 */
	times?: number;
	/** 是否立即执行，times - 1 */
	immediate?: boolean;
	/** 是否启用webworker，默认启用 */
	worker?: boolean;
}>;

const enum TICKER {
	NEW,
	RUN,
	ADD,
	STOP,
	UPDATE,
	CLEAR,
}
interface TickerMessageEvent extends MessageEvent {
	data: { type: TICKER; option: TickerOption; id: string };
}
