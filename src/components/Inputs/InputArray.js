import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

class InputArray extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    addItem = (e) => {
        e.stopPropagation();

        if (!this.state.inputValue) return;

        const { index, value, setValue } = this.props;
        const valuesArray = [...value];
        valuesArray.push(this.state.inputValue);
        setValue(valuesArray, index);
        this.setState({ inputValue: '' });
    }

    clearItems = (e) => {
        const { index, setValue } = this.props;
        e.stopPropagation();
        setValue([], index);
    }

    render() {
        const { type, label, id, name, value, required, isValid } = this.props;

        return (
            <>
                <label
                    className={`label ${required && 'required'}`}
                    htmlFor={`input${id}`}
                >
                    {label}
                </label>

                <>
                    <input
                        className={`input ${!isValid && 'input-error'}`}
                        id={`input${id}`}
                        type={type}
                        name={name}
                        value={this.state.inputValue}
                        onChange={(e) => this.setState({ inputValue: e.target.value.trim() })}
                    />
                    <div>
                        <button
                            type="button"
                            onClick={this.addItem}
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={this.clearItems}
                        >
                            Clear
                        </button>
                    </div>
                </>
                <ul
                    className="hidden"
                    style={{ display: value.length ? 'block' : 'none' }}
                >
                    {value.map(val => <li key={uuidv4()}>{val}</li>)}
                </ul>
            </>
        );

    }


}

export default InputArray;