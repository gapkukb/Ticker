class InlineWorker {
    static create(fn:Function) {
        var blob = new Blob([fn.toString().trim().slice(14,-1).trim()], { type: 'text/javascript' });
        var url = URL.createObjectURL(blob);       
        return new Worker(url);
    }
    static func(){
        
        self.onmessage = e=>{
            console.log(e.data)
        }
    }
}

type TickerOption =Partial<{
    mode:"timeout"|"interval",
    delay?:number
    interval?:number
    immediate?:boolean
    worker?:boolean
}>
type numeric = number|string

InlineWorker.create(InlineWorker.func).postMessage("CREATE")

class Ticker {

    static new(option?:TickerOption){
        return new Ticker(option)
    }

    worker?:Worker
    timer:any = null

    option:TickerOption = {
        mode:"interval",
        delay:0,
        interval:1000,
        immediate:true,
        worker:true,
    }
    hooks:{id?:numeric,hook:Function}[] = []

    private constructor(option?:TickerOption) {
        
        this.option = {
            ...this.option,
            ...option
        }
        this.exec = this.exec.bind(this)
    }
    private start(){
        const ticker = this.option.mode==="timeout" ?setTimeout:setInterval
        this.timer = ticker(this.exec, this.option.interval);
    }
    private exec(){
        this.hooks.forEach(item=>{
            item.hook()
        })
    }
    run(){
        this.option.immediate && this.exec();
        this.start()
    }
    stop(){
        this.pause()
        this.remove()
    }
    pause(){
        clearInterval(this.timer)
        clearTimeout(this.timer)
    }
    resume(){
        this.start()
    }
    add(hook:Function,id?:numeric){
        this.hooks.push({id,hook})
    }
    remove(hookOrId?:Function|numeric){
        if(!hookOrId){
            this.hooks = []
            return
        }
        const predicate = typeof hookOrId === "function" ?"hook":"id"
        const index = this.hooks.findIndex(i=>i[predicate] === hookOrId)
        if(index !==-1){
            this.hooks.splice(index,1)
        }
    }
    
}


