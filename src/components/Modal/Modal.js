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
    const [width, setWidth] = useState('');
    const [options, setOptions] = useState([]);

    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsOpen);
    const currentId = useSelector(selectCurrentId);

    const handleClose = (e) => {
        setType('input');
        setLabel('');
        setContent('');
        setPlaceholder('');
        setOption('');
        setWidth('');
        setOptions([]);

        dispatch(toggleModal());
    }

    const changePropertiesHandler = (e) => {
        dispatch(changeElement({ id: currentId, type, label, content, placeholder, width, options }));
        handleClose();
    }

    const addOption = () => {
        const opt = [...options];
        opt.push(option);
        setOptions(opt);
        setOption('');
    }

    return (
        <div className={`${style.modal} ${isOpen && style.isOpen}`}>

            <div className={style.backdrop} onClick={handleClose}></div>
            <div className={style.content}>
                <button className={style.closeBtn} onClick={handleClose}>close</button>

                <div className={style.property}>
                    <label>Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="input">input</option>
                        <option value="button">button</option>
                        <option value="textarea">textarea</option>
                        <option value="select">select</option>
                        <option value="radio">radio</option>
                        <option value="checkbox">checkbox</option>
                    </select>
                </div>

                <div className={style.property}>
                    <label>Label</label>
                    <input value={label} onChange={(e) => setLabel(e.target.value)} />
                </div>

                <div className={`${style.property} ${type === 'button'
                    || type === 'textarea'
                    || type === 'input'
                    ? style.show : style.hidden
                    }`}>
                    <label>Content</label>
                    <input value={content} onChange={(e) => setContent(e.target.value)} />
                </div>

                <div className={`${style.property} ${type === 'input'
                    || type === 'textarea'
                    ? style.show : style.hidden

                    }`}>
                    <label>Placeholdel</label>
                    <input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} />
                </div>

                <div className={`${style.property} ${type === 'select'
                    ? style.show : style.hidden
                    }`}>
                    <label>Options</label>
                    <input value={option} onChange={(e) => setOption(e.target.value)} />
                    <button onClick={addOption}>Add option</button>
                    <ul>
                        {options.map((option, index) => {
                            return (
                                <li key={index}>
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className={`${style.property} ${type === 'input'
                    || type === 'button'
                    || type === 'textarea'
                    || type === 'select'
                    ? style.show : style.hidden
                    }`}>
                    <label>Width</label>
                    <input value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>

                <button className={style.changeBtn} onClick={changePropertiesHandler}>Change</button>
            </div>
        </div>
    );
}

export default Modal;