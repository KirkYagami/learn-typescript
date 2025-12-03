// ============================================================================
// SECTION 3: CONVERTING TO MORE/LESS SPECIFIC TYPES
// ============================================================================
/**
 * CONVERTING TO MORE OR LESS SPECIFIC TYPES
 *
 * TypeScript allows assertions to:
 * 1. More specific types (narrowing)
 * 2. Less specific types (widening)
 */
/**
 * Starting with a string type
 */
let a = 'hello';
// a is type: string
/**
 * Converting to LESS specific type (widening)
 * string → string | number
 */
let b = a;
// b is now: string | number (even though value is still 'hello')
/**
 * Converting to MORE specific type (narrowing)
 * string → literal type 'hello'
 */
let c = a;
// c is now: 'hello' (literal type)
/**
 * ANGLE BRACKET SYNTAX (Alternative)
 *
 * You can also use angle brackets instead of 'as' keyword
 * ⚠️ WARNING: Cannot be used in .tsx files (React)
 */
let d = 'world';
// d is type: string with value 'world'
let e = 'world';
// e is type: string with value 'world'
let f = 'world';
// f is type: string | number with value 'world'
/**
 * BEST PRACTICE: Use 'as' keyword
 * - Works everywhere (including React .tsx files)
 * - More consistent with modern TypeScript
 * - Clearer intent
 */
// ============================================================================
// SECTION 4: PRACTICAL EXAMPLE - ADD OR CONCATENATE
// ============================================================================
/**
 * PRACTICAL ASSERTION EXAMPLE
 *
 * Function that can either add numbers or concatenate them as strings
 */
const addOrConcat = (a, b, c) => {
    if (c === 'add') {
        return a + b;
    }
    return '' + a + b; // Coerce to string
};
/**
 * USING ASSERTIONS TO NARROW RETURN TYPE
 *
 * We know this will return a string because we pass 'concat'
 */
let myVal = addOrConcat(2, 2, 'concat');
// ✅ Valid - we asserted the return type is string
/**
 * ⚠️ WARNING: ASSERTIONS CAN BE WRONG
 *
 * TypeScript trusts you, but you can make mistakes!
 */
let nextVal = addOrConcat(2, 2, 'concat');
// ❌ PROBLEM: This actually returns a string, not a number!
// TypeScript sees no problem, but this will cause runtime issues
/**
 * KEY LESSON: BE CAREFUL WITH ASSERTIONS
 *
 * Assertions bypass TypeScript's type checking.
 * Make sure you're correct about the type!
 */
// ============================================================================
// SECTION 5: TYPESCRIPT'S ASSERTION CHECKS
// ============================================================================
/**
 * TYPESCRIPT CHECKS ASSERTIONS WHEN POSSIBLE
 *
 * TypeScript will prevent obviously wrong assertions
 */
// ❌ This causes an error:
// let wrong = 10 as string;
// Error: Conversion of type 'number' to 'string' may be a mistake
/**
 * TypeScript knows a number cannot be directly asserted as a string.
 * This is a good safety check!
 */
// ============================================================================
// SECTION 6: DOUBLE CASTING (FORCED CASTING)
// ============================================================================
/**
 * DOUBLE CASTING (Force Casting)
 *
 * Use 'unknown' as intermediate type to force any conversion.
 * Also called "double assertion" or "forced casting"
 *
 * ⚠️ DANGER: This overrides TypeScript's safety checks!
 * Only use when absolutely necessary.
 */
/**
 * Force casting using 'unknown' intermediate type
 */
let forced = 10;
// First: 10 as unknown
// Then: unknown as string
// Result: TypeScript allows this (but it's wrong!)
/**
 * THE 'unknown' TYPE
 *
 * - Similar to 'any' but safer
 * - Cannot be used directly without type checking
 * - Exception: Can be used for double casting
 * - Useful as intermediate step in assertions
 */
/**
 * Example: Converting between incompatible types
 */
let x = 'hello';
// ⚠️ This compiles but will cause runtime issues!
/**
 * WHEN TO USE DOUBLE CASTING:
 * - Almost never!
 * - Only when you're absolutely sure
 * - Refactor if possible instead
 * - Document why it's necessary
 */
// ============================================================================
// SECTION 7: DOM MANIPULATION - TYPE ASSERTIONS
// ============================================================================
/**
 * DOM MANIPULATION WITH TYPE ASSERTIONS
 *
 * This is where type assertions are MOST useful.
 * TypeScript doesn't know about your HTML document.
 */
/**
 * SELECTING ELEMENTS - TypeScript's Inference
 */
/**
 * querySelector with specific element
 * TypeScript infers: HTMLImageElement | null
 */
let img = document.querySelector('img');
// Type: HTMLImageElement | null
/**
 * querySelector with ID
 * TypeScript infers: Element | null (less specific)
 */
let imgById = document.querySelector('#myId');
// Type: Element | null
/**
 * getElementById
 * TypeScript infers: HTMLElement | null
 */
let myImg = document.getElementById('image');
// Type: HTMLElement | null
/**
 * SPECIFICITY HIERARCHY:
 * Element < HTMLElement < HTMLImageElement
 * (less specific → more specific)
 */
