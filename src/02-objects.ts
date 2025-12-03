export {};

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

stringArr[0] = 'John';        // ✅ Valid - string assignment
stringArr.push('hey');         // ✅ Valid - pushing a string
// stringArr[0] = 42;          // ❌ Error: Type 'number' is not assignable to type 'string'
// stringArr.push(42);         // ❌ Error: Argument of type 'number' is not assignable


/**
 * Union Type Array
 * TypeScript infers this as: (string | number)[]
 * Elements can be strings OR numbers in any position.
 */
let guitars = ['Strat', 'Les Paul', 5150];
// Hover to see: let guitars: (string | number)[]

guitars[0] = 1984;             // ✅ Valid - number replaces string
guitars.unshift('Jim');        // ✅ Valid - adding string at beginning
guitars.push(2024);            // ✅ Valid - adding number at end
// guitars.push(true);         // ❌ Error: Type 'boolean' is not assignable to type 'string | number'


/**
 * Multiple Union Type Array
 * TypeScript infers this as: (string | number | boolean)[]
 * Elements can be strings, numbers, OR booleans.
 */
let mixedData = ['EVH', 1984, true];
// Hover to see: let mixedData: (string | number | boolean)[]

mixedData[0] = 42;             // ✅ Valid - number replaces string
mixedData[1] = false;          // ✅ Valid - boolean replaces number
mixedData.push('Van Halen');   // ✅ Valid - adding string


/**
 * ARRAY TYPE COMPATIBILITY
 * 
 * Arrays can be reassigned to other arrays only if types are compatible.
 */

// stringArr = guitars;        // ❌ Error: (string | number)[] not assignable to string[]
guitars = stringArr;           // ✅ Valid: string[] is assignable to (string | number)[]
mixedData = guitars;           // ✅ Valid: (string | number)[] is assignable to (string | number | boolean)[]
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

test.push(1);                  // ✅ Valid
test.push('string');           // ✅ Valid
test.push(true);               // ✅ Valid


/**
 * Empty Array With Type Annotation
 * Explicitly declare the array type for type safety.
 */
let bands: string[] = [];
bands.push('Van Halen');       // ✅ Valid
bands.push('Led Zeppelin');    // ✅ Valid
// bands.push(1984);           // ❌ Error: Type 'number' is not assignable to type 'string'


/**
 * ALTERNATIVE ARRAY TYPE SYNTAX
 */
let numbers: Array<number> = [1, 2, 3, 4, 5];
let names: Array<string> = ['Alice', 'Bob', 'Charlie'];
let flags: Array<boolean> = [true, false, true];

// Union type with Array generic syntax
let mixed2: Array<string | number> = ['text', 42, 'more text', 100];


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
let myTuple: [string, number, boolean] = ['Dave', 42, true];
// Hover to see: let myTuple: [string, number, boolean]

// Accessing and modifying tuple elements
myTuple[0] = 'John';           // ✅ Valid - string in position 0
myTuple[1] = 100;              // ✅ Valid - number in position 1
myTuple[2] = false;            // ✅ Valid - boolean in position 2

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
mixed.push('extra');           // ✅ Valid - can add more elements
mixed.push(42);                // ✅ Valid
mixed.push(true);              // ✅ Valid

// Tuple length and type order is fixed
// myTuple.push('extra');      // ⚠️ TypeScript allows this but it's not recommended


/**
 * Tuple Assignment Rules
 */
mixed = myTuple;               // ✅ Valid - tuple can be assigned to compatible array
// myTuple = mixed;            // ❌ Error - array cannot be assigned to tuple
                               // "Source may have fewer elements" error


/**
 * PRACTICAL TUPLE EXAMPLES
 */

/**
 * Example 1: Coordinates
 */
let coordinates: [number, number] = [40.7128, -74.0060];  // NYC coordinates
let point3D: [number, number, number] = [10, 20, 30];     // 3D point


/**
 * Example 2: RGB Color
 */
type RGB = [number, number, number];
let red: RGB = [255, 0, 0];
let green: RGB = [0, 255, 0];
let blue: RGB = [0, 0, 255];


/**
 * Example 3: Key-Value Pair
 */
let keyValue: [string, number] = ['age', 25];
let userEntry: [string, string] = ['username', 'john_doe'];


