/**
 * TypeScript Basics: Type Assertions, Narrowing, and DOM Interactions
 * ------------------------------------------------------------------
 * This file contains a complete, conflict-free set of examples demonstrating:
 *  - Type assertions
 *  - Narrowing
 *  - More-specific and less-specific assertions
 *  - Double/forced casting
 *  - Function return narrowing
 *  - DOM use-cases
 * All explanations are included as comments.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Example: More specific + less specific assertions
let ts_a = "hello";
let ts_b = ts_a; // Less specific (string → string | number)
let ts_c = ts_a; // More specific (string → literal "hello")
// Using angle-bracket syntax (avoid in TSX)
let ts_d = "world";
let ts_e = "sample";
/* -------------------------------------------------------------
 * 2. FUNCTION RETURN TYPE NARROWING
 * ------------------------------------------------------------- */
/**
 * A function that may return number OR string.
 */
function ts_addOrConcat(a, b, mode) {
    if (mode === "add")
        return a + b;
    return "" + a + b;
}
// Correct assertion
let ts_resultString = ts_addOrConcat(5, 5, "concat");
// Incorrect but allowed assertion (runtime logic error)
let ts_resultNumber = ts_addOrConcat(5, 5, "concat");
/* -------------------------------------------------------------
 * 3. WHEN TYPESCRIPT REJECTS UNSAFE CASTS + DOUBLE CASTING
 * ------------------------------------------------------------- */
// TypeScript rejects this:
// let badCast = 10 as string; // Error
// Forced/double casting (not recommended unless required)
let ts_forced = 10;
function ts_fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield Promise.resolve({ id: 1, name: "Nikhil", isAdmin: true });
        // Here 'response' is inferred as an untyped object.
        const user = response;
        return user;
    });
}
const ts_rawSettings = localStorage.getItem("settings");
const ts_settings = JSON.parse(ts_rawSettings || "{}");
/* -------------------------------------------------------------
 * 6. PRACTICAL USE CASE — FORM ELEMENTS
 * ------------------------------------------------------------- */
/**
 * Narrowing HTML elements via assertion.
 */
const ts_ageInput = document.getElementById("age-input");
const ts_ageValue = Number(ts_ageInput.value);
/* -------------------------------------------------------------
 * 7. PRACTICAL USE CASE — CANVAS CONTEXT
 * ------------------------------------------------------------- */
const ts_canvas = document.querySelector("#myCanvas");
const ts_ctx = ts_canvas.getContext("2d");
ts_ctx.fillRect(0, 0, 100, 100);
/* -------------------------------------------------------------
 * 8. DOM EXAMPLE — IMAGE HANDLING
 * ------------------------------------------------------------- */
// Selecting an <img>
const ts_img = document.querySelector("img");
ts_img.src = "./logo.png";
// Or with non-null assertion
const ts_img2 = document.getElementById("main-image");
ts_img2.src = "./header.png";
/* -------------------------------------------------------------
 * 9. PRACTICAL USE CASE — DYNAMIC COPYRIGHT YEAR
 * ------------------------------------------------------------- */
// <span id="copyright-year"></span>
const ts_yearSpan = document.getElementById("copyright-year");
const ts_currentYear = new Date().getFullYear().toString();
ts_yearSpan.textContent = ts_currentYear;
/* -------------------------------------------------------------
 * 10. SAFE NARROWING (Better than assertion when possible)
 * ------------------------------------------------------------- */
const ts_el = document.getElementById("maybe-btn");
if (ts_el instanceof HTMLButtonElement) {
    ts_el.disabled = true;
}
/* -------------------------------------------------------------
 * 11. CONCLUSION
 * ------------------------------------------------------------- */
/**
 * This file demonstrates real-world TypeScript type assertion patterns.
 * It can be directly used as a reference or inserted into a project.
 * All examples are conflict-free and intentionally prefixed with "ts_".
 */
