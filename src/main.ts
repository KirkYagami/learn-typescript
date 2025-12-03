export{};
// let a = 12;        // TypeScript infers: number
// let b = "6";       // TypeScript infers: string
// let c = 2;         // TypeScript infers: number


// let a = 12;
// let b = "6";
// let c = 2;

// console.log(a / b);  // TypeScript error: arithmetic operation on string
// console.log(c * b);  // TypeScript error: arithmetic operation on string

let a: number = 12;
let b: number = 6;
let c: number = 2;

console.log(a / b);  // No error: 2
console.log(c * b);  // No error: 12