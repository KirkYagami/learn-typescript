// Now use the alias instead of repeating the union type
let value1 = "text";
let value2 = 42;
let mixedArray = ["text", 42, "more text", 100];
let userId1 = "abc123";
let userId2 = 12345;
let evh = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812'],
};
// ❌ Invalid with INTERFACE
// interface PostId = string | number;  // Syntax error!
/**
 * When to use TYPE:
 * - Union types
 * - Intersection types
 * - Primitive aliases
 * - Tuple types
 * - Function types
 *
 * When to use INTERFACE:
 * - Object shapes
 * - Classes
 * - When you need declaration merging
 * - Object-oriented programming
 */
// ============================================================================
// SECTION 2: LITERAL TYPES
// ============================================================================
/**
 * LITERAL TYPES
 *
 * Literal types allow you to specify exact values a variable can have.
 * They're more specific than primitive types like string or number.
 */
/**
 * Single Literal Type
 * Similar to using 'const' - only one possible value
 */
let myName = "Dave";
// myName = "John";  // ❌ Error: Type '"John"' is not assignable to type '"Dave"'
/**
 * This is equivalent to:
 */
const myNameConst = "Dave"; // Can never be reassigned
/**
 * Union of Literal Types
 * Much more useful - allows multiple specific values
 */
let username;
username = "Amy"; // ✅ Valid
username = "Dave"; // ✅ Valid
username = "John"; // ✅ Valid
let roll = 6; // ✅ Valid
function makeRequest(url, method) {
    console.log(`${method} ${url}`);
}
makeRequest("/api/users", "GET"); // ✅ Valid
let orderStatus = "pending";
orderStatus = "approved"; // ✅ Valid
let appTheme = "dark";
let buttonSize = "medium";
/**
 * Benefits of Literal Types:
 * - Type safety with specific values
 * - IntelliSense support (autocomplete)
 * - Self-documenting code
 * - Catch typos at compile time
 * - Alternative to enums for simple cases
 */
// ============================================================================
// SECTION 3: FUNCTIONS
// ============================================================================
/**
 * FUNCTION TYPE ANNOTATIONS
 *
 * Functions should have explicit parameter types.
 * Return types can be inferred or explicitly declared.
 */
/**
 * Basic Function with Type Annotations
 */
const add = (a, b) => {
    return a + b;
};
// TypeScript infers return type as 'number' even without annotation
const result = add(5, 10); // 15
/**
 * Function Without Explicit Return Type
 * TypeScript infers the return type from the function body
 */
const multiply = (a, b) => {
    return a * b;
};
// Hover over 'multiply' to see inferred return type: number
/**
 * VOID RETURN TYPE
 *
 * Functions that don't return a value have a 'void' return type.
 * Use for side effects (logging, updating DOM, etc.)
 */
const logMessage = (message) => {
    console.log(message);
    // No return statement
};
logMessage("Hello"); // ✅ Logs: "Hello"
logMessage(add(2, 3)); // ✅ Logs: 5
/**
 * Traditional Function Declaration
 */
let subtract = function (c, d) {
    return c - d;
};
// Using the type alias
let multiplyFunc = (c, d) => {
    return c * d;
};
// Parameters c and d are inferred as numbers
// Return type is inferred as number
let divideFunc = (c, d) => {
    return c / d;
};
let addFunc = (a, b) => a + b;
/**
 * BEST PRACTICE: Use type aliases for function signatures
 * Use interfaces for object shapes and classes
 */
// ============================================================================
// SECTION 4: OPTIONAL PARAMETERS
// ============================================================================
/**
 * OPTIONAL PARAMETERS
 *
 * Mark parameters as optional using '?'
 * Optional parameters can be undefined
 * Optional parameters must come AFTER required parameters
 */
/**
 * Function with Optional Parameter
 */
