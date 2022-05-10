class Schema {
    constructor(schema) {
        this.schema = schema || {};
        this.rules = {};
        this.validators = {
            min: minimum,
            max: maximum,
        };
        this.createRules();
    }

    createRules = () => {
        let message = "Default Error Message";
        let vals = [];
        let extras = [];
        let rules = {};

        for (let rule of Object.keys(this.schema)) {
            // this.rules[rule] = this.schema[rule];

            rules.type = this.schema[rule].type;

            if (this.schema[rule].hasOwnProperty('message')) {
                message = this.schema[rule].message;
            }

            // if (this.schema[rule].hasOwnProperty('validators')) {

            if (Array.isArray(this.schema[rule].validators)) {
                const validators = this.schema[rule].validators;

                validators.forEach(validator => {
                    vals.push(...Object.keys(validator));
                    extras.push(...Object.values(validator));
                })

                // this.rules[rule].validators = vals.map(val => this.validators[val](extras, message));
                rules.validators =  vals.map(val => this.validators[val](extras, message));
            }
            // }
            this.rules[rule] = rules;
        }
    }
}

const minimum = (extra=undefined, message) => {
    if (extra) {

        if (Array.isArray(extra)) {

            const text = message;
            const result = text.match(/{([^}]+)}/g)
                .map(res => res.replace(/{|}/g, ''))

            for (let i = 0; i < extra.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[i]);
                console.log(extra[i]);
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

const maximum = (extra=undefined, message) => {
    if (extra) {

        if (Array.isArray(extra)) {

            const text = message;
            const result = text.match(/{([^}]+)}/g)
                .map(res => res.replace(/{|}/g, ''))

            for (let i = 0; i < extra.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[i]);
                console.log(extra[i]);
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