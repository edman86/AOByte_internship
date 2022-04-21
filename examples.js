import CustomPromise from "./src/CustomPromise.js";
import customFetch from "./src/customFetch.js";


/********************* customFetch Examples ***************************/

// Example 1
customFetch('https://swapi.dev/api/people/1/')
    .then(response => console.log(response)) // => Response will be json object
    .then(result => result.name) // => Result will be 'Luke Skywalker'
    .then(res => console.log(res)) // => will display 'Luke Skywalker'
    .catch(err => console.log(err))

// Example 2
customFetch('https://swapi.dev/api/people/1/')
    .then(response => console.log(response)) // => Response will be json object
    .then(result => result.name) // => Result will be 'Luke Skywalker'
    .then()  // => Сatching error here
    .then(res => console.log(res)) // => won't be executed'
    .catch(err => console.log(err)) // => will be executed

// Example 3
customFetch('https://swapi.dev/api/people/1/', {
    method: 'GET',
    type: 'json',     // => passing options
    headers: {
        'Content-type': 'application/json; charset=utf-8'
    },
})
    .then(response => console.log(response)) // => Response will be json object
    .then(result => result.name) // => Result will be 'Luke Skywalker'
    .then(result => console.log(result)) // => will display 'Luke Skywalker'
    .catch(err => console.log(err))

// Example 4
customFetch('https://swapi.dev/api/peopl.../1/') // => url misspelling 
    .then(response => response) // => Response will Error 404, state will be rejected
    .then(result => result.name) // => won't be executed'
    .then(res => console.log(res)) // => won't be executed'
    .catch(err => console.log(err)) // => will be executed

// Example 5
customFetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'Request Test',
        body: 'Some Data',
        userId: 1,
    })
})
    .then((res) => console.log(res))
/* Response will be:
    {
      "title": "Request Test",
      "body": "Some Data",
      "userId": 1,
      "id": 101
    }
*/

// Example 6
CustomPromise.all([
    customFetch('https://swapi.dev/api/people/1/').then(response => response.name), // "Luke Skywalker"
    customFetch('https://swapi.dev/api/people/4/').then(response => response.name), // "Darth Vader"
    customFetch('https://swapi.dev/api/people/5/').then(response => response.name)  // "Leia Organa"
])
    .then(result => result) // => result will be [ "Luke Skywalker", "Darth Vader", "Leia Organa" ]
    .then(result => console.log(result)); // => will display [ "Luke Skywalker", "Darth Vader", "Leia Organa" ]
    


/************************ CustomPromise Examples **************************/


// Example 1
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);          // After 2 sec result will be 2
    }, 2000)
})


// Example 2
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(5);          // After 4 sec result will be 5
    }, 4000)
})
    .then(result => result + 2) // Result will be 7


// Example 3
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(5);          // After 3 sec result will be 5
    }, 3000)
})
    .then(result => result + 2) // Result will be 7
    .then(result => console.log(result)) // will display 7
    .then(result => result * 2) // Result will be 14
    .then(result => console.log(result)) // will display 14

    
// Example 4
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello');          // After 5 sec result will be 'Hello
    }, 5000)
})
    .then(result => result + ' World') // Result will be 'Hello World'
    .then(result => console.log(result)) // will display 'Hello World'
    .then(result => 'Some New Result') // Result will be 'Some New Result'
    .then(result => console.log(result)) // will display 'Some New Result'

    
// Example 5
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(5);          // After 3 sec result will be 5
    }, 3000)
})
    .then(result => result + 2) // Result will be 7
    .then(result => console.log(result)) // will display 7
    .then('spelling error')    // => Сatching error here
    .then(result => console.log(result)) // won't be executed 
    .catch(error => console.log(error)) // will display error 


// Example 6
new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        reject('Rejected Value');   // After 2 sec result will 'Rejected Value',
    }, 2000)                        // state will be rejected and error will be throw 
})


// Example 7
CustomPromise.all([
    new CustomPromise(resolve => setTimeout(() => resolve(7), 3000)).then(result => result),
    new CustomPromise(resolve => setTimeout(() => resolve(5), 2000)).then(result => result),
    new CustomPromise(resolve => setTimeout(() => resolve(10), 1000)).then(result => result)
])
    .then(result => result) // => result will be [ 7, 5, 10 ]
    .then(result => console.log(result)); // => will display [ 7, 5, 10]


