import CustomPromise from "./CustomPromise.js";

function customFetch(url, options) {

    const defaultOptions = {
        method: 'GET',
        type: 'json',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: 'data'
    };

    const params = { ...defaultOptions, ...options }

    return new CustomPromise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open(params.method, url);

        if (params.method.toUpperCase() === 'GET') {
            xhr.responseType = params.type;
            xhr.send();

        } else if (params.method.toUpperCase() === 'POST') {
            xhr.setRequestHeader('Content-type', params.headers['Content-type']);
            xhr.send(params.body);
        }

        xhr.onload = function () {
            if ((xhr.status === 200) || (xhr.status > 200 && xhr.status < 400)) {
                console.log(`Success! Status: ${xhr.status}`);
                let responseObj = xhr.response;
                resolve(responseObj);
            } else {
                reject(`Oops... => Error ${xhr.status}`)
            }
        };
    })
}

export default customFetch;