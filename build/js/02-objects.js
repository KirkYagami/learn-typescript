/**
 * ============================================================================
 * TYPESCRIPT ARRAYS, TUPLES, OBJECTS & ENUMS - COMPREHENSIVE GUIDE
 * ============================================================================
 *
 * This file demonstrates advanced TypeScript types including:
 * - Arrays and array type inference
 * - Tuples (fixed-length, fixed-type arrays)
 * - Objects and type annotations
 * - Interfaces vs Types
 * - Enums (enumerated types)
 * - Type narrowing and optional properties
 *
 * Repository: https://github.com/KirkYagami/learn-typescript/tree/section-00-starter
 * ============================================================================
 */
// ============================================================================
// SECTION 1: ARRAYS AND TYPE INFERENCE
// ============================================================================
/**
 * ARRAY TYPE INFERENCE
 *
 * TypeScript automatically infers array types based on the initial values.
 * Once inferred, all elements must match the inferred type(s).
 */
/**
 * String Array
 * TypeScript infers this as: string[]
 * All elements must be strings.
 */
let stringArr = ['one', 'hey', 'Dave'];
// Hover to see: let stringArr: string[]
stringArr[0] = 'John'; // ✅ Valid - string assignment
stringArr.push('hey'); // ✅ Valid - pushing a string
// stringArr[0] = 42;          // ❌ Error: Type 'number' is not assignable to type 'string'
// stringArr.push(42);         // ❌ Error: Argument of type 'number' is not assignable
/**
 * Union Type Array
 * TypeScript infers this as: (string | number)[]
 * Elements can be strings OR numbers in any position.
 */
let guitars = ['Strat', 'Les Paul', 5150];
// Hover to see: let guitars: (string | number)[]
guitars[0] = 1984; // ✅ Valid - number replaces string
guitars.unshift('Jim'); // ✅ Valid - adding string at beginning
guitars.push(2024); // ✅ Valid - adding number at end
// guitars.push(true);         // ❌ Error: Type 'boolean' is not assignable to type 'string | number'
/**
 * Multiple Union Type Array
 * TypeScript infers this as: (string | number | boolean)[]
 * Elements can be strings, numbers, OR booleans.
 */
let mixedData = ['EVH', 1984, true];
// Hover to see: let mixedData: (string | number | boolean)[]
mixedData[0] = 42; // ✅ Valid - number replaces string
mixedData[1] = false; // ✅ Valid - boolean replaces number
mixedData.push('Van Halen'); // ✅ Valid - adding string
/**
 * ARRAY TYPE COMPATIBILITY
 *
 * Arrays can be reassigned to other arrays only if types are compatible.
 */
// stringArr = guitars;        // ❌ Error: (string | number)[] not assignable to string[]
guitars = stringArr; // ✅ Valid: string[] is assignable to (string | number)[]
mixedData = guitars; // ✅ Valid: (string | number)[] is assignable to (string | number | boolean)[]
// guitars = mixedData;        // ❌ Error: (string | number | boolean)[] not assignable to (string | number)[]
/**
 * EMPTY ARRAYS AND TYPE ANNOTATIONS
 */
/**
 * Empty Array Without Type Annotation
 * TypeScript infers type as: any[]
 * Can hold any type of data (not type-safe).
 */
let test = [];
// Hover to see: let test: any[]
test.push(1); // ✅ Valid
test.push('string'); // ✅ Valid
test.push(true); // ✅ Valid
/**
 * Empty Array With Type Annotation
 * Explicitly declare the array type for type safety.
 */
let bands = [];
bands.push('Van Halen'); // ✅ Valid
bands.push('Led Zeppelin'); // ✅ Valid
// bands.push(1984);           // ❌ Error: Type 'number' is not assignable to type 'string'
/**
 * ALTERNATIVE ARRAY TYPE SYNTAX
 */