/**
 * ACCESSING ELEMENT PROPERTIES
 *
 * Problem: TypeScript doesn't know if element exists
 */
// ❌ This causes an error:
// img.src = 'photo.jpg';
// Error: Object is possibly 'null'
/**
 * SOLUTION 1: Type Assertion
 * Tell TypeScript the element exists and is specific type
 */
const image = document.querySelector('img');
image.src = 'photo.jpg'; // ✅ Works!
/**
 * SOLUTION 2: Non-null Assertion (!)
 * Tell TypeScript the value is not null
 */
const image2 = document.querySelector('img');
image2.src = 'photo.jpg'; // ✅ Works!
/**
 * NON-NULL ASSERTION (!)
 *
 * The exclamation mark tells TypeScript: "This is NOT null"
 */
/**
 * Example with getElementById
 */
const myImage = document.getElementById('image');
// Without !: HTMLElement | null
// With !: HTMLElement (null removed)
/**
 * Problem: Still not specific enough for some properties
 */
// myImage.src = 'photo.jpg';  // ❌ Error: Property 'src' doesn't exist on HTMLElement
/**
 * SOLUTION: Combine non-null assertion with type assertion
 */
const myImage2 = document.getElementById('image');
myImage2.src = 'photo.jpg'; // ✅ Works!
/**
 * Note: Type assertion includes non-null assertion
 * When you assert a specific type, TypeScript assumes it's not null
 */
/**
 * ANGLE BRACKET SYNTAX FOR DOM
 */
const nextImage = document.getElementById('image');
nextImage.src = 'photo.jpg'; // ✅ Works!
/**
 * ⚠️ Remember: Angle brackets don't work in .tsx files
 */
// ============================================================================
// SECTION 8: PRACTICAL EXAMPLE - COPYRIGHT YEAR
// ============================================================================
/**
 * REAL-WORLD EXAMPLE: Dynamic Copyright Year
 *
 * HTML Structure:
 * <p>
 *   Copyright &copy; <span id="year"></span>
 * </p>
 *
 * Goal: Insert current year into the span element
 */
/**
 * ORIGINAL JAVASCRIPT (with TypeScript errors)
 */
/*
const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
*/
/**
 * Problems:
 * 1. year is possibly null
 * 2. thisYear is number, but setAttribute needs string
 * 3. textContent expects string, not number
 */
/**
 * SOLUTION 1: Using Type Guards (Beginner Friendly)
 */
let year;
year = document.getElementById('year');
let thisYear;
thisYear = new Date().getFullYear().toString();
if (year) {
    year.setAttribute('datetime', thisYear);
    year.textContent = thisYear;
}
/**
 * Explanation:
 * - Explicitly type variables
 * - Convert number to string with .toString()
 * - Use if statement to check for null
 * - All type-safe!
 */
/**
 * SOLUTION 2: Using Type Assertions (More Concise)
 */
const year2 = document.getElementById('year');
const thisYear2 = new Date().getFullYear().toString();
year2.setAttribute('datetime', thisYear2);
year2.textContent = thisYear2;
/**
 * Explanation:
 * - Assert that element exists and is HTMLSpanElement
 * - Type assertion includes non-null assertion
 * - No if statement needed
 * - More concise code
 *
 * ⚠️ Warning: Make sure the element actually exists!
 */
// ============================================================================
// SECTION 9: COMPARISON OF DOM SELECTION METHODS
// ============================================================================
/**
 * COMPARISON: Different ways to select and type DOM elements
 */
/**
 * Method 1: querySelector with type inference
 */
const elem1 = document.querySelector('img');
// Type: HTMLImageElement | null
// TypeScript infers from selector
/**
 * Method 2: querySelector with type assertion
 */
const elem2 = document.querySelector('img');
// Type: HTMLImageElement
// We assert it exists and is specific type
/**
 * Method 3: querySelector with non-null assertion
 */
const elem3 = document.querySelector('img');
// Type: HTMLImageElement
// We assert it's not null
/**
 * Method 4: getElementById (needs assertion for specific type)
 */
const elem4 = document.getElementById('myImage');
// Type: HTMLImageElement
// getElementById returns HTMLElement, we assert specific type
/**
 * Method 5: Type guard with narrowing
 */
const elem5 = document.querySelector('img');
if (elem5) {
    // Inside here, TypeScript knows elem5 is HTMLImageElement (not null)
    elem5.src = 'photo.jpg';
}
/**
 * WHICH METHOD TO USE?
 *
 * Type Guard (if statement):
 * ✅ Safest approach
 * ✅ Handles null case explicitly
 * ✅ Best for beginners
 * ❌ More verbose
 *
 * Type Assertion:
 * ✅ More concise
 * ✅ Good when you're certain element exists
 * ❌ No runtime check
 * ❌ Can cause errors if element missing
 *
 * Non-null Assertion (!):
 * ✅ Quick and simple
 * ✅ Good for prototyping
 * ❌ No runtime check
 * ❌ Can cause errors if element missing
 */
