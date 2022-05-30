import { v4 as uuidv4 } from 'uuid';

const elements = [
    'button',
    'input',
    'textarea',
    'select',
    'radio',
    'checkbox'
];

const Sidebar = ({ handleDragStart, handleDragEnd }) => {
    return (
        <aside className='sidebar'>
            {elements.map(el => (
                <div
                    key={uuidv4()}
                    className='sidebar-item'
                    data-type={el}
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {el}
                </div>
            )
            )}
        </aside>
    )
}

export default Sidebar;