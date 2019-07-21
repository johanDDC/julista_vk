
class ComponentUpdator {
    id: number;
    timeout: number;
    tick: number;

    constructor(timeout: number, tick: number){
        this.timeout = timeout;
        this.tick = tick;

        setTimeout(() => {
            setInterval(() => {}, this.tick);
        }, this.timeout);

    }
}

export default ComponentUpdator;