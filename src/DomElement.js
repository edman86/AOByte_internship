import { isEmpty } from "./utils.js";

export default class DomElement {
    constructor(type, props, children) {
        this.type = type;
        this.props = props || {};
        this.children = children || [];
        this._primalType = 'DOMELEMENT';
        this._possibleAttributes = [
            'id', 'class', 'style', 'hidden', 'title' 
        ]
    }
    
    _checkType() {
        if (this.type.toUpperCase() !== this._primalType) {
            throw new Error('The element type does not match the class type!');
        }
    }

    _checkPossibleAttributes() {
        for (let attr of Object.keys(this.props)) {
            if (!this._possibleAttributes.includes(attr.toLowerCase())) {
                throw new Error(`Can't add attribute ${attr} to ${this._primalType}`);
            }
        }
    }

    _addAttributes(...attr) {
        this._possibleAttributes = [...this._possibleAttributes, ...attr];
    }

    draw() {
        const element = document.createElement(this.type);
        
        if (!isEmpty(this.props)) {
            for (let [attribute, value] of Object.entries(this.props)) {
                element.setAttribute(attribute, value);
            }
        }
        
        if (!Array.isArray(this.children)) {
            // in case if this.children is single instance object
            this.children = [this.children];
        }
        
        this.children.forEach(child => {
            if (child.type === 'TEXT') {
                element.textContent = child.children;
            } else {
                element.appendChild(child.draw());
            }
        });
       
        return element;
    }
}