/**
 * Example 4: HTTP Response
 */
type HttpResponse = [number, string];  // [statusCode, message]
let successResponse: HttpResponse = [200, 'OK'];
let errorResponse: HttpResponse = [404, 'Not Found'];


/**
 * Example 5: Readonly Tuple
 * Prevents modification after initialization
 */
const readonlyTuple: readonly [string, number] = ['immutable', 42];
// readonlyTuple[0] = 'changed';  // ❌ Error: Cannot assign to '0' because it is a read-only property


/**
 * Example 6: Optional Tuple Elements
 */
let optionalTuple: [string, number?] = ['text'];  // Second element is optional
optionalTuple = ['text', 42];                     // Both are valid


/**
 * Example 7: Rest Elements in Tuples
 */
type StringNumberBooleans = [string, number, ...boolean[]];
let example: StringNumberBooleans = ['text', 42, true, false, true];


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
let myObj: object;

myObj = [];                    // ✅ Valid - arrays are objects
console.log(typeof myObj);     // Logs: "object"

myObj = bands;                 // ✅ Valid - arrays are objects
myObj = {};                    // ✅ Valid - object literal

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

exampleObj.prop1 = 'John';     // ✅ Valid - string assignment
exampleObj.prop2 = false;      // ✅ Valid - boolean assignment

// Type checking for inferred object properties
// exampleObj.prop1 = 42;      // ❌ Error: Type 'number' is not assignable to type 'string'
// exampleObj.prop2 = 'text';  // ❌ Error: Type 'string' is not assignable to type 'boolean'
// exampleObj.prop3 = 'new';   // ❌ Error: Property 'prop3' does not exist


/**
 * EXPLICIT OBJECT SHAPE DEFINITION
 * 
 * Define the exact structure an object must have.
 */
let user: {
    name: string;
    age: number;
    active: boolean;
};

user = {
    name: 'Alice',
    age: 30,
    active: true,
};

// All properties are required
// user = { name: 'Bob' };     // ❌ Error: Missing 'age' and 'active' properties


// ============================================================================
// SECTION 4: INTERFACES
// ============================================================================

/**
 * INTERFACES
 * 
 * Interfaces define the structure (shape) of objects.
 * They're like contracts that objects must fulfill.
 * 
 * Use interfaces when defining object structures, especially for:
 * - Objects that represent entities (User, Product, Guitarist)
 * - Function parameters
 * - Class implementations
 */

/**
 * Basic Interface Definition
 */
interface Guitarist {
    name?: string;                    // Optional property (can be undefined)
    active: boolean;                  // Required property
    albums: (string | number)[];      // Array of strings or numbers
}


/**
 * Using the Interface
 */
let evh: Guitarist = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812'],
};

let jp: Guitarist = {
    // name is optional, so it can be omitted
    active: true,
    albums: ['I', 'II', 'IV'],
};

// Changing property values (must match types)
evh.name = 'Edward';               // ✅ Valid
evh.active = true;                 // ✅ Valid
evh.albums.push('Balance');        // ✅ Valid

// Type checking is enforced
// evh.active = 'yes';             // ❌ Error: Type 'string' is not assignable to type 'boolean'
// evh.albums.push(true);          // ❌ Error: Type 'boolean' is not assignable
// evh.yearsActive = 40;           // ❌ Error: Property 'yearsActive' does not exist


/**
 * OPTIONAL PROPERTIES
 * 
 * Use '?' to make properties optional.
 * Optional properties can be undefined.
 */
interface Product {
    id: number;
    name: string;
    description?: string;    // Optional
    price: number;
    discount?: number;       // Optional
}

let product1: Product = {
    id: 1,
    name: 'Laptop',
    price: 999,
};  // ✅ Valid - optional properties omitted

let product2: Product = {
    id: 2,
    name: 'Mouse',
    description: 'Wireless mouse',
    price: 29,
    discount: 5,
};  // ✅ Valid - optional properties included


/**
 * READONLY PROPERTIES
 * 
 * Properties marked as readonly cannot be modified after object creation.
 */
interface User {
    readonly id: number;     // Cannot be changed
    name: string;
    email: string;
}

let user1: User = {
    id: 101,
    name: 'Alice',
    email: 'alice@example.com',
};

