import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const elements = [
    'button',
    'input',
    'textarea',
    'checkbox',
    'radio'
];

const ROWS = 9;
const COLUMNS = 5;

const createGrid = () => {
    const greed = [];

    for (let i = 0; i < ROWS; i++) {
        const row = [];

        for (let i = 0; i < COLUMNS; i++) {
            row.push(i);
        }
        greed.push(row);
    }
    return greed;
}

const findMiddleEl = (arr) => {
    return Math.round((arr.length - 1) / 2);
}

const findMiddle = (matrix) => {
    const middle = {
        rowIndex: -1,
        elementIndex: -1
    }

    middle.rowIndex = findMiddleEl(matrix);
    middle.elementIndex = findMiddleEl(matrix[middle.rowIndex]);

    return middle;
}

function App() {
    const [grid, setGrid] = useState([]);
    const [isDragging, setDragging] = useState(false);
    const dragEl = useRef(null);
    const dropContainer = useRef(null);

    useEffect(() => {
        const g = createGrid();
        setGrid(g);
    }, []);

    useEffect(() => {
        console.log('drag');
    }, [isDragging]);

    const handleDragStart = (e) => {
        // e.preventDefault();
        dragEl.current = e.target;
        // setDragging(true);
        
        console.log('drag start');
        const middleEl = findMiddle(grid);

        // const ngrid = [...grid];
        // ngrid[middleEl.rowIndex][middleEl.elementIndex] = 'el';
        // setGrid(ngrid);
    }

    return (
        <div className="App">
            <aside className='sidebar'>
                {elements.map(el => <div key={uuidv4()} className='sidebar-item' draggable={true} onDragStart={handleDragStart}>{el}</div>)}
            </aside>
            <section className='dashboard' ref={dropContainer}>
                {grid.map(row => {
                    return <div className='row' key={uuidv4()}>
                        {row.map(item => {
                            // if (item === 'el') {
                            //     return <div className="grid-item el" key={uuidv4()}>{item}</div>;
                            // }
                            return <div className="grid-item" key={uuidv4()}>{item}</div>;
                        })}
                    </div>
                })}
            </section>
        </div>
    );
}

export default App;
