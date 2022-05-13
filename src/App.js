import React from 'react';
import './App.css';
import Schema from './Schema';
import Form from './components/Form/Form';

const App = () => {
    return (
        <div className='App'>
            <Form schema={schema} />
        </div>
    );
}

const passportValidator = (extra, message) => {
    if (!message) {
        message = 'The passport number must include two letters and seven digits';
    }

    return {
        validate: (val) => {
            return val.match(/^[a-zA-Z]{2}[0-9]{7}$/);
        },
        message
    }
}

const schema = new Schema({
    firstName: {
        type: 'string',
        validators: [{ min: 3 }, { max: 8 }],
    },
    login: {
        type: 'string',
        validators: ['required', { min: 5 }],
        message: 'The login must not be shorter than {min}'
    },
    age: {
        type: 'numeric',
        validators: ['required', { min: 18 }, { max: 99 }],
        message: 'Age can be over {min} and under {max}'
    },
    email: {
        type: 'string',
        validators: 'email',
    },
    phoneNumbers: {
        type: 'array[string]',
        validators: 'phone',
    },
    passport: {
        type: 'string',
        validators: passportValidator
    },
    website: {
        type: 'string',
        validators: ['url']
    },
    password: {
        type: 'string',
        validators: ['password', 'required']
    },
})

export default App;