user1.name = 'Alice Smith';        // ✅ Valid
// user1.id = 102;                 // ❌ Error: Cannot assign to 'id' because it is a read-only property


/**
 * INTERFACE WITH METHOD SIGNATURES
 * 
 * Interfaces can define function signatures that objects must implement.
 */
interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

let calc: Calculator = {
    add(a, b) {
        return a + b;
    },
    subtract(a, b) {
        return a - b;
    },
};


/**
 * EXTENDING INTERFACES
 * 
 * Interfaces can extend other interfaces to inherit their properties.
 */
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    department: string;
}

let employee: Employee = {
    name: 'John',
    age: 30,
    employeeId: 1001,
    department: 'Engineering',
};


/**
 * INTERFACE VS TYPE
 * 
 * Both 'interface' and 'type' can define object shapes.
 * Key differences:
 * 
 * INTERFACES:
 * - Can be extended using 'extends' keyword
 * - Can be reopened (declaration merging)
 * - Better for object-oriented programming
 * - Preferred for defining object shapes
 * 
 * TYPES:
 * - More flexible (unions, intersections, primitives)
 * - Cannot be reopened
 * - Better for complex type compositions
 * - Can represent any type, not just objects
 */

// Same Guitarist definition using TYPE instead of INTERFACE
type GuitaristType = {
    name?: string;
    active: boolean;
    albums: (string | number)[];
};

// Both work identically for basic object shapes
let guitarist1: Guitarist = {
    name: 'Slash',
    active: true,
    albums: ['Appetite', 1991],
};

let guitarist2: GuitaristType = {
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
const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) {
        return `Hello ${guitarist.name.toUpperCase()}!`;
    }
    return 'Hello!';
};

console.log(greetGuitarist(jp));     // Logs: "Hello!" (no name)
console.log(greetGuitarist(evh));    // Logs: "Hello EDDIE!"


/**
 * TYPE NARROWING WITH OPTIONAL PROPERTIES
 * 
 * When a property is optional, TypeScript requires you to check
 * if it exists before using it in certain contexts.
 */
const getGuitaristName = (guitarist: Guitarist): string => {
    // Type narrowing: Check if name exists
    if (guitarist.name) {
        return guitarist.name.toUpperCase();  // ✅ Safe to use string methods
    }
    return 'Unknown Guitarist';
};


/**
 * MORE INTERFACE EXAMPLES
 */

/**
 * Example 1: Blog Post
 */
interface BlogPost {
    id: number;
    title: string;
    content: string;
    author: string;
    publishedDate: Date;
    tags?: string[];
    likes?: number;
}

let post: BlogPost = {
    id: 1,
    title: 'Learning TypeScript',
    content: 'TypeScript is awesome...',
    author: 'Dave',
    publishedDate: new Date(),
};


/**
 * Example 2: API Response
 */
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp: number;
}

let userResponse: ApiResponse<User> = {
    success: true,
    data: user1,
    timestamp: Date.now(),
};


/**
 * Example 3: Configuration Object
 */
interface AppConfig {
    apiUrl: string;
    timeout: number;
    retryAttempts: number;
    enableLogging?: boolean;
    features?: {
        darkMode: boolean;
        notifications: boolean;
    };
}

