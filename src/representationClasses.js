import DomElement from "./DomElement.js";


class DivElement extends DomElement {}

class SpanElement extends DomElement {}

class UlElement extends DomElement {}

class OlElement extends DomElement {}

class LiElement extends DomElement {}

class PElement extends DomElement {}

class AElement extends DomElement {}

class FormElement extends DomElement {}

class LabelElement extends DomElement {}

class BrElement extends DomElement {}

class ButtonElement extends DomElement {}

class InputElement extends DomElement {}

class TextElement extends DomElement {
    constructor(type, value) {
        super(type, {}, value);
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