const addAll = (a, b, c) => {
    // Type guard: Check if c is defined
    if (typeof c !== 'undefined') {
        return a + b + c;
    }
    return a + b;
};
console.log(addAll(2, 3, 2)); // 7 (all three parameters)
console.log(addAll(2, 3)); // 5 (c is undefined)
/**
 * WHY TYPE GUARDS ARE NECESSARY
 *
 * Optional parameters have type: Type | undefined
 * TypeScript requires you to handle the undefined case
 */
// ❌ This would cause an error without the type guard:
// const badAddAll = (a: number, b: number, c?: number): number => {
//     return a + b + c;  // Error: 'c' is possibly 'undefined'
// };
/**
 * RULE: Optional Parameters Must Be Last
 */
// ❌ Invalid:
// function invalid(a?: number, b: number) {}
// ✅ Valid:
function valid(a, b) { }
// ============================================================================
// SECTION 5: DEFAULT PARAMETERS
// ============================================================================
/**
 * DEFAULT PARAMETERS
 *
 * Provide default values for parameters
 * Parameters with defaults are automatically optional
 * No type guard needed (never undefined)
 */
/**
 * Function with Default Parameter
 */
const sumAll = (a, b, c = 2) => {
    return a + b + c; // No type guard needed!
};
console.log(sumAll(2, 3, 2)); // 7 (explicit c value)
console.log(sumAll(2, 3)); // 7 (c defaults to 2)
/**
 * Default Parameters Can Appear Anywhere
 * Unlike optional parameters, defaults don't need to be last
 * But you must pass 'undefined' to skip them
 */
const sumWithDefaults = (a = 10, b, c = 2) => {
    return a + b + c;
};
console.log(sumWithDefaults(2, 3)); // 7 (a=2, b=3, c=2)
console.log(sumWithDefaults(undefined, 3)); // 15 (a=10, b=3, c=2)
// ❌ Cannot specify default values in the type alias:
// type BadMathFunc = (a: number = 0, b: number = 0) => number;
// ============================================================================
// SECTION 6: REST PARAMETERS
// ============================================================================
/**
 * REST PARAMETERS
 *
 * Collect multiple arguments into an array
 * Uses spread operator syntax (...)
 * Must be the last parameter
 * Represented as an array inside the function
 */
/**
 * Function with Rest Parameters Only
 */
const total = (...nums) => {
    return nums.reduce((prev, curr) => prev + curr);
};
console.log(total(1, 2, 3, 4)); // 10
/**
 * Function with Required Parameter + Rest Parameters
 */
const totalWithRequired = (a, ...nums) => {
    return a + nums.reduce((prev, curr) => prev + curr);
};
console.log(totalWithRequired(10, 1, 2, 3)); // 16 (10 + 1 + 2 + 3)
/**
 * IMPORTANT NOTES:
 *
 * 1. Rest parameters collect "the rest" of the arguments
 * 2. Always comes last in parameter list
 * 3. Represented as an array inside function
 * 4. Called with individual arguments (not an array)
 * 5. TypeScript infers types from array type annotation
 */
/**
 * Example: The reduce callback types are inferred
 */
const sum = (...values) => {
    return values.reduce((prev, curr) => {
        // 'prev' is inferred as number
        // 'curr' is inferred as number
        return prev + curr;
    });
};
// ============================================================================
// SECTION 7: THE NEVER TYPE
// ============================================================================
/**
 * THE NEVER TYPE
 *
 * Represents values that never occur.
 * Used for functions that:
 * 1. Always throw errors
 * 2. Have infinite loops
 * 3. Never return normally
 *
 * Different from 'void':
 * - void: function completes but returns nothing
 * - never: function never completes normally
 */
/**
 * Function That Always Throws an Error
 */
const createError = (errMsg) => {
    throw new Error(errMsg);
};
// This function never returns normally - it always throws
/**
 * Function with Infinite Loop
 */
