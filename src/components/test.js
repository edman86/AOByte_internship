class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        };
    }

    setValue = (e) => {
        const updatedValues = {...this.state.values, [e.target.name]: e.target.value}
        this.setState({ values: updatedValues });
    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    render() {
        return (
            <div className='App'>
                <form onSubmit={this.handleSubmit}>
                    {inputs.map(input => {
                        return (
                            <FormInput
                                key={input.id}
                                {...input}
                                value={this.state.values[input.name]}
                                setValue={this.setValue}
                            />
                        );
                    })}

                    <button type="submit">Sign up</button>
                </form>
            </div>
        );
    }

}

export default App;

const inputs = [
    {
        id: 1,
        name: 'username',
        type: 'text',
        placeholder: 'Username',
        label: 'Username',
        errorMessage: 'Username should be 3-16 characters!',
        pattern: '^[A-Za-z0-9]{3,16}$',
        required: true
    },
    {
        id: 2,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        label: 'Email',
        errorMessage: 'Id should be a valid email adress!',
        required: true
    },
    {
        id: 3,
        name: 'password',
        type: 'text',
        placeholder: 'Password',
        label: 'Password',
        errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number',
        pattern: '^[A-Za-z0-9]{3,8}$',
        required: true
    },
    {
        id: 4,
        name: 'confirmPassword',
        type: 'text',
        placeholder: 'Confirm password',
        label: 'Confirm password',
        errorMessage: 'Passwords don\'t match!',
        pattern: this.state.values.password || "",
        required: true
    }
];