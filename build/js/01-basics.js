/**
 * ============================================================================
 * TYPESCRIPT BASIC TYPES - COMPREHENSIVE GUIDE
 * ============================================================================
 *
 * This file demonstrates TypeScript's fundamental type system including:
 * - Type inference vs explicit declaration
 * - Primitive types (string, number, boolean, any)
 * - Union types
 * - Function parameter and return type safety
 * - Regular expressions
 *
 * Repository: https://github.com/KirkYagami/learn-typescript/tree/section-00-starter
 * ============================================================================
 */
// ============================================================================
// SECTION 1: TYPE INFERENCE vs EXPLICIT DECLARATION
// ============================================================================
/**
 * TYPE INFERENCE (Implicit Typing)
 * TypeScript automatically determines the type based on the assigned value.
 * Hover over the variable in your IDE to see the inferred type.
 */
let inferredName = "Nick";
// TypeScript infers this as: let inferredName: string
// Once inferred, the type is enforced
// inferredName = 42;  // ❌ Error: Type 'number' is not assignable to type 'string'
/**
 * EXPLICIT TYPE DECLARATION
 * Manually specify the type using a colon followed by the type name.
 * This makes the code more self-documenting and clear.
 */
let explicitName = "Nick";
// Explicitly declared as string
// Type safety is enforced
// explicitName = 42;  // ❌ Error: Type 'number' is not assignable to type 'string'
/**
 * DECLARATION WITHOUT INITIALIZATION
 * You can declare a variable's type without immediately assigning a value.
 */
let uninitializedName;
uninitializedName = "Nick"; // ✅ Valid
// uninitializedName = 42;    // ❌ Error: Type 'number' is not assignable to type 'string'
/**
 * REASSIGNMENT RULES
 * Variables declared with 'let' can be reassigned, but only with the same type.
 * Variables declared with 'const' cannot be reassigned at all.
 */
let mutableName = "Nick";
mutableName = "John"; // ✅ Valid - still a string
// mutableName = 42;   // ❌ Error: Different type
const immutableName = "Nick";
// immutableName = "John";  // ❌ Error: Cannot reassign a const variable
// ============================================================================
// SECTION 2: PRIMITIVE TYPES
// ============================================================================
/**
 * STRING TYPE
 * Represents textual data enclosed in single quotes, double quotes, or backticks.
 */
let username = "Alice";
let greeting = 'Hello, World!';
let message = `Welcome, ${username}!`;
username = "Bob"; // ✅ Valid reassignment
// username = 123; // ❌ Error: Type 'number' is not assignable to type 'string'
/**
 * NUMBER TYPE
 * Represents both integer and floating-point numeric values.
 * TypeScript doesn't distinguish between int, float, or double like other languages.
 */
let meaningOfLife;
meaningOfLife = 42; // ✅ Valid - integer
meaningOfLife = 3.14159; // ✅ Valid - floating point
meaningOfLife = -100; // ✅ Valid - negative number
// meaningOfLife = "code"; // ❌ Error: Type 'string' is not assignable to type 'number'
/**
 * BOOLEAN TYPE
 * Represents logical true/false values.
 */
let isLoading;
isLoading = true; // ✅ Valid
isLoading = false; // ✅ Valid
// isLoading = 1;   // ❌ Error: Type 'number' is not assignable to type 'boolean'
// isLoading = "true";  // ❌ Error: Type 'string' is not assignable to type 'boolean'
let isActive = true;
let hasPermission = false;
/**
 * THE 'ANY' TYPE
 *
 * The 'any' type is a special type that disables type checking.
 * A variable of type 'any' can hold any value and be reassigned to any type.
 *
 * ⚠️ WARNING: Using 'any' defeats the purpose of TypeScript's type safety!
 * Use it sparingly and only when absolutely necessary.
 *
 * Valid use cases:
 * - Working with data of unknown type (e.g., from external APIs)
 * - Migrating JavaScript code to TypeScript incrementally
 * - Interfacing with third-party libraries without type definitions
 */
