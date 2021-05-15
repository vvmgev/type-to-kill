// export const intersect = (rect1, rect2) => {
//     const x = Math.max(rect1.x, rect2.x),
//         num1 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width),
//         y = Math.max(rect1.y, rect2.y),
//         num2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
//     return (num1 >= x && num2 >= y);
// };

// export const intersect = (rect1, rect2) => {
//     let xDistance = rect2.x - rect1.x;
//     let yDistance = rect2.y - rect1.y;

//     return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))
// };



export const intersect = (rect1, rect2) => {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true
     }
}

