class Schema {
    constructor(schema) {
        this.schema = schema || {};
        this.rules = {};
        this.validators = {
            min: minimum,
            max: maximum,
            email: checkEmail,
            required: checkRequired,
        };
        this._createRules();
    }

    _createRules = () => {
        // сreats validation rules object from schema

        for (let rule of Object.keys(this.schema)) {

            // initializing default values 
            let message;
            let vals = [];
            let extras = {};
            let rules = {};
            let validators = [];

            rules.type = this.schema[rule].type;

            if (this.schema[rule].hasOwnProperty('message')) {
                message = this.schema[rule].message;
            }

            // if validators are not repesented by an array
            if (!Array.isArray(this.schema[rule].validators)) {
                validators.push(this.schema[rule].validators);
            } else {
                validators = [...this.schema[rule].validators];
            }

            validators.forEach(validator => {
                if (typeof validator === 'object') {
                    // If validator is an object => 
                    // object's key goes to 'vals' array 
                    // and value goes to 'extras' list.
                    // Example: vals['min', 'max'], extras{min: 3, max: 8}
                    let validatorName;
                    let validatorExtra;

                    for (let [key, value] of Object.entries(validator)) {
                        validatorName = key;
                        validatorExtra = value;
                    }

                    vals.push(validatorName);
                    extras[validatorName] = validatorExtra;
                
                } else if (typeof validator === 'string') {
                    vals.push(validator);
                }
            })

            // Every validator must be an object with validate function.
            // That's why we invoke standart validators at this.validators property.
            // And in order to call them, we use the string representation of the validators.
            // Example: this.validators['min']({min: 3}, 'must contain min {min} chars')
            rules.validators = vals.map(val => this.validators[val](extras, message));

            // creating rule
            this.rules[rule] = rules;
        }
    }

    createInputsArray = () => {
        let inputs = [];

        for (let [inputName, inputValue] of Object.entries(this.rules)) {
            let inputType;
            let label;
            
            if (inputValue.type === 'string' && inputName.toLowerCase().includes('password')) {
                inputType = 'password';
            } else if (inputValue.type === 'string' && inputName.toLowerCase().includes('email')) {
                inputType = 'email';
            } else if (inputValue.type === 'string') {
                inputType = 'text';
            } else if (inputValue.type === 'numeric') {
                inputType = 'number';
            }

            label = createInputName(inputName);

            inputs.push({name: inputName, label: label, type: inputType});
        }

        return inputs;
    }

    validate = (payload) => {
        const values = { ...payload.values };
        const errors = { ...payload.errors };

        // validation
        for (let [key, value] of Object.entries(values)) {
            // Errors for particular key (example: 'firstName')
            // will be represented by an array with error messages,
            // because particular input can have 2 or more validators.  
            errors[key] = [];
            
            this.rules[key].validators
                .forEach(validator => {
                    const isValid = validator.validate(value);
                    if (!isValid) {
                        errors[key].push(validator.message);
                    }
                })
        }

        return errors;
    }
}

const minimum = (extra = undefined, message) => {
    if (!message) {
        message = 'The field must contain minimum {min} letters';
    }
    
    if (extra) {
        const text = message;
        const result = text.match(/{([^}]+)}/g)
            .map(res => res.replace(/{|}/g, ''))

        for (let i = 0; i < result.length; i++) {
            message = message.replace('{' + result[i] + '}', extra[result[i]]);
        }
    }

    return {
        validate: (el) => {
            return el.length >= extra.min;
        },
        message
    }
}

const maximum = (extra = undefined, message) => {
    if (!message) {
        message = 'The field must contain maximum {max} letters';
    }
    
    if (extra) {
        const text = message;
        const result = text.match(/{([^}]+)}/g)
            .map(res => res.replace(/{|}/g, ''))

        for (let i = 0; i < result.length; i++) {
            message = message.replace('{' + result[i] + '}', extra[result[i]]);
        }
    }

    return {
        validate: (el) => {
            return el.length <= extra.max;
        },
        message
    }
}

const checkEmail = (extra = undefined, message) => {
    if (!message) {
        message = 'The email must contain @ symbol and domain name';
    } 

    return {
        validate: (email) => {
            return email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        },
        message
    }
}

const checkRequired = (extra = undefined, message) => {
    return {
        validate: (value) => {
            if (value === '') return false;
            return true;
        },
        message
    }
}

const createInputName = (name) => {
    return name.split(/(?=[A-Z])/).join(' ').toLowerCase();    
}

export default Schema;