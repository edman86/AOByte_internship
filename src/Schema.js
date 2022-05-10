class Schema {
    constructor(schema) {
        this.schema = schema || {};
        this.rules = {};
        this.validators = {
            min: minimum,
            max: maximum,
            email: checkEmail
        };
        this.createRules();
    }

    createRules = () => {

        for (let rule of Object.keys(this.schema)) {
            // initializing default values 
            let message = "Default Error Message";
            let vals = [];
            let extras = [];
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
                    // and value goes to 'extras' array.
                    // Example: vals['min', 'max'], extras[3, 8]
                    vals.push(...Object.keys(validator));
                    extras.push(...Object.values(validator));

                } else if (typeof validator === 'string') {
                    vals.push(validator);
                }
            })

            rules.validators = vals.map(val => this.validators[val](extras, message));

            // creating rule
            this.rules[rule] = rules;
        }
    }
}

const minimum = (extra = undefined, message) => {
    if (extra) {
        if (Array.isArray(extra)) {

            const text = message;
            const result = text.match(/{([^}]+)}/g)
                .map(res => res.replace(/{|}/g, ''))

            for (let i = 0; i < extra.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[i]);
            }
        }
    }
    return {
        validate: (el, val) => {
            return el.length >= val;
        },
        message
    }
}

const maximum = (extra = undefined, message) => {
    if (extra) {
        if (Array.isArray(extra)) {

            const text = message;
            const result = text.match(/{([^}]+)}/g)
                .map(res => res.replace(/{|}/g, ''))

            for (let i = 0; i < extra.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[i]);
            }
        }
    }
    return {
        validate: (el, val) => {
            return el.length <= val;
        },
        message
    }
}

const checkEmail = (extra = undefined, message) => {
    return {
        validate: (el, val) => {
            return 'correct email';
        },
        message
    }
}

// max: (el, val) => {
//     return el.length <= val;
// },

// const schema = new Schema({
//         firstName: {
//             type: 'string',
//             validators: ['min:3'],
//             message: 'The field must contain min { min } letters'
//         }
// })

export default Schema;