import { CLASSES } from './src/representationClasses.js';


function el(type, attrs, children) {

    type = type.toUpperCase();

    if (typeof children === 'string') {
        
        // changing string data to an object instance   
        children = new CLASSES['TEXT']('TEXT', children);
    }

    // creating new class instance
    return new CLASSES[type](type, attrs, children);

}