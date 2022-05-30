import { useSelector, useDispatch } from 'react-redux';
import { selectColumnsCount } from '../../redux/reducers/layoutSlice';
import { selectRowsCount } from '../../redux/reducers/layoutSlice';
import { removeElement, clear, increase, decrease } from '../../redux/reducers/layoutSlice';

import style from './Header.module.css';

const Header = (props) => {
    
    const rows = useSelector(selectRowsCount);
    const columns = useSelector(selectColumnsCount);

    const dispatch = useDispatch();
    
    return (
        <header className={style.header}>
            <div className="container">
                <section className={style.counters}>
                    <div className={style.count}>
                        <span>Rows {rows}</span>
                        <button onClick={() => dispatch(increase('rows'))}>+</button>
                        <button onClick={() => dispatch(decrease('rows'))}>-</button>
                    </div>
                    <div className={style.count}>
                        <span>Columns {columns}</span>
                        <button onClick={() => dispatch(increase('columns'))}>+</button>
                        <button onClick={() => dispatch(decrease('columns'))}>-</button>
                    </div>
                    <button onClick={() => dispatch(removeElement())}>Redo</button>
                    <button onClick={() => dispatch(clear())}>Clear</button>
                </section>
                <section>

                </section>
            </div>
        </header>
    );
}

export default Header;