const infinite = () => {
    let i = 1;
    while (true) {
        i++;
        // Endless loop - never returns
    }
};
// ⚠️ Don't actually use this - it will freeze your program!
/**
 * Fixing the Infinite Loop
 * Adding a break statement changes return type to 'void'
 */
const notInfinite = () => {
    let i = 1;
    while (true) {
        i++;
        if (i > 100)
            break; // Loop can exit
    }
    // Function completes without returning a value
};
// Return type is now 'void' instead of 'never'
/**
 * PRACTICAL USE OF NEVER TYPE
 *
 * Exhaustive type checking with type guards
 */
/**
 * Function That Should Handle All Cases
 */
const createNumberOrString = (value) => {
    if (typeof value === 'string') {
        return 'string';
    }
    if (typeof value === 'number') {
        return 'number';
    }
    // This should never happen, but TypeScript needs it
    return createError('This should never happen!');
};
/**
 * WHY THIS IS NECESSARY:
 *
 * TypeScript sees that value can be number | string
 * Even with type guards, it wants an explicit final return
 * Using createError (which returns 'never') satisfies this
 * because 'never' is assignable to any type
 */
// ============================================================================
// SECTION 8: TYPE GUARDS
// ============================================================================
/**
 * TYPE GUARDS
 *
 * Type guards narrow down the type of a variable within a conditional block.
 * They help TypeScript understand the specific type at a given point.
 */
/**
 * Built-in Type Guards
 */
// typeof type guard
function processValue(value) {
    if (typeof value === 'string') {
        // TypeScript knows 'value' is string here
        return value.toUpperCase();
    }
    // TypeScript knows 'value' is number here
    return value.toFixed(2);
}
/**
 * CUSTOM TYPE GUARDS
 *
 * Create reusable type checking functions
 */
/**
 * Custom Type Guard Function
 */
const isNumber = (value) => {
    return typeof value === 'number' ? true : false;
};
// Using the custom type guard
const checkType = (value) => {
    if (isNumber(value)) {
        return 'number';
    }
    return 'string';
};
/**
 * ADVANCED: Type Predicate (Better Custom Type Guards)
 *
 * Use 'is' keyword for type predicate functions
 * Tells TypeScript that when function returns true, value is specific type
 */
const isNumberPredicate = (value) => {
    return typeof value === 'number';
};
const betterCheckType = (value) => {
    if (isNumberPredicate(value)) {
        // TypeScript knows 'value' is definitely number here
        return value.toFixed(2);
    }
    // TypeScript knows 'value' is definitely string here
    return value.toUpperCase();
};
const logUser = (user) => {
    console.log(`User: ${user.name}, Role: ${user.role}`);
};
const user = {
    id: "abc123",
    name: "Alice",
    role: "admin",
    email: "alice@example.com",
};
const handleResponse = (response) => {
    if (response.success && response.data) {
        return response.data;
    }
    return createError(response.error || 'Unknown error');
};
const calculate = (a, b, operation) => {
    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            if (b === 0) {
                throw createError("Cannot divide by zero");
            }
            return a / b;
        default:
            // Exhaustive check - ensures all operations are handled
            const exhaustiveCheck = operation;
            return exhaustiveCheck;
    }
};
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "valid" : "invalid";
};
const validateForm = (...fields) => {
    const allValid = fields.every(field => {
        if (typeof field !== 'string' || field.length === 0) {
            return false;
        }
        return true;
    });
    return allValid ? "valid" : "invalid";
};
const processData = (data) => {
    if (data === null) {
        return "No data";
    }
    if (typeof data === 'string') {
        return `String: ${data}`;
    }
    if (typeof data === 'number') {
        return `Number: ${data}`;
    }
    if (typeof data === 'boolean') {
        return `Boolean: ${data}`;
    }
    // Should never reach here
    return createError('Unexpected data type');
};
export {};
// ============================================================================
// SECTION 10: BEST PRACTICES
// ============================================================================
/**
 * BEST PRACTICES SUMMARY
 */
