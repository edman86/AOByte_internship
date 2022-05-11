const Input = (props) => {
    
    const { label, errorMessage, setValue, id, name, ...inputProps } = props;
    
    return (
        <div className="form-input">
            <label htmlFor={`input${id}`}>{label}</label>
            <input
                id={`input${id}`}
                className='input'
                {...inputProps}
                onChange={ (e) => setValue(e.target.value, name) }
            />
            <span className="error">{errorMessage}</span>
        </div>
    );


}

export default Input;