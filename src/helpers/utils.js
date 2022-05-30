export const findMiddleEl = (arr) => {
    return Math.round((arr.length - 1) / 2);
};

export const findMiddle = (matrix) => {
    const middle = {
        rowIndex: -1,
        elementIndex: -1
    }

    middle.rowIndex = findMiddleEl(matrix);
    middle.elementIndex = findMiddleEl(matrix[middle.rowIndex]);

    return middle;
};

export const createGrid = (rows, columns) => {
    let greed = [];

    for (let i = 0; i < rows; i++) {
        const row = [];

        for (let i = 0; i < columns; i++) {
            row.push('emty');
        }
        greed.push(row);
    }
    return greed;
};

export const findSurroundingIndexes = (matrix) => {
    let indexes = [];
    
    matrix.forEach((row, rowIndex) => {
        row.forEach((item, itemIndex) => {
            if (typeof item === 'object') {
                // checking left cell
                if (matrix[rowIndex][itemIndex - 1] && typeof matrix[rowIndex][itemIndex - 1] !== 'object') {
                    indexes.push([rowIndex, itemIndex - 1]);
                }
                // checking right cell
                if (matrix[rowIndex][itemIndex + 1] && typeof matrix[rowIndex][itemIndex + 1] !== 'object') {
                    indexes.push([rowIndex, itemIndex + 1]);  
                }
                // checking top cell
                if (matrix[rowIndex - 1] && typeof matrix[rowIndex - 1][itemIndex] !== 'object') {
                    indexes.push([rowIndex - 1, itemIndex]);
                }
                // checking bottom cell
                if (matrix[rowIndex + 1] && typeof matrix[rowIndex + 1][itemIndex] !== 'object') {
                    indexes.push([rowIndex + 1, itemIndex]);
                }
            }
        })
    });

    return indexes;
};

export const removeClasses = (matrix) => {
    for (let row of matrix.children) {
        for (let item of row.children) {
            if (item.classList.contains('available')) {
                item.classList.remove('available');
            }
        }
    }
}
