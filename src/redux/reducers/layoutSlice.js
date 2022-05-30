import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    elements: [],
    rows: 5,
    columns: 3
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,

    reducers: {
        addElement: (state, action) => {
            const el = {
                id: uuidv4(),
                position: [action.payload.rowIndex, action.payload.itemIndex],
                type: action.payload.type,
                label: 'default label',
                content: 'default content',
                placeholder: 'default placeholder',
                options: ['default option']
            }

            state.elements.push(el);
        },

        removeElement: (state) => {
            state.elements.pop();
        },

        clear: (state) => {
            state.elements = [];
        },

        changeElement: (state, action) => {
            state.elements = state.elements.map(el => {
                if (el.id === action.payload.id) {
                    el.type = action.payload.type;
                    el.label = action.payload.label;
                    el.content = action.payload.content;
                    el.placeholder = action.payload.placeholder;
                    el.options = action.payload.options;

                    return el;
                }
                console.log('changet');
                return el;
            })
        },

        increase: (state, action) => {
            state[action.payload] += 2;

            if (action.payload === 'rows') {
                state.elements = state.elements.map(el => {
                    el.position[0] = Number(el.position[0]) + 1;
                    return el;
                });
            } else if (action.payload === 'columns') {
                state.elements = state.elements.map(el => {
                    el.position[1] = Number(el.position[1]) + 1;
                    return el;
                });
            }
        },

        decrease: (state, action) => {
            if (state[action.payload] <= 1) {
                return;
            }

            state[action.payload] -= 2;

            if (action.payload === 'rows') {
                state.elements = state.elements.map(el => {
                    el.position[0] = Number(el.position[0]) - 1;
                    return el;
                });
            } else if (action.payload === 'columns') {
                state.elements = state.elements.map(el => {
                    el.position[1] = Number(el.position[1]) - 1;
                    return el;
                });
            }
        }
    }
});

export const { addElement, removeElement, clear, increase, decrease, changeElement } = layoutSlice.actions;
export const selectElements = (state) => state.layout.elements;
export const selectRowsCount = (state) => state.layout.rows;
export const selectColumnsCount = (state) => state.layout.columns;
export default layoutSlice.reducer;