let album;
album = "Van Halen"; // ✅ Valid - string
album = 1984; // ✅ Valid - number
album = true; // ✅ Valid - boolean
album = ["track1", "track2"]; // ✅ Valid - array
// While flexible, 'any' removes type safety
let riskyData = "text";
riskyData = 42;
// No errors, but you lose all TypeScript benefits
// ============================================================================
// SECTION 3: UNION TYPES
// ============================================================================
/**
 * UNION TYPES
 *
 * Union types allow a variable to hold values of multiple specified types.
 * Use the pipe operator (|) to separate types.
 *
 * This is much better than using 'any' when you know the possible types.
 */
/**
 * Basic Union Type: String or Number
 */
let albumName;
albumName = "Van Halen"; // ✅ Valid - string
albumName = 1984; // ✅ Valid - number
albumName = 5150; // ✅ Valid - number
// albumName = true;      // ❌ Error: Type 'boolean' is not assignable to type 'string | number'
/**
 * Practical Use Case 1: API Post IDs
 * Some APIs return IDs as strings, but you might work with them as numbers.
 */
let postId;
postId = "abc123"; // ✅ API returns string ID
postId = 12345; // ✅ Convert to number for processing
/**
 * Practical Use Case 2: Boolean-like Values
 * Systems sometimes use 0/1 for false/true or actual boolean values.
 */
let isActive2;
isActive2 = 1; // ✅ Numeric true
isActive2 = 0; // ✅ Numeric false
isActive2 = true; // ✅ Boolean true
isActive2 = false; // ✅ Boolean false
/**
 * Multiple Type Unions
 * Union types can include more than two types.
 */
let multiType;
multiType = "text"; // ✅ Valid
multiType = 42; // ✅ Valid
multiType = true; // ✅ Valid
/**
 * Union Types with Null/Undefined
 * Useful for optional values or values that may not exist yet.
 */
let optionalValue;
optionalValue = "exists"; // ✅ Valid
optionalValue = null; // ✅ Valid - no value
optionalValue = undefined; // ✅ Valid - not initialized
// ============================================================================
// SECTION 4: FUNCTIONS AND TYPE SAFETY
// ============================================================================
/**
 * FUNCTIONS WITHOUT TYPE ANNOTATIONS
 *
 * Without explicit types, TypeScript assigns 'any' to parameters when it
 * cannot infer the type, which removes type safety benefits.
 */
function unsafeSum(a, b) {
    // Parameter 'a' implicitly has an 'any' type
    // Parameter 'b' implicitly has an 'any' type
    return a + b;
}
// This function accepts any types - not type-safe!
// unsafeSum(5, 10);      // Works
// unsafeSum("5", 10);    // Works but may not be intended
// unsafeSum(true, null); // Works but likely wrong
/**
 * FUNCTIONS WITH EXPLICIT PARAMETER TYPES
 *
 * Always specify types for function parameters to ensure type safety.
 * TypeScript will then infer the return type based on the function logic.
 */
function safeSum(a, b) {
    return a + b;
}
// TypeScript infers return type as: number
safeSum(5, 10); // ✅ Valid - returns 15
// safeSum("5", 10);   // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
/**
 * RETURN TYPE INFERENCE
 *
 * TypeScript automatically infers the return type based on what the function returns.
 * Hover over the function name to see: function name(params): returnType
 */
function multiply(a, b) {
    return a * b;
}
// Inferred return type: number
function greet(name) {
    return `Hello, ${name}!`;
}
// Inferred return type: string
/**
 * EXPLICIT RETURN TYPE DECLARATION
 *
 * You can explicitly declare the return type for better documentation.
 */
function divide(a, b) {
    return a / b;
}
function getMessage(name) {
    return `Welcome, ${name}`;
}
/**
 * MIXED PARAMETER TYPES
 *
 * When parameters have different types, TypeScript infers the return type
 * based on JavaScript's type coercion rules.
 */
function concatenate(a, b) {
    return a + b;
}
// Inferred return type: string
// In JavaScript: number + string = string (concatenation)
concatenate(42, " is the answer"); // Returns: "42 is the answer"
/**
 * FUNCTIONS WITH UNION TYPE PARAMETERS
 */
function formatId(id) {
    return `ID: ${id}`;
}
formatId(123); // ✅ Valid
formatId("abc"); // ✅ Valid
// formatId(true);  // ❌ Error
/**
 * VOID RETURN TYPE
 *
 * Functions that don't return a value have a 'void' return type.
 */
