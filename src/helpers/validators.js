export const minimum = (extra = undefined, message) => {
    if (!message) {
        message = 'The field must contain minimum {min} letters';
    }

    if (extra) {
        const text = message.match(/{([^}]+)}/g)
        if (text) {
            const result = text.map(res => res.replace(/{|}/g, ''));
            for (let i = 0; i < result.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[result[i]]);
            }
        }
    }

    return {
        validate: (el) => {
            if (isNaN(parseInt(el))) {
                return el.length >= extra.min;
            }
            return Number(el) > extra.min;
        },
        message
    }
}

export const maximum = (extra = undefined, message) => {
    if (!message) {
        message = 'The field must contain maximum {max} letters';
    }

    if (extra) {
        const text = message.match(/{([^}]+)}/g)
        if (text) {
            const result = text.map(res => res.replace(/{|}/g, ''));
            for (let i = 0; i < result.length; i++) {
                message = message.replace('{' + result[i] + '}', extra[result[i]]);
            }
        }
    }

    return {
        validate: (el) => {
            if (isNaN(parseInt(el))) {
                return el.length <= extra.max;
            }
            return Number(el) <= extra.max;
        },
        message
    }
}

export const checkEmail = (extra = undefined, message) => {
    if (!message) {
        message = 'The email must contain @ symbol and domain name';
    }

    return {
        validate: (email) => {
            const res = email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            return res !== null;
        },
        message
    }
}

export const checkPhoneNumber = (extra = undefined, message) => {
    if (!message) {
        message = 'The phone number must be in the format like: 043123456 or 43123456 or +37443123456';
    }

    return {
        validate: (phoneNumber) => {
            const res = phoneNumber.match(/^(([+374]{4}|[0]{1}))?([1-9]{2})(\d{6})$/);
            return res !== null;
        },
        message
    }
}

export const checkUrl = (extra = undefined, message) => {
    if (!message) {
        message = 'URL must include domain name';
    }

    return {
        validate: (url) => {
            const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            return res !== null;
        },
        message
    }
}

export const checkPassword = (extra = undefined, message) => {
    if (!message) {
        message = 'Minimum eight characters, at least one letter, one number and one special character';
    }

    return {
        validate: (password) => {
            const res = password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
            return res !== null;
        },
        message
    }
}