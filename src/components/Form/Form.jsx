import React, { Component } from 'react';
import Input from '../Input';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [],
            values: {},
            errors: {},
            isValid: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    _initSchema() {
        const schema = this.props.schema;
        let formValues = {};
        let formErrors = {};

        for (let value of Object.keys(schema.rules)) {
            if (schema.rules[value].type === 'string') {
                formValues[value] = '';
                formErrors[value] = '';
            }
        }

        this.setState({ values: formValues, errors: formErrors });
    }

    setValue(value, name) {
        this.setState(prevState => ({ values: { ...prevState.values, [name]: value } }));
    }

    handleSubmit(e) {
        e.preventDefault();
        const schema = this.props.schema;
        const errors = schema.validate(this.state);

        this.setState({ errors: errors });
    }

    componentDidMount() {
        const schema = this.props.schema;
        this._initSchema();

        const inputs = schema.createInputsArray();
        this.setState({ inputs: inputs });
    }

    render() {
        // const schema = this.props.schema;
        // const inputs = schema.createInputsArray();

        // console.log(inputs);

        return (
            <form className="form" onSubmit={this.handleSubmit}>
                {this.state.inputs.map(input => {
                    return (
                        <>
                            <Input
                                key={input.name}
                                type={input.type}
                                label={input.label}
                                name={input.name}
                                setValue={this.setValue}
                            />
                            <small
                                className="error"
                                style={{ display: this.state.errors[input.name] && 'block' }}
                            >
                                <span>{this.state.errors[input.name]}</span>
                            </small>
                        </>
                    );
                })}
                {/* <Input 
                    type="text" 
                    label="First Name" 
                    name="firstName" 
                    setValue={this.setValue} 
                />
                <small 
                    className="error"
                    style={{display: this.state.errors.firstName && 'block'}}
                >
                    <span>{this.state.errors.firstName}</span>
                </small> */}
                <br />

                <button type="submit">Sign up</button>
            </form>
        );
    }
}

export default Form;