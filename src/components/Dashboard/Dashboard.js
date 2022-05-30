import FormElement from '../FormElement/FormElement';
import { v4 as uuidv4 } from 'uuid';

const Dashboard = ({grid, dropContainer, dragOver, onDrop}) => {
    return (
        <section 
            className='dashboard' 
            ref={dropContainer} 
            onDragOver={dragOver}
            onDrop={onDrop}
        >
            {grid.map((row, rowIndex )=> {        
                return <div className='row' key={uuidv4()}>
                    {row.map((item, itemIndex) => {
                        if (typeof item === 'object') {
                            return (
                                <div className="grid-item" key={item.id}>
                                    <FormElement 
                                        {...item}
                                    />
                                </div>
                            ) 
                        }
                        return <div className="grid-item" key={uuidv4()} data-rowindex={rowIndex} data-itemindex={itemIndex}></div>;
                    })}
                </div>
            })}
        </section>
    );
}

export default Dashboard;