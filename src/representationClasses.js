import DomElement from "./DomElement.js";


class DivElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'DIV';
        this._checkType();
        this._checkPossibleAttributes();
    }
}

class SpanElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'SPAN';
        this._checkType();
        this._checkPossibleAttributes();
    }
}

class UlElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'UL';
        this._checkType();
        this._addAttributes('type');
        this._checkPossibleAttributes();
    }
}

class OlElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'OL';
        this._checkType();
        this._addAttributes('type', 'reversed', 'start');
        this._checkPossibleAttributes();
    }
}

class LiElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'LI';
        this._checkType();
        this._addAttributes('type', 'value');
        this._checkPossibleAttributes();
    }
}

class PElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'P';
        this._checkType();
        this._addAttributes('align');
        this._checkPossibleAttributes();
    }
}

class AElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'A';
        this._checkType();
        this._addAttributes('href', 'target', 'type');
        this._checkPossibleAttributes();
    }
}

class FormElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'FORM';
        this._checkType();
        this._addAttributes(
            'action', 'autocomplete', 'method', 'name', 'enctype'
        );
        this._checkPossibleAttributes();
    }
}

class LabelElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'LABEL';
        this._checkType();
        this._addAttributes('for');
        this._checkPossibleAttributes();
    }
}

class BrElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'BR';
        this._checkType();
        this._addAttributes('clear');
        this._checkPossibleAttributes();
    }
}

class ButtonElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'BUTTON';
        this._checkType();
        this._addAttributes(
            'name', 'type', 'value', 'disabled', 'form', 'formaction'
        );
        this._checkPossibleAttributes();
    }
}

class InputElement extends DomElement {
    constructor(type, props, children) {
        super(type, props, children);
        this._primalType = 'INPUT';
        this._checkType();
        this._addAttributes(
            'type', 'value', 'form', 'formaction',
            'disabled', 'name', 'placeholder', 'required'
        );
        this._checkPossibleAttributes();
    }
}

class TextElement extends DomElement {
    constructor(type, value) {
        super(type, {}, value);
        this._primalType = 'TEXT';
        this._checkType();
    }
}

export const CLASSES = {
    DIV: DivElement,
    SPAN: SpanElement,
    UL: UlElement,
    OL: OlElement,
    LI: LiElement,
    P: PElement,
    A: AElement,
    FORM: FormElement,
    LABEL: LabelElement,
    BR: BrElement,
    BUTTON: ButtonElement,
    INPUT: InputElement,
    TEXT: TextElement
};