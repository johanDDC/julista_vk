class BookletCache {
    constructor() {
        this.storage = this.#openCache();
    }

    #openCache = () => {
        return new Promise(resolve => {
            caches.open("booklet_cache")
                .then(cache => {
                    resolve(cache)
                })
        });
    };

    cacheData = request => {
        return new Promise(resolve => {
            this.storage.then(storage => {
                fetch(request).then(response => {
                    let save = response.clone();
                    storage.put(request, response)
                        .then(() => resolve(save))
                });
            });
        });
    };

    getData = request => {
        return new Promise((resolve, reject) => {
            this.storage.then(storage => {
                storage.match(request)
                    .then(response => response.json().then(data => resolve(data)))
                    .catch(() => reject())
            });
        });
    };
}

// export function cacheData(request) {
//     caches.open("booklet_cache")
//         .then(cache => {
//             // cache.add(request);
//             cache.match(request).then(resp => resp.json().then(data => console.log(data)))
//         })
// }
//
// export function getCashedData(request) {
//
// }

export default BookletCache;