function logMessage(message) {
    console.log(message);
    // No return statement
}
/**
 * FUNCTIONS RETURNING UNION TYPES
 */
function processData(input) {
    if (input.length > 5) {
        return input.length; // Returns number
    }
    return input; // Returns string
}
// ============================================================================
// SECTION 5: REGULAR EXPRESSIONS
// ============================================================================
/**
 * REGULAR EXPRESSIONS (RegExp)
 *
 * TypeScript recognizes regular expressions as the 'RegExp' type.
 * This is useful when converting JavaScript projects to TypeScript.
 */
/**
 * Type Inference with Regular Expressions
 * TypeScript automatically infers the RegExp type.
 */
let inferredRegex = /\w+/g;
// TypeScript infers: let inferredRegex: RegExp
// Common regex pattern: match all words globally
let wordPattern = /\w+/g;
// Email validation pattern
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone number pattern
let phonePattern = /^\d{3}-\d{3}-\d{4}$/;
/**
 * Explicit RegExp Type Declaration
 * Explicitly declare the type for better code documentation.
 */
let explicitRegex = /\w+/g;
let urlPattern = /^https?:\/\/.+/;
let numberPattern = /^\d+$/;
/**
 * Using Regular Expressions
 */
let text = "TypeScript is awesome and powerful";
let wordMatcher = /\w+/g;
let matches = text.match(wordMatcher);
// matches: ["TypeScript", "is", "awesome", "and", "powerful"]
// ============================================================================
// SECTION 6: BEST PRACTICES EXAMPLES
// ============================================================================
/**
 * BEST PRACTICE 1: Use Type Inference for Simple Cases
 */
let simpleString = "Hello"; // Type inference is clear
let simpleNumber = 42; // Type inference is clear
let simpleBoolean = true; // Type inference is clear
/**
 * BEST PRACTICE 2: Be Explicit in Complex Scenarios
 */
let complexId; // Union types should be explicit
let statusCode; // Be explicit when not immediately assigned
/**
 * BEST PRACTICE 3: Avoid Overusing 'any'
 */
// ❌ Bad - defeats TypeScript's purpose
let badData;
// ✅ Good - use union types instead
let goodData;
// ✅ Good - use specific type when known
let betterData;
/**
 * BEST PRACTICE 4: Always Type Function Parameters
 */
// ❌ Avoid
function badFunction(data) {
    return data;
}
// ✅ Prefer
function goodFunction(data) {
    return data;
}
/**
 * BEST PRACTICE 5: Use Descriptive Variable Names
 */
function calculateSum(num1, num2) {
    return num1 + num2;
}
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
// ============================================================================
// SECTION 7: PRACTICAL EXAMPLES
// ============================================================================
/**
 * Example 1: User Authentication System
 */
let userId;
let isAuthenticated = false;
let username2;
let sessionToken = null;
function login(user, password) {
    // Login logic here
    return true;
}
/**
 * Example 2: Product Catalog
 */
let productId;
let productName;
let productPrice;
let isAvailable;
let productRating;
function formatPrice(price) {
    return `$${price.toFixed(2)}`;
}
/**
 * Example 3: Data Processing
 */
function processInput(input) {
    if (typeof input === "number") {
        return `Number: ${input}`;
    }
    return `String: ${input}`;
}
/**
 * Example 4: Configuration Settings
 */
let apiUrl = "https://api.example.com";
let timeout = 5000;
let enableLogging = true;
let retryAttempts = 3;
// ============================================================================
// SUMMARY
// ============================================================================
/**
 * KEY TAKEAWAYS:
 *
 * 1. TypeScript provides static type checking at compile time
 * 2. Types can be inferred (implicit) or declared (explicit)
 * 3. Primitive types: string, number, boolean, any
 * 4. Union types (|) allow multiple type possibilities
 * 5. Function parameters should always have explicit types
 * 6. Return types can be inferred or explicitly declared
 * 7. Avoid overusing 'any' - use union types instead
 * 8. TypeScript enforces type safety, preventing common bugs
 *
 * Next Topics to Explore:
 * - Objects and interfaces
 * - Arrays and tuples
 * - Enums
 * - Type aliases
 * - Generics
 */ 
