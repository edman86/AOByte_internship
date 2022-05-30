import { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import Modal from './components/Modal/Modal';

import { useSelector, useDispatch } from 'react-redux';
import { selectElements, selectRowsCount, selectColumnsCount, addElement } from './redux/reducers/layoutSlice';

import { findMiddle, createGrid, findSurroundingIndexes, removeClasses } from './helpers/utils';

import './App.css';

function App() {
    const [grid, setGrid] = useState([]);

    const dragEl = useRef(null);
    const dropContainer = useRef(null);

    const elements = useSelector(selectElements);
    const rows = useSelector(selectRowsCount);
    const columns = useSelector(selectColumnsCount);

    const dispatch = useDispatch();

    const handleDragStart = (e) => {
        e.stopPropagation();

        dragEl.current = e.target.dataset.type;

        if (!elements.length) {
            const middleEl = findMiddle(grid);
            dropContainer.current.children[middleEl.rowIndex].children[middleEl.elementIndex]
                .classList.add('available');
        } else {
            const indexes = findSurroundingIndexes(grid);
            indexes.forEach(cellIndexes => {
                dropContainer.current.children[cellIndexes[0]].children[cellIndexes[1]]
                    .classList.add('available');
            });
        }
    }

    const dragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDragEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();

        removeClasses(dropContainer.current);
    }

    const drop = (e) => {
        e.preventDefault();

        const type = dragEl.current;

        if (e.target.classList.contains('available')) {
            const rowIndex = e.target.dataset.rowindex;
            const itemIndex = e.target.dataset.itemindex;

            dispatch(addElement({ type, rowIndex, itemIndex }));
        }

        removeClasses(dropContainer.current);
    }

    useEffect(() => {
        const g = createGrid(rows, columns);
        if (elements) {
            elements.forEach(el => {
                // rendering elements to the grid
                g[el.position[0]][el.position[1]] = el;
            })
        }
        setGrid(g);
    }, [elements]);

    return (
        <div className="App">
            <Header />
            <div className="container">
                <Sidebar
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                />

                <Dashboard
                    grid={grid}
                    dropContainer={dropContainer}
                    dragOver={dragOver}
                    onDrop={drop}
                />

                <Modal />
            </div>
        </div>
    );
}

export default App;