let numbers = [1, 2, 3, 4, 5];
let names = ['Alice', 'Bob', 'Charlie'];
let flags = [true, false, true];
// Union type with Array generic syntax
let mixed2 = ['text', 42, 'more text', 100];
// ============================================================================
// SECTION 2: TUPLES
// ============================================================================
/**
 * TUPLES
 *
 * Tuples are arrays with:
 * - Fixed length (specific number of elements)
 * - Fixed types in specific positions
 * - More strict than regular arrays
 *
 * Use tuples when you need to represent a fixed structure,
 * like coordinates [x, y], RGB colors [r, g, b], or key-value pairs.
 */
/**
 * Basic Tuple Definition
 * Must have exactly 3 elements: string, number, boolean (in that order)
 */
let myTuple = ['Dave', 42, true];
// Hover to see: let myTuple: [string, number, boolean]
// Accessing and modifying tuple elements
myTuple[0] = 'John'; // ✅ Valid - string in position 0
myTuple[1] = 100; // ✅ Valid - number in position 1
myTuple[2] = false; // ✅ Valid - boolean in position 2
// Type checking is position-specific
// myTuple[0] = 42;            // ❌ Error: Type 'number' is not assignable to type 'string'
// myTuple[1] = 'text';        // ❌ Error: Type 'string' is not assignable to type 'number'
// myTuple[3] = 'extra';       // ❌ Error: Tuple of length 3 has no element at index 3
/**
 * Tuple vs Array Comparison
 */
let mixed = ['John', 1, false];
// This is an array: (string | number | boolean)[]
// Can have any length and any order of these types
// Arrays are more flexible
mixed.push('extra'); // ✅ Valid - can add more elements
mixed.push(42); // ✅ Valid
mixed.push(true); // ✅ Valid
// Tuple length and type order is fixed
// myTuple.push('extra');      // ⚠️ TypeScript allows this but it's not recommended
/**
 * Tuple Assignment Rules
 */
mixed = myTuple; // ✅ Valid - tuple can be assigned to compatible array
// myTuple = mixed;            // ❌ Error - array cannot be assigned to tuple
// "Source may have fewer elements" error
/**
 * PRACTICAL TUPLE EXAMPLES
 */
/**
 * Example 1: Coordinates
 */
let coordinates = [40.7128, -74.0060]; // NYC coordinates
let point3D = [10, 20, 30]; // 3D point
let red = [255, 0, 0];
let green = [0, 255, 0];
let blue = [0, 0, 255];
/**
 * Example 3: Key-Value Pair
 */
let keyValue = ['age', 25];
let userEntry = ['username', 'john_doe'];
let successResponse = [200, 'OK'];
let errorResponse = [404, 'Not Found'];
/**
 * Example 5: Readonly Tuple
 * Prevents modification after initialization
 */
const readonlyTuple = ['immutable', 42];
// readonlyTuple[0] = 'changed';  // ❌ Error: Cannot assign to '0' because it is a read-only property
/**
 * Example 6: Optional Tuple Elements
 */
let optionalTuple = ['text']; // Second element is optional
optionalTuple = ['text', 42]; // Both are valid
let example = ['text', 42, true, false, true];
// ============================================================================
// SECTION 3: OBJECTS
// ============================================================================
/**
 * OBJECT TYPES
 *
 * In TypeScript, 'object' is a type that represents any non-primitive type.
 * This includes arrays, functions, and object literals.
 */
/**
 * Basic Object Type Declaration
 *
 * ⚠️ WARNING: Using 'object' type is very loose!
 * Arrays are also objects in JavaScript.
 */
let myObj;
myObj = []; // ✅ Valid - arrays are objects
console.log(typeof myObj); // Logs: "object"
myObj = bands; // ✅ Valid - arrays are objects
myObj = {}; // ✅ Valid - object literal
// myObj = 42;                 // ❌ Error: Type 'number' is not assignable to type 'object'
// myObj = 'text';             // ❌ Error: Type 'string' is not assignable to type 'object'
/**
 * OBJECT LITERAL TYPE INFERENCE
 *
 * TypeScript infers the exact shape (properties and their types) of objects.
 */
