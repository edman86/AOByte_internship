const ErrorMessage = (props) => {
    const { index, inputs } = props;

    return (
        <small
            className={inputs[index].isValid ? 'hidden' : 'error'}
        >
            {inputs[index].errorMessage}
        </small>
    );
}

export default ErrorMessage;