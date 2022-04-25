import { CLASSES } from './src/representationClasses.js';


function el(type, attrs, children) {

    type = type.toUpperCase();

    if (typeof children === 'string' || typeof children === 'number') {
        
        // changing string or number data to an object instance   
        children = new CLASSES['TEXT']('TEXT', children);
    }

    // creating new class instance
    return new CLASSES[type](type, attrs, children);

}

const tree = el('span', {class: 'span'}, 101);

document.getElementById('root').appendChild(tree.draw());