const exampleObj = {
    prop1: 'Dave',
    prop2: true,
};
// TypeScript infers:
// {
//     prop1: string;
//     prop2: boolean;
// }
exampleObj.prop1 = 'John'; // ✅ Valid - string assignment
exampleObj.prop2 = false; // ✅ Valid - boolean assignment
// Type checking for inferred object properties
// exampleObj.prop1 = 42;      // ❌ Error: Type 'number' is not assignable to type 'string'
// exampleObj.prop2 = 'text';  // ❌ Error: Type 'string' is not assignable to type 'boolean'
// exampleObj.prop3 = 'new';   // ❌ Error: Property 'prop3' does not exist
/**
 * EXPLICIT OBJECT SHAPE DEFINITION
 *
 * Define the exact structure an object must have.
 */
let user;
user = {
    name: 'Alice',
    age: 30,
    active: true,
};
/**
 * Using the Interface
 */
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812'],
};
let jp = {
    // name is optional, so it can be omitted
    active: true,
    albums: ['I', 'II', 'IV'],
};
// Changing property values (must match types)
evh.name = 'Edward'; // ✅ Valid
evh.active = true; // ✅ Valid
evh.albums.push('Balance'); // ✅ Valid
let product1 = {
    id: 1,
    name: 'Laptop',
    price: 999,
}; // ✅ Valid - optional properties omitted
let product2 = {
    id: 2,
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29,
    discount: 5,
}; // ✅ Valid - optional properties included
let user1 = {
    id: 101,
    name: 'Alice',
    email: 'alice@example.com',
};
user1.name = 'Alice Smith'; // ✅ Valid
let calc = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
};
let employee = {
    name: 'John',
    age: 30,
    employeeId: 1001,
    department: 'Engineering',
};
// Both work identically for basic object shapes
let guitarist1 = {
    name: 'Slash',
    active: true,
    albums: ['Appetite', 1991],
};
let guitarist2 = {
    name: 'Slash',
    active: true,
    albums: ['Appetite', 1991],
};
/**
 * FUNCTIONS WITH INTERFACE PARAMETERS
 *
 * Using interfaces for function parameters provides:
 * - Type safety
 * - Code reusability
 * - Better documentation
 */
