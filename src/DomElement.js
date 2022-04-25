import { isEmpty } from "./utils.js";

export default class DomElement {
    constructor(type, props, children) {
        this.type = type;
        this.props = props || {};
        this.children = children || [];
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