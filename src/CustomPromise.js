export default class CustomPromise {

    static count = 0;

    constructor(executor) {
        // class field increment
        this.instanceId = ++CustomPromise.count;

        // initial state
        this.state = {
            state: 'pending',
            result: undefined
        };

        // creating queue for the .then collback handlers
        this.thenQueue = [];

        // creating queue for the .catch collback handlers
        this.catchQueue = [];

        // methods binding
        this.setState = this.setState.bind(this);
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);

        // initialisation
        this._init(executor);
    }

    static all(iterable) {
        return new CustomPromise((resolve, reject) => {
            let executed = [];
            let results = [];
            let i = 0;
            const id = setInterval(() => {
                
                if (executed.length === iterable.length) {
                    clearInterval(id);

                    resolve(results);
                }
                if (i === iterable.length) {
                    i = 0;
                }
                if (iterable[i].state.state === 'fulfilled'
                    || iterable[i].state.state === 'rejected') {
                    executed.push(1);
                    results[i] = iterable[i].state.result;
                }
                i++;

            }, 1000);
        })
    }

    _executeThenQueue() {

        let result;
        let newResult;

        if (this.thenQueue.length > 0) {

            // getting first collback function (handler from .then() method) from queue
            let handler = this.thenQueue[0];

            try {
                result = this.state.result;

                // creating new promise
                const promise = new CustomPromise((res, rej) => {
                    // getting result from handler
                    newResult = handler(result);
                    // if handler returns undefined (console.log was called and etc)
                    if (!newResult) {
                        newResult = this.state.result;
                    }
                    res(newResult);
                })

                this.setState(this.state.state, newResult);

                // removing first handler from queue 
                this.thenQueue.shift();

                // passing stack with handlers to new promise,
                // so that it continues the execution of the chain of .then methods
                promise.thenQueue = this.thenQueue;
                promise.catchQueue = this.catchQueue;

            } catch (err) {
                this._executeCatchQueue();
                return;
            }
        }
    }

    _executeCatchQueue() {
        if (this.catchQueue.length > 0) {
            const handler = this.catchQueue[0];
            this.setState('rejected', new Error('Catching an error => something was wrong!'));
            handler(this.state.result);
        }
    }

    _init(executorCollback) {

        // runing the callback function after creating the CustomPromise instance.
        executorCollback(this.resolve, this.reject);

        // Imitating promise delay until the value of its state changes to fulfilled
        const intervalId = setInterval(() => {
            console.log(this.state);

            if (this.state.state === 'fulfilled') {
                clearInterval(intervalId);
                this._executeThenQueue();

            } else if (this.state.state === 'rejected' && this.catchQueue.length > 0) {
                clearInterval(intervalId);
                this._executeCatchQueue();

            } else if (this.state.state === 'rejected') {
                clearInterval(intervalId);
                const error = new Error(this.state.result);
                console.log(error);
            }
        }, 500);
    }

    setState(state, result) {
        this.state = {
            ...this.state,
            state,
            result
        };
    }

    resolve(value) {
        this.setState('fulfilled', value);
        return value;
    }

    reject(error) {
        this.setState('rejected', error);
    }

    then(handler) {
        this.thenQueue.push(handler);
        return this;
    }

    catch(error) {
        this.catchQueue.push(error);
        return this;
    }
}