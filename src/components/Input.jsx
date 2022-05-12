const Input = (props) => {
    
    const { type, label, index, setValue, id, name, value, required, isValid } = props;
    
    return (
        <>
         
            <label 
                className={`label ${required && 'required'}`}
                htmlFor={`input${id}`}
            >
                {label}
            </label>
           
        
            <input
                className={`input ${!isValid && 'input-error'}`}
                id={`input${id}`}
                type={type}
                name={name}
                value={value}
                onChange={ (e) => setValue(e.target.value, index) }
            />
            
        </>
    );


}

export default Input;