import React, { Component } from 'react';
import Input from '../Input';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: this.props.schema.createInputsArray(),
            values: {},
            errors: {},
            isValid: true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    setValue(value, inputIndex) {
        const inputs = [...this.state.inputs];
        const updatedInputs = inputs.map((item, index) => {
            if (index === inputIndex) {
                return { ...item, value: value };
            } else {
                return item;
            }
        })
        this.setState({ inputs: updatedInputs });
    }

    handleSubmit(e) {
        e.preventDefault();
        const schema = this.props.schema;
        const updatedInputs = schema.validate(this.state.inputs);

        this.setState({ inputs: updatedInputs });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                {this.state.inputs.map((input, index) => {
                    return (
                        <div key={input.id} className="form-input">
                            <Input
                                type={input.type}
                                label={input.label}
                                name={input.name}
                                id={input.name}
                                index={index}
                                value={this.state.inputs[index].value}
                                setValue={this.setValue}
                                required={input.required}
                                isValid={input.isValid}
                            />
                            <small
                                className={this.state.inputs[index].isValid ? 'hidden' : 'error'}
                            >
                                {this.state.inputs[index].errorMessage}
                            </small>
                        </div>
                    );
                })}

                <br />

                <button type="submit">Sign up</button>
            </form>
        );
    }
}

export default Form;