const greetGuitarist = (guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`;
    }
    return 'Hello!';
};
console.log(greetGuitarist(jp)); // Logs: "Hello!" (no name)
console.log(greetGuitarist(evh)); // Logs: "Hello EDDIE!"
/**
 * TYPE NARROWING WITH OPTIONAL PROPERTIES
 *
 * When a property is optional, TypeScript requires you to check
 * if it exists before using it in certain contexts.
 */
const getGuitaristName = (guitarist) => {
    // Type narrowing: Check if name exists
    if (guitarist.name) {
        return guitarist.name.toUpperCase(); // ✅ Safe to use string methods
    }
    return 'Unknown Guitarist';
};
let post = {
    id: 1,
    title: 'Learning TypeScript',
    content: 'TypeScript is awesome...',
    author: 'Dave',
    publishedDate: new Date(),
};
let userResponse = {
    success: true,
    data: user1,
    timestamp: Date.now(),
};
let config = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retryAttempts: 3,
    enableLogging: true,
};
// ============================================================================
// SECTION 5: ENUMS
// ============================================================================
/**
 * ENUMS (Enumerated Types)
 *
 * Unlike most TypeScript features, Enums are not just a type-level addition.
 * They add actual code to JavaScript at runtime.
 *
 * Enums allow you to define a set of named constants.
 * Useful for representing a fixed set of values.
 */
/**
 * NUMERIC ENUMS
 *
 * By default, enums are numeric and auto-increment from 0.
 */
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 1] = "U";
    Grade[Grade["D"] = 2] = "D";
    Grade[Grade["C"] = 3] = "C";
    Grade[Grade["B"] = 4] = "B";
    Grade[Grade["A"] = 5] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U); // Logs: 1
console.log(Grade.D); // Logs: 2
console.log(Grade.A); // Logs: 5
/**
 * Default Numeric Enum (starts at 0)
 */
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Completed"] = 2] = "Completed";
    Status[Status["Cancelled"] = 3] = "Cancelled";
})(Status || (Status = {}));
console.log(Status.Pending); // Logs: 0
console.log(Status.Completed); // Logs: 2
/**
 * Accessing Enum Values
 */
let currentGrade;
function updateGrade() {
    currentGrade = Grade.B;
}
updateGrade();
if (currentGrade === Grade.A) {
    console.log("Excellent!");
}
/**
 * Reverse Mapping (Numeric Enums Only)
 * You can get the name from the numeric value.
 */
console.log(Grade[1]); // Logs: "U"
console.log(Grade[5]); // Logs: "A"
console.log(Status[0]); // Logs: "Pending"
/**
 * STRING ENUMS
 *
 * Each member must be initialized with a string literal.
 * No auto-incrementing. No reverse mapping.
 */
var CardinalDirection;
(function (CardinalDirection) {
    CardinalDirection["North"] = "NORTH";
    CardinalDirection["South"] = "SOUTH";
    CardinalDirection["East"] = "EAST";
    CardinalDirection["West"] = "WEST";
})(CardinalDirection || (CardinalDirection = {}));
console.log(CardinalDirection.North); // Logs: "NORTH"
let direction = CardinalDirection.East;
/**
 * STRING ENUM BENEFITS
 * - More readable runtime values
 * - Better debugging experience
 * - Meaningful serialization (e.g., in JSON)
 */
var LogLevel;
(function (LogLevel) {
    LogLevel["Error"] = "ERROR";
    LogLevel["Warning"] = "WARNING";
    LogLevel["Info"] = "INFO";
    LogLevel["Debug"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
function log(level, message) {
    console.log(`[${level}] ${message}`);
}
log(LogLevel.Error, 'Something went wrong!');
// Logs: "[ERROR] Something went wrong!"
/**
 * HETEROGENEOUS ENUMS (Mixed String and Numeric)
 *
 * ⚠️ Not recommended - better to stick with all numeric or all string
 */
var Mixed;
(function (Mixed) {
    Mixed[Mixed["No"] = 0] = "No";
    Mixed["Yes"] = "YES";
})(Mixed || (Mixed = {}));
/**
 * COMPUTED AND CONSTANT MEMBERS
 */
var FileAccess;
(function (FileAccess) {
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
})(FileAccess || (FileAccess = {}));
console.log(FileAccess.Read); // Logs: 2
console.log(FileAccess.ReadWrite); // Logs: 6
let statusCode = 200 /* HttpStatus.OK */;
console.log(statusCode); // Logs: 200
/**
 * PRACTICAL ENUM EXAMPLES
 */
/**
 * Example 1: Days of the Week
 */
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Sunday"] = 0] = "Sunday";
    DayOfWeek[DayOfWeek["Monday"] = 1] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 2] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 3] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 4] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 5] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 6] = "Saturday";
})(DayOfWeek || (DayOfWeek = {}));
let today = DayOfWeek.Wednesday;
/**
 * Example 2: User Roles
 */
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "ADMIN";
    UserRole["Editor"] = "EDITOR";
    UserRole["Viewer"] = "VIEWER";
    UserRole["Guest"] = "GUEST";
})(UserRole || (UserRole = {}));
function checkPermission(role) {
    return role === UserRole.Admin || role === UserRole.Editor;
}
/**
 * Example 3: HTTP Methods
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["PATCH"] = "PATCH";
    HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
function makeRequest(method, url) {
    console.log(`${method} ${url}`);
}
makeRequest(HttpMethod.GET, '/api/users');
/**
 * Example 4: Order Status
 */
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Placed"] = "PLACED";
    OrderStatus["Processing"] = "PROCESSING";
    OrderStatus["Shipped"] = "SHIPPED";
    OrderStatus["Delivered"] = "DELIVERED";
    OrderStatus["Cancelled"] = "CANCELLED";
})(OrderStatus || (OrderStatus = {}));
let order = {
    id: 1001,
    status: OrderStatus.Processing,
    total: 99.99,
};
/**
 * WHEN TO USE ENUMS
 *
 * ✅ Use enums when:
 * - You have a fixed set of related constants
 * - Values are known at compile time
 * - You want type safety and autocomplete
 * - Values have semantic meaning (e.g., status codes, directions)
 *
 * ❌ Avoid enums when:
 * - Values might change at runtime
 * - You need flexibility (consider union types instead)
 * - Bundle size is critical (const enums can help)
 */
// ============================================================================
// SECTION 6: PRACTICAL APPLICATIONS
// ============================================================================
/**
 * COMBINING CONCEPTS: E-COMMERCE EXAMPLE
 */
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["Electronics"] = "ELECTRONICS";
    ProductCategory["Clothing"] = "CLOTHING";
    ProductCategory["Books"] = "BOOKS";
    ProductCategory["Food"] = "FOOD";
})(ProductCategory || (ProductCategory = {}));
var OrderStatusType;
(function (OrderStatusType) {
    OrderStatusType["Pending"] = "PENDING";
    OrderStatusType["Confirmed"] = "CONFIRMED";
    OrderStatusType["Shipped"] = "SHIPPED";
    OrderStatusType["Delivered"] = "DELIVERED";
})(OrderStatusType || (OrderStatusType = {}));
let products = [
    {
        id: 1,
        name: 'Laptop',
        category: ProductCategory.Electronics,
        price: 999,
        inStock: true,
        tags: ['computer', 'portable'],
    },
    {
        id: 2,
        name: 'T-Shirt',
        category: ProductCategory.Clothing,
        price: 29,
        inStock: true,
    },
];
let customerOrder = {
    orderId: 5001,
    customer: 'John Doe',
    products: products,
    status: OrderStatusType.Confirmed,
    total: 1028,
    shippingAddress: '123 Main St',
};
/**
 * COMBINING CONCEPTS: MUSIC LIBRARY EXAMPLE
 */
var Genre;
(function (Genre) {
    Genre["Rock"] = "ROCK";
    Genre["Jazz"] = "JAZZ";
    Genre["Classical"] = "CLASSICAL";
    Genre["Electronic"] = "ELECTRONIC";
})(Genre || (Genre = {}));
let rockArtist = {
    name: 'Led Zeppelin',
    genres: [Genre.Rock],
    active: false,
};
let album = {
    title: 'Led Zeppelin IV',
    artist: rockArtist,
    year: 1971,
    tracks: ['Black Dog', 'Rock and Roll', 'Stairway to Heaven'],
    rating: 5,
};
export {};
// ============================================================================
// SUMMARY
// ============================================================================
/**
 * KEY TAKEAWAYS:
 *
 * ARRAYS:
 * - TypeScript infers array types from initial values
 * - Use explicit annotations for empty arrays: let arr: string[] = []
 * - Union types in arrays: (string | number)[]
 *
 * TUPLES:
 * - Fixed length, fixed type arrays: [string, number, boolean]
 * - Position-specific type checking
 * - More strict than regular arrays
 *
 * OBJECTS:
 * - 'object' type is very loose (includes arrays)
 * - TypeScript infers object shapes from literals
 * - Use explicit type annotations for clarity
 *
 * INTERFACES:
 * - Define object structures/contracts
 * - Support optional properties with '?'
 * - Can be extended for inheritance
 * - Preferred for object-oriented designs
 *
 * TYPES vs INTERFACES:
 * - Both can define object shapes
 * - Interfaces: extendable, declaration merging
 * - Types: more flexible, unions/intersections
 *
 * ENUMS:
 * - Define named constants
 * - Numeric (auto-increment) or String enums
 * - Add runtime code to JavaScript
 * - Great for fixed sets of values
 *
 * Next Topics to Explore:
 * - Type assertions and type guards
 * - Generics
 * - Utility types
 * - Classes and access modifiers
 * - Advanced types (mapped, conditional)
 */ 
