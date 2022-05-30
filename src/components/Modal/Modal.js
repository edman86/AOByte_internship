import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsOpen, selectCurrentId } from '../../redux/reducers/modalSlice';
import { changeElement } from '../../redux/reducers/layoutSlice';

import { toggleModal } from '../../redux/reducers/modalSlice';
import style from './Modal.module.css';

const Modal = () => {
    const [type, setType] = useState('input');
    const [label, setLabel] = useState('');
    const [content, setContent] = useState('');
    const [placeholder, setPlaceholder] = useState('');
    const [option, setOption] = useState('');
    const [options, setOptions] = useState([]);

    const isOpen = useSelector(selectIsOpen);
    const currentId = useSelector(selectCurrentId);
    const dispatch = useDispatch();

    const handleClose = (e) => {
        e.stopPropagation();
        dispatch(toggleModal());
    }

    const handleChange = (e) => {
        e.stopPropagation();

        dispatch(changeElement({ id: currentId, type, label, content, placeholder, options }));

        setType('');
        setLabel('');
        setContent('');
        setPlaceholder('');
        setOption('');
        setOptions([]);

        dispatch(toggleModal());
    }

    const addOption = () => {
        const opt = [...options];
        opt.push(option);
        setOptions(opt);
        setOption('');
    }

    return (
        <div className={`${style.modal} ${isOpen && style.isOpen}`}>
            <button className={style.closeBtn} onClick={handleClose}>close</button>
            <div className={style.content}>
                <label>
                    Type
                    <select onChange={(e) => setType(e.target.value)}>
                        <option value="input">input</option>
                        <option value="button">button</option>
                        <option value="textarea">textarea</option>
                        <option value="select">select</option>
                        <option value="radio">radio</option>
                        <option value="checkbox">checkbox</option>
                    </select>
                </label>
                
                <label>
                    Label
                    <input value={label} onChange={(e) => setLabel(e.target.value)} />
                </label>
                
                <label className={(type === 'select' && style.hidden)
                    || (type === 'radio' && style.hidden)
                    || (type === 'checkbox' && style.hidden)
                    || (type === 'input' && style.hidden)}
                >
                    Content
                    <input value={content} onChange={(e) => setContent(e.target.value)} />
                </label>
                
                <label className={(type === 'select' && style.hidden)
                    || (type === 'button' && style.hidden)
                    || (type === 'checkbox' && style.hidden)
                    || (type === 'radio' && style.hidden)}
                >
                    Placeholder
                    <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                </label>
                
                <label className={type !== 'select' && style.hidden}>
                    Options
                    <input value={option} onChange={(e) => setOption(e.target.value)} />
                    <ul>
                        {options.map((option, index) => {
                            return (
                                <li key={index}>
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                    <button onClick={addOption}>Add option</button>
                </label>

                <button className={style.changeBtn} onClick={handleChange}>Change</button>
            </div>
        </div>
    );
}

export default Modal;