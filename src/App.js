import React from 'react';
import './App.css';
import Schema from './Schema';
import Form from './components/Form/Form';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        console.log(schema);

        return (
            <div className='App'>
                <Form schema={schema} />
            </div>
        );
    }

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
    nickRequired: {
        type: 'string',
        validators: 'required',
    },
    numberField: {
        type: 'numeric',
        validators: 'required',
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
    password: {
        type: 'string',
        validators: { min: 4 },
    },
})


export default App;

