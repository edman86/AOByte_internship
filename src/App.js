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
        const schema = new Schema({
            firstName: {
                type: 'string',
                validators: [{min: 3}, {max: 8}],
                message: 'The field must contain min {min} and max {max} letters'
            },
            secondName: {
                type: 'string',
                validators: {min: 3},
            },
            nickName: {
                type: 'string',
                validators: {max: 8},
            },
            email: {
                type: 'string',
                validators: 'email',
            },
        })

        console.log(schema);

        return (
            <div className='App'>
                <Form schema={schema} />
            </div>
        );
    }

}

export default App;

