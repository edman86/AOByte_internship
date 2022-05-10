import React from 'react';
import './App.css';
import Schema from './Schema';

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
            }
        })

        console.log(schema);

        return (
            <div className='App'>

            </div>
        );
    }

}

export default App;