// ============================================================================
// SECTION 10: COMMON DOM ELEMENT TYPES
// ============================================================================
/**
 * COMMON HTML ELEMENT TYPES IN TYPESCRIPT
 */
/**
 * General Elements
 */
const div = document.querySelector('div');
const span = document.querySelector('span');
const paragraph = document.querySelector('p');
/**
 * Form Elements
 */
const input = document.querySelector('input');
const button = document.querySelector('button');
const form = document.querySelector('form');
const textarea = document.querySelector('textarea');
const select = document.querySelector('select');
/**
 * Media Elements
 */
const img2 = document.querySelector('img');
const video = document.querySelector('video');
const audio = document.querySelector('audio');
const canvas = document.querySelector('canvas');
/**
 * Link and Anchor
 */
const anchor = document.querySelector('a');
const link = document.querySelector('link');
/**
 * List Elements
 */
const ul = document.querySelector('ul');
const ol = document.querySelector('ol');
const li = document.querySelector('li');
/**
 * Table Elements
 */
const table = document.querySelector('table');
const tr = document.querySelector('tr');
const td = document.querySelector('td');
// ============================================================================
// SECTION 11: BEST PRACTICES
// ============================================================================
/**
 * BEST PRACTICES FOR TYPE ASSERTIONS
 */
/**
 * ✅ DO: Use type assertions when working with DOM
 */
const header = document.getElementById('header');
/**
 * ✅ DO: Be specific with element types when accessing specific properties
 */
const imageElement = document.querySelector('img');
imageElement.src = 'photo.jpg'; // src is specific to images
/**
 * ✅ DO: Use type guards for extra safety
 */
const element = document.getElementById('element');
if (element) {
    element.textContent = 'Safe access';
}
/**
 * ✅ DO: Document why you're using assertions
 */
// We know this element exists because we created it in the HTML
const footer = document.getElementById('footer');
/**
 * ❌ DON'T: Use assertions to bypass legitimate type errors
 */
// const bad = addOrConcat(2, 2, 'concat') as number;  // Wrong return type!
/**
 * ❌ DON'T: Use double casting unless absolutely necessary
 */
// const bad = 'text' as unknown as number;  // Almost never needed
/**
 * ❌ DON'T: Use angle brackets in React/TSX files
 */
// const bad = <HTMLElement>document.getElementById('id');  // Won't work in .tsx
/**
 * ❌ DON'T: Forget that assertions don't provide runtime safety
 */
// const maybeNull = document.getElementById('nonexistent') as HTMLElement;
// maybeNull.textContent = 'text';  // Runtime error if element doesn't exist
/**
 * ⚠️ REMEMBER: Assertions are your promise to TypeScript
 * If you're wrong, you'll get runtime errors!
 */
// ============================================================================
// SECTION 12: ADVANCED EXAMPLE - FORM HANDLING
// ============================================================================
/**
 * ADVANCED EXAMPLE: Type-safe form handling
 */
/**
 * HTML Structure:
 * <form id="userForm">
 *   <input type="text" id="username" />
 *   <input type="email" id="email" />
 *   <button type="submit">Submit</button>
 * </form>
 */
/**
 * Type-safe form element selection and handling
 */
const userForm = document.getElementById('userForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const email = emailInput.value;
    console.log({ username, email });
});
/**
 * WITH TYPE GUARDS (Safer approach)
 */
const safeForm = document.getElementById('userForm');
const safeUsername = document.getElementById('username');
const safeEmail = document.getElementById('email');
if (safeForm instanceof HTMLFormElement &&
    safeUsername instanceof HTMLInputElement &&
    safeEmail instanceof HTMLInputElement) {
    safeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log({
            username: safeUsername.value,
            email: safeEmail.value,
        });
    });
}
export {};
// ============================================================================
// SUMMARY
// ============================================================================
/**
 * KEY TAKEAWAYS:
 *
 * TYPE ASSERTIONS:
 * - Tell TypeScript you know more about a type
 * - Use 'as' keyword (preferred) or angle brackets
 * - Don't change runtime behavior
 * - You're responsible for correctness
 *
 * SYNTAX:
 * - 'as' keyword: value as Type
 * - Angle brackets: <Type>value (not in .tsx)
 * - Non-null assertion: value!
 * - Double casting: value as unknown as Type
 *
 * DOM MANIPULATION:
 * - TypeScript doesn't know your HTML structure
 * - Use assertions to specify element types
 * - Combine with type guards for safety
 * - Be specific: HTMLImageElement > HTMLElement
 *
 * SAFETY:
 * - Assertions bypass type checking
 * - Can cause runtime errors if wrong
 * - Use type guards when unsure
 * - Document your assumptions
 *
 * BEST PRACTICES:
 * - ✅ Use 'as' keyword (works everywhere)
 * - ✅ Be specific with element types
 * - ✅ Add type guards for extra safety
 * - ❌ Don't use to bypass real type errors
 * - ❌ Avoid double casting when possible
 * - ❌ Don't forget runtime safety
 *
 * Next Topics to Explore:
 * - Classes and inheritance
 * - Generics
 * - Utility types
 * - Type guards (instanceof, typeof)
 * - Advanced DOM manipulation
 */ 
