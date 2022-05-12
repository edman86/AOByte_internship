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

const schema = new Schema({
    firstName: {
        type: 'string',
        validators: [{min: 3}, {max: 8}],
        // message: 'The field must contain min {min} and max {max} letters'
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
    password: {
        type: 'string',
        validators: {min: 4},
    },
})


export default App;

