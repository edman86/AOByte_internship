const FormInput = (props) => {
    
    const { label, errorMessage, setValue, id, ...inputProps } = props;
    
    return (
        <div className="form-input">
            <label htmlFor={`input${id}`}>{label}</label>
            <input
                id={`input${id}`}
                className='input'
                {...inputProps}
                onChange={setValue}
            />
            <span className="error">{errorMessage}</span>
        </div>
    );


}

export default FormInput;