/**
 * 1. TYPE ALIASES
 * ✅ DO: Use for union types, primitives, and function signatures
 * ✅ DO: Create semantic, meaningful names
 * ✅ DO: Keep code DRY by reusing complex types
 * ❌ DON'T: Overuse - simple types don't need aliases
 */
/**
 * 2. LITERAL TYPES
 * ✅ DO: Use for fixed sets of specific values
 * ✅ DO: Combine with unions for multiple valid values
 * ✅ DO: Use instead of enums for simple cases
 * ❌ DON'T: Use when values might change at runtime
 */
/**
 * 3. FUNCTIONS
 * ✅ DO: Always type function parameters explicitly
 * ✅ DO: Let TypeScript infer simple return types
 * ✅ DO: Use type aliases for repeated function signatures
 * ✅ DO: Use 'void' for functions with side effects
 * ❌ DON'T: Use 'any' for parameters unless absolutely necessary
 */
/**
 * 4. OPTIONAL PARAMETERS
 * ✅ DO: Place optional parameters last
 * ✅ DO: Use type guards when working with optional params
 * ✅ DO: Consider default parameters instead
 * ❌ DON'T: Forget to handle undefined cases
 */
/**
 * 5. DEFAULT PARAMETERS
 * ✅ DO: Use for parameters that commonly have the same value
 * ✅ DO: Document default values clearly
 * ✅ DO: Remember they can appear anywhere (use undefined to skip)
 * ❌ DON'T: Use in type aliases (not supported)
 */
/**
 * 6. REST PARAMETERS
 * ✅ DO: Place rest parameters last
 * ✅ DO: Use for variable-length argument lists
 * ✅ DO: Type as arrays explicitly
 * ❌ DON'T: Use multiple rest parameters (not allowed)
 */
/**
 * 7. NEVER TYPE
 * ✅ DO: Use for functions that always throw errors
 * ✅ DO: Use for exhaustive type checking
 * ✅ DO: Understand difference between 'never' and 'void'
 * ❌ DON'T: Create infinite loops accidentally
 */
/**
 * 8. TYPE GUARDS
 * ✅ DO: Use typeof for primitive types
 * ✅ DO: Create custom type guards for complex checks
 * ✅ DO: Use type predicates (value is Type) for better inference
 * ❌ DON'T: Forget to handle all cases in unions
 */
// ============================================================================
// SUMMARY
// ============================================================================
/**
 * KEY TAKEAWAYS:
 *
 * TYPE ALIASES:
 * - Create reusable names for any TypeScript type
 * - Keep code DRY and maintainable
 * - Work with primitives, unions, objects, functions
 * - Different from interfaces (more flexible)
 *
 * LITERAL TYPES:
 * - Specify exact values a variable can have
 * - Great for fixed sets of valid values
 * - Provide excellent IntelliSense support
 * - Alternative to enums for simple cases
 *
 * FUNCTIONS:
 * - Always type parameters explicitly
 * - Return types can be inferred or explicit
 * - Use 'void' for no return value
 * - Use type aliases for repeated signatures
 *
 * OPTIONAL & DEFAULT PARAMETERS:
 * - Optional parameters marked with '?'
 * - Must come after required parameters
 * - Default parameters are automatically optional
 * - Defaults can appear anywhere (use undefined)
 *
 * REST PARAMETERS:
 * - Collect variable arguments into array
 * - Must be last parameter
 * - Use spread operator (...)
 *
 * NEVER TYPE:
 * - Functions that never return normally
 * - Always throw errors or infinite loops
 * - Used for exhaustive type checking
 * - Different from 'void'
 *
 * TYPE GUARDS:
 * - Narrow types within conditional blocks
 * - typeof for primitives
 * - Custom guards for complex checks
 * - Type predicates for better inference
 *
 * Next Topics to Explore:
 * - Type assertions (as keyword)
 * - Generics
 * - Utility types
 * - Classes and access modifiers
 * - Async functions and Promises
 */ 