let config: AppConfig = {
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
enum Grade {
    U = 1,    // Starting value is 1
    D,        // Auto-increments to 2
    C,        // Auto-increments to 3
    B,        // Auto-increments to 4
    A,        // Auto-increments to 5
}

console.log(Grade.U);          // Logs: 1
console.log(Grade.D);          // Logs: 2
console.log(Grade.A);          // Logs: 5


/**
 * Default Numeric Enum (starts at 0)
 */
enum Status {
    Pending,       // 0
    InProgress,    // 1
    Completed,     // 2
    Cancelled,     // 3
}

console.log(Status.Pending);      // Logs: 0
console.log(Status.Completed);    // Logs: 2


/**
 * Accessing Enum Values
 */
let currentGrade: Grade;

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
console.log(Grade[1]);           // Logs: "U"
console.log(Grade[5]);           // Logs: "A"
console.log(Status[0]);          // Logs: "Pending"


/**
 * STRING ENUMS
 * 
 * Each member must be initialized with a string literal.
 * No auto-incrementing. No reverse mapping.
 */
enum CardinalDirection {
    North = 'NORTH',
    South = 'SOUTH',
    East = 'EAST',
    West = 'WEST',
}

console.log(CardinalDirection.North);   // Logs: "NORTH"

let direction: CardinalDirection = CardinalDirection.East;


/**
 * STRING ENUM BENEFITS
 * - More readable runtime values
 * - Better debugging experience
 * - Meaningful serialization (e.g., in JSON)
 */
enum LogLevel {
    Error = 'ERROR',
    Warning = 'WARNING',
    Info = 'INFO',
    Debug = 'DEBUG',
}

function log(level: LogLevel, message: string) {
    console.log(`[${level}] ${message}`);
}

log(LogLevel.Error, 'Something went wrong!');
// Logs: "[ERROR] Something went wrong!"


/**
 * HETEROGENEOUS ENUMS (Mixed String and Numeric)
 * 
 * ⚠️ Not recommended - better to stick with all numeric or all string
 */
enum Mixed {
    No = 0,
    Yes = 'YES',
}


/**
 * COMPUTED AND CONSTANT MEMBERS
 */
enum FileAccess {
    None = 0,
    Read = 1 << 1,      // 2 (bitwise left shift)
    Write = 1 << 2,     // 4
    ReadWrite = Read | Write,  // 6 (bitwise OR)
}

console.log(FileAccess.Read);       // Logs: 2
console.log(FileAccess.ReadWrite);  // Logs: 6


/**
 * CONST ENUMS
 * 
 * Const enums are completely removed during compilation.
 * Their values are inlined at usage sites.
 * Cannot have computed members.
 * No reverse mapping.
 */
const enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500,
}

let statusCode: HttpStatus = HttpStatus.OK;
console.log(statusCode);  // Logs: 200


/**
 * PRACTICAL ENUM EXAMPLES
 */

/**
 * Example 1: Days of the Week
 */
enum DayOfWeek {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}

let today: DayOfWeek = DayOfWeek.Wednesday;


/**
 * Example 2: User Roles
 */
enum UserRole {
    Admin = 'ADMIN',
    Editor = 'EDITOR',
    Viewer = 'VIEWER',
    Guest = 'GUEST',
}

function checkPermission(role: UserRole): boolean {
    return role === UserRole.Admin || role === UserRole.Editor;
}


/**
 * Example 3: HTTP Methods
 */
enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

function makeRequest(method: HttpMethod, url: string) {
    console.log(`${method} ${url}`);
}

makeRequest(HttpMethod.GET, '/api/users');


/**
 * Example 4: Order Status
 */
enum OrderStatus {
    Placed = 'PLACED',
    Processing = 'PROCESSING',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED',
    Cancelled = 'CANCELLED',
}

interface Order {
    id: number;
    status: OrderStatus;
    total: number;
}

let order: Order = {
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

enum ProductCategory {
    Electronics = 'ELECTRONICS',
    Clothing = 'CLOTHING',
    Books = 'BOOKS',
    Food = 'FOOD',
}

enum OrderStatusType {
    Pending = 'PENDING',
    Confirmed = 'CONFIRMED',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED',
}

interface ProductInterface {
    id: number;
    name: string;
    category: ProductCategory;
    price: number;
    inStock: boolean;
    tags?: string[];
}

interface CustomerOrder {
    orderId: number;
    customer: string;
    products: ProductInterface[];
    status: OrderStatusType;
    total: number;
    shippingAddress?: string;
}

let products: ProductInterface[] = [
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

let customerOrder: CustomerOrder = {
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

enum Genre {
    Rock = 'ROCK',
    Jazz = 'JAZZ',
    Classical = 'CLASSICAL',
    Electronic = 'ELECTRONIC',
}

interface Artist {
    name: string;
    genres: Genre[];
    active: boolean;
}

interface Album {
    title: string;
    artist: Artist;
    year: number;
    tracks: string[];
    rating?: number;
}

let rockArtist: Artist = {
    name: 'Led Zeppelin',
    genres: [Genre.Rock],
    active: false,
};

let album: Album = {
    title: 'Led Zeppelin IV',
    artist: rockArtist,
    year: 1971,
    tracks: ['Black Dog', 'Rock and Roll', 'Stairway to Heaven'],
    rating: 5,
};


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