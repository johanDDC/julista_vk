import {cacheTimeChecker} from "./utils";

class BookletCache {
    static instance = null;

    constructor() {
        this.storage = this.#openCache();
        this.timeStore = localStorage.getItem("cache")
            ? JSON.parse(localStorage.getItem("cache"))
            : {};
    }

    static getInstance() {
        if (BookletCache.instance === null)
            BookletCache.instance = new BookletCache();

        return this.instance;
    }

    #openCache = () => {
        return new Promise(resolve => {
            caches.open("booklet_cache")
                .then(cache => {
                    resolve(cache)
                })
        });
    };
    #checkCache = (entity) => {
        try {
            return cacheTimeChecker(this.timeStore[`${entity}`].time);
        } catch (e) {
            return false;
        }
    };
    #clear = (request, status) => {
        return new Promise(resolve => {
            if (status) {
                console.log("clear",);
                this.storage.then(storage => {
                    storage.delete(request)
                        .then(() => resolve())
                });
            } else
                resolve();
        });
    };
    #saveTime = entity => {
        // Object.assign(this.timeStore, {`${entity}`, {}})
        this.timeStore["" + entity] = {time: new Date()};
        localStorage.setItem("cache", JSON.stringify(this.timeStore));
    };

    cacheData = (request, entity) => {
        return new Promise((resolve, reject) => {
            this.storage.then(storage => {
                fetch(request).then(response => {
                    console.log(response);
                    if (response.ok) {
                        let save = response.clone();
                        this.#saveTime(entity);
                        storage.put(request, response)
                            .then(() => resolve(save))
                    } else
                        reject();
                });
            });
        });
    };

    getData = (request, entity) => {
        return new Promise((resolve, reject) => {
            this.#clear(request, this.#checkCache(entity))
                .then(() => {
                    this.storage.then(storage => {
                        storage.match(request)
                            .then(response => {
                                if (response.ok)
                                    response.json().then(data => resolve(data))
                                else
                                    reject();
                            })
                            .catch(() => reject())
                    });
                });
        });
    };

    forceClear = () => {
        localStorage.removeItem("cache")
        caches.delete("booklet_cache");
    }
}

export default BookletCache;