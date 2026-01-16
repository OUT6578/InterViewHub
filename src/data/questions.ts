// import './App.css'
// import ProPage from './pages/ProPage'
// import { Toaster } from "react-hot-toast";
// import AppLayout from './components/Layout/AppLayout';
// function App() {

//   return (
//     <>

// <Toaster position="top-right" />
// <AppLayout>
//       <ProPage/>
//       </AppLayout>
//     </>
//   )
// }

// export default App
import React, { useState } from "react";
import {
  Download,
  Eye,
  Code,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      id: "async",
      name: "Async & Event Loop",
      icon: Zap,
      color: "bg-blue-500",
    },
    { id: "array", name: "Array Methods", icon: Code, color: "bg-green-500" },
    { id: "react", name: "React Hooks", icon: Code, color: "bg-cyan-500" },
    {
      id: "operators",
      name: "Operators & Coercion",
      icon: Code,
      color: "bg-orange-500",
    },
    {
      id: "scope",
      name: "Var, Let, Const & Scope",
      icon: Code,
      color: "bg-pink-500",
    },
  ];

  const questions = [
    {
      id: 1,
      category: "async",
      level: "🧠 Level 1",
      difficulty: "Easy",
      question: "Basic setTimeout Execution",
      code: `console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");`,
      output: `A
C
B`,
      explanation: `• console.log → synchronous
• setTimeout → async (goes to macrotask queue)
• Even 0ms timeout waits for call stack to clear`,
    },
    {
      id: 2,
      category: "async",
      level: "🧠 Level 2",
      difficulty: "Easy",
      question: "Multiple setTimeout",
      code: `console.log(1);

setTimeout(() => console.log(2), 100);
setTimeout(() => console.log(3), 0);

console.log(4);`,
      output: `1
4
3
2`,
      explanation: `• 3 runs before 2 because 0ms < 100ms
• Synchronous code executes first
• Then setTimeout in order of delay`,
    },
    {
      id: 3,
      category: "async",
      level: "🧠 Level 3",
      difficulty: "Medium",
      question: "setInterval with clearInterval",
      code: `let count = 0;

const id = setInterval(() => {
  console.log(count);
  count++;
  if (count === 3) {
    clearInterval(id);
  }
}, 0);

console.log("Done");`,
      output: `Done
0
1
2`,
      explanation: `• setInterval is async
• "Done" executes first (synchronous)
• Interval stops when count === 3`,
    },
    {
      id: 4,
      category: "async",
      level: "🧠 Level 5",
      difficulty: "Hard",
      question: "Promise vs setTimeout (VERY IMPORTANT)",
      code: `console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");`,
      output: `A
D
C
B`,
      explanation: `📌 Execution Order:
• Sync → Highest
• Promise (then) → Microtask
• setTimeout → Macrotask

👉 Microtask always runs before Macrotask`,
    },
    {
      id: 5,
      category: "async",
      level: "🧠 Level 8",
      difficulty: "Hard",
      question: "Closure + setTimeout (INTERVIEW FAVORITE)",
      code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}`,
      output: `3
3
3`,
      explanation: `• var has function scope
• All callbacks share same i
✔ Fix using let:
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
Output: 0, 1, 2`,
    },
    {
      id: 6,
      category: "async",
      level: "😵‍💫 Q13",
      difficulty: "Expert",
      question: "async / await ULTA flow",
      code: `async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("C");
test();
console.log("D");`,
      output: `C
A
D
B`,
      explanation: `• await breaks function and schedules remaining code as microtask
• Synchronous code executes first
• Then microtasks execute`,
    },
    {
      id: 7,
      category: "array",
      level: "😵‍💫 Q1",
      difficulty: "Medium",
      question: "map vs forEach (MOST COMMON TRAP)",
      code: `const arr = [1, 2, 3];

const a = arr.map(x => x * 2);
const b = arr.forEach(x => x * 2);

console.log(a);
console.log(b);`,
      output: `[2, 4, 6]
undefined`,
      explanation: `• map → returns new array
• forEach → returns undefined
• forEach is for side effects only`,
    },
    {
      id: 8,
      category: "array",
      level: "😵‍💫 Q3",
      difficulty: "Medium",
      question: "splice vs slice (INTERVIEW FAVORITE)",
      code: `const arr = [1, 2, 3, 4, 5];

const a = arr.slice(1, 3);
const b = arr.splice(1, 3);

console.log(a);
console.log(b);
console.log(arr);`,
      output: `[2, 3]
[2, 3, 4]
[1, 5]`,
      explanation: `• slice → non-mutating (creates copy)
• splice → mutates original array
• splice removes elements from original`,
    },
    {
      id: 9,
      category: "array",
      level: "😵‍💫 Q5",
      difficulty: "Hard",
      question: "sort trap (NUMBERS)",
      code: `const arr = [10, 2, 5, 1];

arr.sort();
console.log(arr);`,
      output: `[1, 10, 2, 5]`,
      explanation: `• Default sort() converts to string
• "10" comes before "2" alphabetically

✔ Correct way:
arr.sort((a, b) => a - b);`,
    },
    {
      id: 10,
      category: "array",
      level: "😵‍💫 Q10",
      difficulty: "Hard",
      question: "includes vs indexOf (NaN TRAP)",
      code: `const arr = [NaN, 1, 2];

console.log(arr.includes(NaN));
console.log(arr.indexOf(NaN));`,
      output: `true
-1`,
      explanation: `• includes uses SameValueZero (handles NaN)
• indexOf fails for NaN (uses ===)
• Always use includes for NaN checks`,
    },
    {
      id: 11,
      category: "array",
      level: "😵‍💫 Q11",
      difficulty: "Expert",
      question: "map + parseInt TRAP (VERY COMMON)",
      code: `const arr = ["10", "20", "30"];

const result = arr.map(parseInt);
console.log(result);`,
      output: `[10, NaN, NaN]`,
      explanation: `• map passes (value, index, array)
• parseInt(value, radix)
• parseInt("10", 0) → 10
• parseInt("20", 1) → NaN
• parseInt("30", 2) → NaN (invalid base-2)`,
    },
    {
      id: 12,
      category: "array",
      level: "😵‍💫 Q1",
      difficulty: "Hard",
      question: "Number + String domino effect",
      code: `const arr = [1, "2", 3];

const result = arr.reduce((a, b) => a + b);
console.log(result);`,
      output: `123`,
      explanation: `• 1 + "2" = "12" (string conversion)
• "12" + 3 = "123"
• Once string enters → everything becomes string`,
    },
    {
      id: 13,
      category: "array",
      level: "😵‍💫 Q3",
      difficulty: "Medium",
      question: "Subtraction ignores strings",
      code: `const arr = [10, "5", 2];

const result = arr.reduce((a, b) => a - b);
console.log(result);`,
      output: `3`,
      explanation: `• 10 - "5" = 5 (forces number conversion)
• 5 - 2 = 3
• Subtraction (-) always converts to numbers`,
    },
    {
      id: 14,
      category: "react",
      level: "⚛️ React",
      difficulty: "Expert",
      question: "useState + setTimeout + useEffect",
      code: `function App() {
  const [fruit, setFruit] = useState("mango");

  useEffect(() => {
    console.log("1️⃣ Sync:", fruit);
    setFruit("apple");
    console.log("2️⃣ After setState:", fruit);
    
    setTimeout(() => {
      setFruit("banana");
      console.log("3️⃣ setTimeout:", fruit);
    }, 0);
  }, []);

  console.log("4️⃣ Render:", fruit);
  return <h1>{fruit}</h1>;
}`,
      output: `4️⃣ Render: mango
1️⃣ Sync: mango
2️⃣ After setState: mango
3️⃣ setTimeout: mango
4️⃣ Render: apple
4️⃣ Render: banana`,
      explanation: `• setState is asynchronous
• Console logs capture closure value
• Each setState triggers re-render
• setTimeout closure captures old value`,
    },
    {
      id: 15,
      category: "async",
      level: "🧠 Level 1",
      difficulty: "Easy",
      question: "Boolean Addition",
      code: `console.log(true + false);
console.log(true + true + false);`,
      output: `1
2`,
      explanation: `• true is coerced to 1
• false is coerced to 0
• 1 + 0 = 1
• 1 + 1 + 0 = 2`,
    },
    {
      id: 16,
      category: "react",
      level: "⚛️ React",
      difficulty: "Easy",
      question: "Basic useEffect Flow",
      code: `function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Effect:", count);
    setCount(count + 1);
  }, []);

  console.log("Render:", count);
  return null;
}`,
      output: `Render: 0
Effect: 0
Render: 1`,
      explanation: `• Render runs first (count=0)
• Effect runs after render (logs 0)
• setState triggers re-render (count=1)`,
    },
    {
      id: 17,
      category: "react",
      level: "⚛️ React",
      difficulty: "Medium",
      question: "State Batching",
      code: `function App() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    setCount(count + 1);
    setCount(count + 1);
  }, []);

  console.log(count);
  return null;
}`,
      output: `0
1`,
      explanation: `• State updates are batched in event handlers/effects
• Both updates use the same stale closure value (count=0)
• To fix: use functional update setCount(prev => prev + 1)`,
    },
    {
      id: 18,
      category: "react",
      level: "⚛️ React",
      difficulty: "Hard",
      question: "Effect Infinite Loop",
      code: `function App() {
  const [x, setX] = React.useState(0);

  React.useEffect(() => {
    setX(x + 1);
  }, [x]);

  return null;
}`,
      output: `Infinite re-render loop`,
      explanation: `• Effect depends on 'x'
• Effect updates 'x'
• Update triggers re-render
• Re-render triggers effect... Loop!`,
    },
    {
      id: 19,
      category: "async",
      level: "🧠 Level 4",
      difficulty: "Medium",
      question: "Nested setTimeout Order",
      code: `setTimeout(() => {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
}, 0);`,
      output: `1
2`,
      explanation: `• Outer timeout runs first
• Inner timeout scheduled
• Inner timeout runs after`,
    },
    {
      id: 20,
      category: "async",
      level: "🧠 Level 6",
      difficulty: "Hard",
      question: "Promise vs Timeout vs Sync",
      code: `setTimeout(() => {
  console.log("A");
}, 0);
Promise.resolve().then(() => console.log("B"));
console.log("C");`,
      output: `C
B
A`,
      explanation: `• Sync (C) runs first
• Microtask (Promise B) runs second
• Macrotask (Timeout A) runs last`,
    },
    {
      id: 21,
      category: "react",
      level: "⚛️ React",
      difficulty: "Medium",
      question: "Effect with Timeout Closure",
      code: `function App() {
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setN(n + 1);
      console.log("Timeout:", n);
    }, 0);
  }, []);

  console.log("Render:", n);
  return null;
}`,
      output: `Render: 0
Timeout: 0
Render: 1`,
      explanation: `• Initial render: n=0
• Effect schedules timeout
• Timeout closure captures n=0
• setN(0+1) triggers re-render with n=1`,
    },
    {
      id: 22,
      category: "array",
      level: "🧠 Level 2",
      difficulty: "Medium",
      question: "Sum of Numbers and Strings",
      code: `const arr=["3",2,5,"456","452",45,23,12,"134"];

function sumofAllNumberAndString(x){
  let sum=0;
  let sumofAllNumber=0;
  let sumofAllString=0;
  for(let i=0;i<x.length;i++){
     if(typeof(x[i])==="number" || typeof(x[i])==="string"){
         sum+=Number(x[i])
     }
     if(typeof(x[i])=="number"){
         sumofAllNumber+=Number(x[i])
     }
     if(typeof(x[i])=="string"){
        sumofAllString=x[i]
     }
  }
  console.log(sum);
  console.log(sumofAllNumber);
  console.log(sumofAllString);
}

sumofAllNumberAndString(arr)`,
      output: `1132
87
134`,
      explanation: `• Iterates through array
• Converts strings to numbers for total sum
• Tracks number sum separately
• sumofAllString is overwritten in loop, logs last string "134"`,
    },
    {
      id: 23,
      category: "react",
      level: "⚛️ React",
      difficulty: "Hard",
      question: "Functional State Updates in Timeout",
      code: `function App() {
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setVal(v => v + 1);
      setVal(v => v + 1);
    }, 0);
  }, []);

  return null;
}`,
      output: `State increases by 2 after timeout.`,
      explanation: `• Functional updates (v => v + 1) use latest state
• First update sees 0, returns 1
• Second update sees 1, returns 2
• Result is 2 (unlike batched object updates)`,
    },
    {
      id: 24,
      category: "async",
      level: "🧠 Level 1",
      difficulty: "Easy",
      question: "Simple Timeout Order",
      code: `console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);`,
      output: `1
3
2`,
      explanation: `• Sync 1 runs
• Timeout 2 scheduled (macrotask)
• Sync 3 runs
• Timeout 2 executes`,
    },
    {
      id: 25,
      category: "async",
      level: "🧠 Level 2",
      difficulty: "Medium",
      question: "Loop with let",
      code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
      output: `0
1
2`,
      explanation: `• let creates block scope per iteration
• Each callback captures its own 'i'
• Prints 0, 1, 2 correctly`,
    },
    {
      id: 26,
      category: "async",
      level: "🧠 Level 2",
      difficulty: "Medium",
      question: "Mixed Timeouts A-D",
      code: `console.log("A");
setTimeout(() => console.log("B"), 100);
setTimeout(() => console.log("C"), 0);
console.log("D");`,
      output: `A
D
C
B`,
      explanation: `• Sync A, D run first
• C (0ms) runs next
• B (100ms) runs last`,
    },
    {
      id: 27,
      category: "async",
      level: "🧠 Level 3",
      difficulty: "Hard",
      question: "Invalid clearInterval",
      code: `let i = 0;
setInterval(() => {
  console.log(i++);
  if (i === 3) clearInterval(this);
}, 0);`,
      output: `Runs infinite because 'this' is not interval id.`,
      explanation: `• Arrow function 'this' comes from outer scope
• clearInterval expects an ID, not 'this'
• Loop continues indefinitely`,
    },
    {
      id: 28,
      category: "async",
      level: "🧠 Level 5",
      difficulty: "Hard",
      question: "Nested Mixed Timeouts",
      code: `console.log(1);
setTimeout(() => {
  console.log(2);
  setTimeout(() => console.log(3), 0);
}, 0);
console.log(4);`,
      output: `1
4
2
3`,
      explanation: `• Sync 1, 4 run first
• Outer timeout runs -> prints 2
• Inner timeout scheduled
• Inner timeout runs -> prints 3`,
    },
    {
      id: 29,
      category: "async",
      level: "🧠 Level 4",
      difficulty: "Medium",
      question: "Variable Scope Timeout",
      code: `let x = 1;
setTimeout(() => {
  console.log(x);
}, 0);
x = 5;`,
      output: `5`,
      explanation: `• Timeout callback runs after main stack
• x is updated to 5 synchronously
• Callback sees current value of x (5)`,
    },
    {
      id: 30,
      category: "react",
      level: "⚛️ React",
      difficulty: "Hard",
      question: "useEffect + Sync + Async",
      code: `function App() {
  const [count, setCount] = React.useState(0);

  console.log("Render:", count);

  React.useEffect(() => {
    console.log("Effect Start:", count);

    setTimeout(() => {
      console.log("Timeout:", count);
      setCount(count + 1);
    }, 0);

    console.log("Effect End:", count);
  }, []);

  return null;
}`,
      output: `Render: 0
Effect Start: 0
Effect End: 0
Timeout: 0
Render: 1`,
      explanation: `• Render -> Effect Sync logs
• Timeout scheduled (closure count=0)
• Timeout runs -> logs 0 -> sets 1
• Re-render`,
    },
    {
      id: 31,
      category: "react",
      level: "⚛️ React",
      difficulty: "Expert",
      question: "Multiple Updates + Functional",
      code: `function App() {
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    console.log("Effect:", n);
    setN(n + 1);
    setN(n + 1);
    setN(v => v + 1);
  }, []);

  console.log("Render:", n);
  return null;
}`,
      output: `Render: 0
Effect: 0
Render: 2`,
      explanation: `• n=0 initially. setN(0+1) -> 1
• setN(0+1) -> 1 (stale n)
• setN(v => v + 1) -> 1+1 = 2
• Final state is 2`,
    },
    {
      id: 32,
      category: "react",
      level: "⚛️ React",
      difficulty: "Expert",
      question: "Timeout + Sync After",
      code: `function App() {
  const [x, setX] = React.useState(5);

  React.useEffect(() => {
    setTimeout(() => {
      console.log("Timeout:", x);
      setX(x + 5);
    }, 0);

    console.log("After Timeout Setup:", x);
  }, []);

  console.log("Render:", x);
  return null;
}`,
      output: `Render: 5
After Timeout Setup: 5
Timeout: 5
Render: 10`,
      explanation: `• Render 5
• Effect: Log "After...", Schedule Timeout
• Timeout: Log 5 (closure), Set 10
• Render 10`,
    },
    {
      id: 33,
      category: "react",
      level: "⚛️ React",
      difficulty: "Hard",
      question: "useEffect Dependency",
      code: `function App() {
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    console.log("Effect:", val);
    if (val < 2) {
      setTimeout(() => {
        setVal(val + 1);
      }, 0);
    }
  }, [val]);

  console.log("Render:", val);
  return null;
}`,
      output: `Render: 0
Effect: 0
Timeout: setVal(1)
Render: 1
Effect: 1
Timeout: setVal(2)
Render: 2
Effect: 2`,
      explanation: `• Runs on mount (0) -> sets 1
• Runs on update (1) -> sets 2
• Runs on update (2) -> condition fails, stops`,
    },
    // 1 Year Experience Questions
    {
      id: 34,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "Number + Number",
      code: `console.log(1 + 2);`,
      output: `3`,
      explanation: `number + number = numeric addition.`,
    },
    {
      id: 35,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String + Number",
      code: `console.log("1" + 2);`,
      output: `"12"`,
      explanation: `string + number = string concatenation.`,
    },
    {
      id: 36,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "Number + String",
      code: `console.log(1 + "2");`,
      output: `"12"`,
      explanation: `number converted to string.`,
    },
    {
      id: 37,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String + String",
      code: `console.log("1" + "2");`,
      output: `"12"`,
      explanation: `string concatenation.`,
    },
    {
      id: 38,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String - Number",
      code: `console.log("5" - 2);`,
      output: `3`,
      explanation: `- converts string to number.`,
    },
    {
      id: 39,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String * String",
      code: `console.log("5" * "2");`,
      output: `10`,
      explanation: `* converts both to numbers.`,
    },
    {
      id: 40,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String / String",
      code: `console.log("10" / "2");`,
      output: `5`,
      explanation: `/ converts both to numbers.`,
    },
    {
      id: 41,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Medium",
      question: "String + Number + Number",
      code: `console.log("5" + 2 + 3);`,
      output: `"523"`,
      explanation: `Left to right: "5"+2="52", "52"+3="523"`,
    },
    {
      id: 42,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Medium",
      question: "Number + Number + String",
      code: `console.log(5 + 2 + "3");`,
      output: `"73"`,
      explanation: `5+2=7, 7+"3"="73"`,
    },
    {
      id: 43,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String - String (Invalid)",
      code: `console.log("5" - "abc");`,
      output: `NaN`,
      explanation: `"abc" cannot be converted to number -> NaN`,
    },
    {
      id: 44,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "Number - String",
      code: `console.log(10 - "2");`,
      output: `8`,
      explanation: `"2" converts to 2.`,
    },
    {
      id: 45,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "Number + Boolean",
      code: `console.log(10 + true);`,
      output: `11`,
      explanation: `true → 1`,
    },
    {
      id: 46,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String + Boolean",
      code: `console.log("10" + true);`,
      output: `"10true"`,
      explanation: `Boolean converts to string "true"`,
    },
    {
      id: 47,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String - Boolean",
      code: `console.log("10" - true);`,
      output: `9`,
      explanation: `true → 1, "10" → 10`,
    },
    {
      id: 48,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "String Space + Number",
      code: `console.log(" " + 1);`,
      output: `" 1"`,
      explanation: `Space is just a character string.`,
    },
    {
      id: 49,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Medium",
      question: "String Space - Number",
      code: `console.log(" " - 1);`,
      output: `-1`,
      explanation: `Space string converts to 0.`,
    },
    {
      id: 50,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "null + Number",
      code: `console.log(null + 1);`,
      output: `1`,
      explanation: `null → 0`,
    },
    {
      id: 51,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Easy",
      question: "undefined + Number",
      code: `console.log(undefined + 1);`,
      output: `NaN`,
      explanation: `undefined → NaN`,
    },
    {
      id: 52,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Medium",
      question: "Array + Number",
      code: `console.log([] + 1);`,
      output: `"1"`,
      explanation: `[] → "" → "1"`,
    },
    {
      id: 53,
      category: "operators",
      level: "1 Year Exp",
      difficulty: "Medium",
      question: "Array - Number",
      code: `console.log([] - 1);`,
      output: `-1`,
      explanation: `[] → 0`,
    },
    // Difficult Operator Questions
    {
      id: 54,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Mixed String Math",
      code: `console.log("5" + 3 - 2);`,
      output: `51`,
      explanation: `"5"+3="53", "53"-2=51`,
    },
    {
      id: 55,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Mixed String Math 2",
      code: `console.log("5" - 3 + 2);`,
      output: `4`,
      explanation: `"5"-3=2, 2+2=4`,
    },
    {
      id: 56,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Mixed String Math 3",
      code: `console.log(1 + "2" - "1");`,
      output: `11`,
      explanation: `1+"2"="12", "12"-"1"=11`,
    },
    {
      id: 57,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "String + Mult",
      code: `console.log("10" + 2 * 3);`,
      output: `"106"`,
      explanation: `2*3=6, "10"+6="106"`,
    },
    {
      id: 58,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "String * Mult + String",
      code: `console.log("10" * 2 + "3");`,
      output: `"203"`,
      explanation: `"10"*2=20, 20+"3"="203"`,
    },
    {
      id: 59,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "String - String + String",
      code: `console.log("10" - "2" + "3");`,
      output: `"83"`,
      explanation: `"10"-"2"=8, 8+"3"="83"`,
    },
    {
      id: 60,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Number + Boolean + String",
      code: `console.log(5 + true + "2");`,
      output: `"62"`,
      explanation: `5+true=6, 6+"2"="62"`,
    },
    {
      id: 61,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "String + Boolean - Boolean",
      code: `console.log("5" + true - false);`,
      output: `NaN`,
      explanation: `"5"+true="5true", "5true"-false=NaN`,
    },
    {
      id: 62,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Space + Num + Num",
      code: `console.log(" " + 1 + 2);`,
      output: `" 12"`,
      explanation: `" "+1=" 1", " 1"+2=" 12"`,
    },
    {
      id: 63,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Space - Num + Num",
      code: `console.log(" " - 1 + 2);`,
      output: `1`,
      explanation: `" "→0, 0-1=-1, -1+2=1`,
    },
    {
      id: 64,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "null + String - Num",
      code: `console.log(null + "5" - 2);`,
      output: `NaN`,
      explanation: `null+"5"="null5", "null5"-2=NaN`,
    },
    {
      id: 65,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "undefined + String - Num",
      code: `console.log(undefined + "5" - 2);`,
      output: `NaN`,
      explanation: `undefined+"5"="undefined5" -> NaN`,
    },
    {
      id: 66,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "Array + Object - Num",
      code: `console.log([] + {} - 1);`,
      output: `NaN`,
      explanation: `[]+{} = "[object Object]", minus 1 → NaN`,
    },
    {
      id: 67,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "Object + Array + Num",
      code: `console.log({} + [] + 1);`,
      output: `" [object Object]1"`,
      explanation: `(Browser dependent execution context)`,
    },
    {
      id: 68,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Boolean + String - String",
      code: `console.log(true + "5" - "2");`,
      output: `13`,
      explanation: `true=1, 1+"5"="15", "15"-"2"=13`,
    },
    {
      id: 69,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Expert",
      question: "String + null - Boolean",
      code: `console.log("5" + null - true);`,
      output: `NaN`,
      explanation: `"5"+null="5null", "5null"-1=NaN`,
    },
    {
      id: 70,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Unary +",
      code: `console.log(+"5" + +"10" + "2");`,
      output: `"152"`,
      explanation: `+"5"=5, +"10"=10, 5+10=15, 15+"2"="152"`,
    },
    {
      id: 71,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "String * null + String",
      code: `console.log("5" * null + "2");`,
      output: `"02"`,
      explanation: `"5"*null = 0, 0+"2"="02"`,
    },
    {
      id: 72,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Array + null + Num",
      code: `console.log([] + null + 1);`,
      output: `"null1"`,
      explanation: `[]="", ""+null="null", "null"+1="null1"`,
    },
    {
      id: 73,
      category: "operators",
      level: "Senior Exp",
      difficulty: "Hard",
      question: "Array - null + String",
      code: `console.log([] - null + "1");`,
      output: `"01"`,
      explanation: `[]-null = 0, 0+"1"="01"`,
    },
    {
      id: 74,
      category: "async",
      level: "Async Q1",
      difficulty: "Medium",
      question: "Sync vs Microtask vs Macrotask",
      code: `console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");`,
      output: `A
D
C
B`,
      explanation: `Sync → Microtask (Promise) → Macrotask (setTimeout)`,
    },
    {
      id: 75,
      category: "async",
      level: "Async Q2",
      difficulty: "Medium",
      question: "Async/Await Execution Order",
      code: `async function test() {
  console.log(1);
  await Promise.resolve();
  console.log(2);
}
test();
console.log(3);`,
      output: `1
3
2`,
      explanation: `await pauses and continues in microtask queue.`,
    },
    {
      id: 76,
      category: "async",
      level: "Async Q3",
      difficulty: "Medium",
      question: "Multiple Timeouts & Promises",
      code: `setTimeout(() => console.log("T1"), 0);

setTimeout(() => console.log("T2"), 0);

Promise.resolve().then(() => console.log("P1"));
Promise.resolve().then(() => console.log("P2"));

console.log("S");`,
      output: `S
P1
P2
T1
T2`,
      explanation: `Synchronous -> Microtasks (P1, P2) -> Macrotasks (T1, T2)`,
    },
    {
      id: 77,
      category: "async",
      level: "Async Q4",
      difficulty: "Easy",
      question: "Async Function Return",
      code: `async function f() {
  return "Hello";
}
f().then(console.log);
console.log("World");`,
      output: `World
Hello`,
      explanation: `Async function returns a promise that resolves with the return value.`,
    },
    {
      id: 78,
      category: "async",
      level: "Async Q5",
      difficulty: "Medium",
      question: "Chained Promises vs Timeout",
      code: `console.log("start");

setTimeout(() => console.log("timeout"), 0);

Promise.resolve()
  .then(() => console.log("promise1"))
  .then(() => console.log("promise2"));

console.log("end");`,
      output: `start
end
promise1
promise2
timeout`,
      explanation: `Microtasks (promise1, promise2) run before Macrotask (timeout).`,
    },
    {
      id: 79,
      category: "async",
      level: "Async Q6",
      difficulty: "Hard",
      question: "Nested Async Calls",
      code: `async function a() {
  console.log("A1");
  await b();
  console.log("A2");
}

async function b() {
  console.log("B1");
}

a();
console.log("C");`,
      output: `A1
B1
C
A2`,
      explanation: `await b() executes b synchronously until first await (or return), then pauses a().`,
    },
    {
      id: 80,
      category: "async",
      level: "Async Q7",
      difficulty: "Easy",
      question: "Timeout Delays",
      code: `setTimeout(() => console.log("1"), 100);

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

console.log("4");`,
      output: `4
3
2
1`,
      explanation: `4 (Sync) -> 3 (Micro) -> 2 (Macro 0ms) -> 1 (Macro 100ms)`,
    },
    {
      id: 81,
      category: "async",
      level: "Async Q8",
      difficulty: "Medium",
      question: "Await Null",
      code: `async function x() {
  console.log("X1");
  await null;
  console.log("X2");
}
x();
console.log("X3");`,
      output: `X1
X3
X2`,
      explanation: `await null is treated like await Promise.resolve(null).`,
    },
    {
      id: 82,
      category: "async",
      level: "Async Q9",
      difficulty: "Hard",
      question: "Promise Returning Promise",
      code: `Promise.resolve()
  .then(() => {
    console.log("A");
    return Promise.resolve("B");
  })
  .then(console.log);

console.log("C");`,
      output: `C
A
B`,
      explanation: `Returning a promise unwraps it, adding another microtask tick.`,
    },
    {
      id: 83,
      category: "async",
      level: "Async Q10",
      difficulty: "Hard",
      question: "Microtask inside Macrotask",
      code: `setTimeout(() => {
  console.log("T");
  Promise.resolve().then(() => console.log("P inside T"));
}, 0);

Promise.resolve().then(() => console.log("P"));

console.log("S");`,
      output: `S
P
T
P inside T`,
      explanation: `P inside T runs immediately after T finishes, before any other macrotask.`,
    },
    {
      id: 84,
      category: "async",
      level: "Async Q11",
      difficulty: "Medium",
      question: "Async Function Mixed",
      code: `async function test() {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  await Promise.resolve();
  console.log("3");
}
test();
console.log("4");`,
      output: `1
4
3
2`,
      explanation: `1 (Sync) -> 4 (Sync) -> 3 (Micro) -> 2 (Macro)`,
    },
    {
      id: 85,
      category: "async",
      level: "Async Q12",
      difficulty: "Medium",
      question: "Promise Error Handling",
      code: `Promise.resolve()
  .then(() => {
    console.log("A");
    throw "Error";
  })
  .catch(() => console.log("B"))
  .then(() => console.log("C"));`,
      output: `A
B
C`,
      explanation: `Catch handles the error and returns a resolved promise, so C runs.`,
    },
    {
      id: 86,
      category: "async",
      level: "Async Q13",
      difficulty: "Medium",
      question: "Async Flow Control",
      code: `async function f1() {
  console.log("f1");
}
async function f2() {
  console.log("f2");
  await f1();
  console.log("after f1");
}
f2();
console.log("end");`,
      output: `f2
f1
end
after f1`,
      explanation: `f2 starts, calls f1 sync, awaits result. end runs sync. after f1 runs as microtask.`,
    },
    {
      id: 87,
      category: "async",
      level: "Async Q14",
      difficulty: "Hard",
      question: "queueMicrotask",
      code: `setTimeout(() => console.log("T1"), 0);

queueMicrotask(() => console.log("M1"));

Promise.resolve().then(() => console.log("P1"));

console.log("S1");`,
      output: `S1
M1
P1
T1`,
      explanation: `queueMicrotask adds to microtask queue same as Promise.then.`,
    },
    {
      id: 88,
      category: "async",
      level: "Async Q15",
      difficulty: "Hard",
      question: "Async/Await + Timeout",
      code: `async function run() {
  console.log("A");
  await Promise.resolve();
  setTimeout(() => console.log("B"), 0);
  console.log("C");
}
run();
console.log("D");`,
      output: `A
D
C
B`,
      explanation: `A (Sync) -> D (Sync) -> C (Micro) -> B (Macro)`,
    },
    {
      id: 89,
      category: "scope",
      level: "Scope Q1",
      difficulty: "Easy",
      question: "var Scope",
      code: `var a = 10;
if (true) {
  var a = 20;
}
console.log(a);`,
      output: `20`,
      explanation: `var is function-scoped, not block-scoped.`,
    },
    {
      id: 90,
      category: "scope",
      level: "Scope Q2",
      difficulty: "Easy",
      question: "let Scope",
      code: `let a = 10;
if (true) {
  let a = 20;
}
console.log(a);`,
      output: `10`,
      explanation: `let is block-scoped.`,
    },
    {
      id: 91,
      category: "scope",
      level: "Scope Q3",
      difficulty: "Easy",
      question: "const Scope",
      code: `const a = 10;
if (true) {
  const a = 20;
}
console.log(a);`,
      output: `10`,
      explanation: `const is also block-scoped.`,
    },
    {
      id: 92,
      category: "scope",
      level: "Scope Q4",
      difficulty: "Easy",
      question: "var Function Scope",
      code: `var x = 5;
function test() {
  var x = 10;
}
test();
console.log(x);`,
      output: `5`,
      explanation: `Function scope creates a new x.`,
    },
    {
      id: 93,
      category: "scope",
      level: "Scope Q5",
      difficulty: "Easy",
      question: "let Function Scope",
      code: `let x = 5;
function test() {
  let x = 10;
}
test();
console.log(x);`,
      output: `5`,
      explanation: `Inner x is block/function scoped.`,
    },
    {
      id: 94,
      category: "scope",
      level: "Scope Q6",
      difficulty: "Easy",
      question: "var in Loop",
      code: `for (var i = 0; i < 3; i++) {}
console.log(i);`,
      output: `3`,
      explanation: `var is not block-scoped.`,
    },
    {
      id: 95,
      category: "scope",
      level: "Scope Q7",
      difficulty: "Easy",
      question: "let in Loop",
      code: `for (let i = 0; i < 3; i++) {}
console.log(i);`,
      output: `ReferenceError`,
      explanation: `let is block-scoped.`,
    },
    {
      id: 96,
      category: "scope",
      level: "Scope Q8",
      difficulty: "Easy",
      question: "const Object Mutation",
      code: `const obj = { a: 1 };
obj.a = 2;
console.log(obj.a);`,
      output: `2`,
      explanation: `const means reference is fixed, not value.`,
    },
    {
      id: 97,
      category: "scope",
      level: "Scope Q9",
      difficulty: "Easy",
      question: "const Reassignment",
      code: `const x = 10;
x = 20;`,
      output: `TypeError: Assignment to constant variable`,
      explanation: `Cannot reassign constant variable.`,
    },
    {
      id: 98,
      category: "scope",
      level: "Scope Q10",
      difficulty: "Easy",
      question: "var Hoisting",
      code: `console.log(a);
var a = 10;`,
      output: `undefined`,
      explanation: `Hoisting with var.`,
    },
    {
      id: 99,
      category: "scope",
      level: "Scope Q11",
      difficulty: "Easy",
      question: "let TDZ",
      code: `console.log(a);
let a = 10;`,
      output: `ReferenceError`,
      explanation: `Temporal Dead Zone for let.`,
    },
    {
      id: 100,
      category: "scope",
      level: "Scope Q12",
      difficulty: "Medium",
      question: "Block Scope Mix",
      code: `{
  var a = 10;
  let b = 20;
}
console.log(a);
console.log(b);`,
      output: `10
ReferenceError`,
      explanation: `var leaks out of block, let does not.`,
    },
    {
      id: 101,
      category: "scope",
      level: "Scope Q13",
      difficulty: "Easy",
      question: "var Block Reassignment",
      code: `var x = 1;
{
  var x = 2;
}
console.log(x);`,
      output: `2`,
      explanation: `var ignores block scope.`,
    },
    {
      id: 102,
      category: "scope",
      level: "Scope Q14",
      difficulty: "Easy",
      question: "let Block Shadowing",
      code: `let x = 1;
{
  let x = 2;
}
console.log(x);`,
      output: `1`,
      explanation: `Inner let x shadows outer x within the block.`,
    },
    {
      id: 103,
      category: "scope",
      level: "Scope Q15",
      difficulty: "Easy",
      question: "const Array Mutation",
      code: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr);`,
      output: `[1, 2, 3, 4]`,
      explanation: `const array content can be modified.`,
    },
    {
      id: 104,
      category: "scope",
      level: "Scope Q16",
      difficulty: "Easy",
      question: "var Function Scope Error",
      code: `function test() {
  var a = 10;
}
console.log(a);`,
      output: `ReferenceError`,
      explanation: `var is function scoped.`,
    },
    {
      id: 105,
      category: "scope",
      level: "Scope Q17",
      difficulty: "Easy",
      question: "var if Scope",
      code: `if (true) {
  var a = 10;
}
console.log(a);`,
      output: `10`,
      explanation: `var is not block scoped.`,
    },
    {
      id: 106,
      category: "scope",
      level: "Scope Q18",
      difficulty: "Easy",
      question: "let if Scope",
      code: `if (true) {
  let a = 10;
}
console.log(a);`,
      output: `ReferenceError`,
      explanation: `let is block scoped.`,
    },
    {
      id: 107,
      category: "scope",
      level: "Scope Q19",
      difficulty: "Medium",
      question: "const Shadowing",
      code: `const x = 5;
{
  const x = 10;
  console.log(x);
}
console.log(x);`,
      output: `10
5`,
      explanation: `Inner const shadows outer const.`,
    },
    {
      id: 108,
      category: "scope",
      level: "Scope Q20",
      difficulty: "Medium",
      question: "Hoisting in Function",
      code: `var a = 1;
function test() {
  console.log(a);
  var a = 2;
}
test();`,
      output: `undefined`,
      explanation: `Hoisting inside function creates local undefined variable 'a'.`,
    },
    {
      id: 109,
      category: "scope",
      level: "Hard Q1",
      difficulty: "Hard",
      question: "IIFE var Hoisting",
      code: `var a = 1;
(function(){
  console.log(a);
  var a = 2;
})();`,
      output: `undefined`,
      explanation: `var a inside IIFE is hoisted to the top of IIFE function scope.`,
    },
    {
      id: 110,
      category: "scope",
      level: "Hard Q2",
      difficulty: "Hard",
      question: "IIFE let TDZ",
      code: `let a = 1;
(function(){
  console.log(a);
  let a = 2;
})();`,
      output: `ReferenceError`,
      explanation: `let a inside IIFE is hoisted but in TDZ.`,
    },
    {
      id: 111,
      category: "scope",
      level: "Hard Q3",
      difficulty: "Hard",
      question: "Nested Blocks var",
      code: `var a = 10;
{
  let a = 20;
  {
    var a = 30;
  }
}
console.log(a);`,
      output: `30`,
      explanation: `var a=30 is function/global scoped and overwrites var a=10.`,
    },
    {
      id: 112,
      category: "scope",
      level: "Hard Q4",
      difficulty: "Hard",
      question: "Nested Blocks const",
      code: `const a = 10;
{
  const a = 20;
  {
    const a = 30;
    console.log(a);
  }
}`,
      output: `30`,
      explanation: `Each const a is in its own block scope.`,
    },
    {
      id: 113,
      category: "scope",
      level: "Hard Q5",
      difficulty: "Hard",
      question: "var setTimeout Loop",
      code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
      output: `3
3
3`,
      explanation: `var i is shared across all iterations.`,
    },
    {
      id: 114,
      category: "scope",
      level: "Hard Q6",
      difficulty: "Hard",
      question: "let setTimeout Loop",
      code: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
      output: `0
1
2`,
      explanation: `let i creates a new binding for each iteration.`,
    },
    {
      id: 115,
      category: "scope",
      level: "Hard Q7",
      difficulty: "Hard",
      question: "const Block Scope",
      code: `const x = {};
{
  const x = 10;
}
console.log(x);`,
      output: `{}`,
      explanation: `Inner x is block scoped. Outer x is an object.`,
    },
    {
      id: 116,
      category: "scope",
      level: "Hard Q8",
      difficulty: "Hard",
      question: "var in if(false)",
      code: `var a = 5;
function test(){
  console.log(a);
  if(false){
    var a = 10;
  }
}
test();`,
      output: `undefined`,
      explanation: `var a is hoisted in function scope even if block is not executed.`,
    },
    {
      id: 117,
      category: "scope",
      level: "Hard Q9",
      difficulty: "Hard",
      question: "let in if(false)",
      code: `let x = 5;
function test(){
  console.log(x);
  if(false){
    let x = 10;
  }
}
test();`,
      output: `5`,
      explanation: `let x inside if is block scoped. console.log(x) sees outer x.`,
    },
    {
      id: 118,
      category: "scope",
      level: "Hard Q10",
      difficulty: "Hard",
      question: "Global Access",
      code: `var a = 1;
function test(){
  a = 2;
}
test();
console.log(a);`,
      output: `2`,
      explanation: `Function updates global variable a.`,
    },
    {
      id: 119,
      category: "scope",
      level: "Hard Q11",
      difficulty: "Hard",
      question: "Access Before Declaration",
      code: `function test(){
  console.log(a);
}
test();
var a = 10;`,
      output: `undefined`,
      explanation: `var a is hoisted globally. Function runs before assignment.`,
    },
    {
      id: 120,
      category: "scope",
      level: "Hard Q12",
      difficulty: "Hard",
      question: "let Access Before Declaration",
      code: `function test(){
  console.log(a);
  let a = 10;
}
test();`,
      output: `ReferenceError`,
      explanation: `let a is in TDZ within the function.`,
    },
    {
      id: 121,
      category: "scope",
      level: "Hard Q13",
      difficulty: "Hard",
      question: "Function in Block (var)",
      code: `var a = 1;
{
  function test(){
    console.log(a);
  }
}
test();`,
      output: `1`,
      explanation: `Function declaration in block hoisted to function/global scope.`,
    },
    {
      id: 122,
      category: "scope",
      level: "Hard Q14",
      difficulty: "Hard",
      question: "Function in Block (let)",
      code: `{
  let x = 10;
  function test(){
    console.log(x);
  }
}
test();`,
      output: `ReferenceError`,
      explanation: `Function in block with let variable. test is not accessible outside block.`,
    },
    {
      id: 123,
      category: "scope",
      level: "Hard Q15",
      difficulty: "Hard",
      question: "IIFE Parameter Shadowing",
      code: `var x = 1;
(function(x){
  console.log(x);
})(2);`,
      output: `2`,
      explanation: `Parameter x shadows global x.`,
    },
    {
      id: 124,
      category: "scope",
      level: "Hard Q16",
      difficulty: "Hard",
      question: "IIFE let Shadowing",
      code: `let x = 1;
(function(){
  console.log(x);
  let x = 2;
})();`,
      output: `ReferenceError`,
      explanation: `Inner let x is hoisted to top of function block (TDZ).`,
    },
    {
      id: 125,
      category: "scope",
      level: "Hard Q17",
      difficulty: "Hard",
      question: "const Block Access",
      code: `const a = 1;
{
  const b = a;
}
console.log(b);`,
      output: `ReferenceError`,
      explanation: `b is block scoped.`,
    },
    {
      id: 126,
      category: "scope",
      level: "Hard Q18",
      difficulty: "Hard",
      question: "var vs let Shadowing",
      code: `var a = 1;
if(true){
  let a = 2;
  console.log(a);
}
console.log(a);`,
      output: `2
1`,
      explanation: `let a inside block shadows var a outside.`,
    },
    {
      id: 127,
      category: "scope",
      level: "Hard Q19",
      difficulty: "Hard",
      question: "const Object Shadowing",
      code: `const obj = { a: 1 };
{
  const obj = { a: 2 };
}
console.log(obj.a);`,
      output: `1`,
      explanation: `Inner obj is block scoped.`,
    },
    {
      id: 128,
      category: "scope",
      level: "Hard Q20",
      difficulty: "Hard",
      question: "var in Function Block",
      code: `var a = 1;
function test(){
  if(true){
    var a = 2;
  }
  console.log(a);
}
test();`,
      output: `2`,
      explanation: `var a inside if block is function scoped (hoisted to test function top).`,
    },
    {
      id: 129,
      category: "scope",
      level: "Hard Q21",
      difficulty: "Hard",
      question: "let in Function Block",
      code: `let a = 1;
function test(){
  if(true){
    let a = 2;
  }
  console.log(a);
}
test();`,
      output: `1`,
      explanation: `let a inside if block is block scoped. console.log(a) refers to global let a.`,
    },
    {
      id: 130,
      category: "scope",
      level: "Hard Q22",
      difficulty: "Hard",
      question: "Nested const",
      code: `const x = 1;
{
  const x = 2;
  {
    console.log(x);
  }
}`,
      output: `2`,
      explanation: `Innermost block sees x=2 from immediate parent block.`,
    },
    {
      id: 131,
      category: "scope",
      level: "Hard Q23",
      difficulty: "Hard",
      question: "Nested var",
      code: `var a = 1;
{
  var b = 2;
  {
    var a = 3;
  }
}
console.log(a, b);`,
      output: `3 2`,
      explanation: `var a and b are function/global scoped.`,
    },
    {
      id: 132,
      category: "scope",
      level: "Hard Q24",
      difficulty: "Hard",
      question: "Nested let",
      code: `let a = 1;
{
  let b = 2;
  {
    let a = 3;
  }
}
console.log(a);`,
      output: `1`,
      explanation: `let a is block scoped. Outer a is not affected.`,
    },
    {
      id: 133,
      category: "scope",
      level: "Hard Q25",
      difficulty: "Hard",
      question: "Access var in Block",
      code: `console.log(a);
{
  var a = 10;
}`,
      output: `undefined`,
      explanation: `var a is hoisted.`,
    },
    {
      id: 134,
      category: "scope",
      level: "Hard Q26",
      difficulty: "Hard",
      question: "Access let in Block",
      code: `console.log(b);
{
  let b = 10;
}`,
      output: `ReferenceError`,
      explanation: `let b is block scoped and not hoisted to outer scope.`,
    },
    {
      id: 135,
      category: "scope",
      level: "Hard Q27",
      difficulty: "Hard",
      question: "Function Scope let",
      code: `function test(){
  console.log(a);
  if(true){
    let a = 10;
  }
}
test();`,
      output: `ReferenceError`,
      explanation: `a is not defined in function scope (let is block scoped).`,
    },
    {
      id: 136,
      category: "scope",
      level: "Hard Q28",
      difficulty: "Hard",
      question: "Function Scope var",
      code: `function test(){
  console.log(a);
  if(true){
    var a = 10;
  }
}
test();`,
      output: `undefined`,
      explanation: `var a is hoisted to function scope.`,
    },
    {
      id: 137,
      category: "scope",
      level: "Hard Q29",
      difficulty: "Hard",
      question: "var let Collision",
      code: `let a = 1;
{
  var a = 2;
}
console.log(a);`,
      output: `SyntaxError`,
      explanation: `Cannot declare var a in same scope where let a is defined.`,
    },
    {
      id: 138,
      category: "scope",
      level: "Hard Q30",
      difficulty: "Hard",
      question: "const var Collision",
      code: `const x = 10;
{
  var x = 20;
}
console.log(x);`,
      output: `SyntaxError`,
      explanation: `var x leaks out and collides with const x.`,
    },
  ];

  const filteredQuestions =
    activeCategory === "all"
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: "bg-green-100 text-green-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Hard: "bg-orange-100 text-orange-700",
      Expert: "bg-red-100 text-red-700",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-700";
  };

  const generatePDFContent = () => {
    let content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; background: #f5f5f5; }
    h1 { color: #8b5cf6; text-align: center; border-bottom: 3px solid #8b5cf6; padding-bottom: 20px; }
    .question { background: white; padding: 25px; margin: 30px 0; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); page-break-inside: avoid; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
    .level { color: #8b5cf6; font-weight: bold; font-size: 18px; }
    .difficulty { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .easy { background: #dcfce7; color: #166534; }
    .medium { background: #fef3c7; color: #92400e; }
    .hard { background: #fed7aa; color: #9a3412; }
    .expert { background: #fee2e2; color: #991b1b; }
    h3 { color: #1f2937; margin: 15px 0; font-size: 16px; }
    .code { background: #1e293b; color: #e2e8f0; padding: 20px; border-radius: 8px; overflow-x: auto; font-family: 'Courier New', monospace; margin: 15px 0; line-height: 1.6; }
    .output { background: #ecfdf5; color: #065f46; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 15px 0; font-family: 'Courier New', monospace; line-height: 1.6; }
    .explanation { background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0; line-height: 1.8; }
    .footer { text-align: center; margin-top: 50px; color: #6b7280; padding: 20px; }
    @media print {
      body { background: white; }
      .question { box-shadow: none; border: 1px solid #e5e7eb; }
    }
  </style>
</head>
<body>
  <h1>🔥 JavaScript Interview Questions - Complete Guide 🔥</h1>
  <p style="text-align: center; color: #6b7280; margin-bottom: 40px;">Master Async, Arrays, and React Concepts</p>
`;

    filteredQuestions.forEach((q, index) => {
      const diffClass = q.difficulty.toLowerCase();
      content += `
  <div class="question">
    <div class="header">
      <span class="level">Q${index + 1}: ${q.level}</span>
      <span class="difficulty ${diffClass}">${q.difficulty}</span>
    </div>
    <h3>📌 ${q.question}</h3>
    
    <h3>💻 Code:</h3>
    <pre class="code">${q.code
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>
    
    <h3>✅ Output:</h3>
    <pre class="output">${q.output
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre>
    
    <h3>🧠 Explanation:</h3>
    <div class="explanation">${q.explanation.replace(/\n/g, "<br>")}</div>
  </div>
`;
    });

    content += `
  <div class="footer">
    <p><strong>📚 Total Questions: ${filteredQuestions.length}</strong></p>
    <p>Generated on ${new Date().toLocaleDateString()}</p>
    <p style="margin-top: 10px;">⭐ Keep practicing and ace your interviews! ⭐</p>
  </div>
</body>
</html>
`;
    return content;
  };

  const downloadPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `js-interview-questions-${activeCategory}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const previewPDF = () => {
    const content = generatePDFContent();
    const newWindow = window.open("", "_blank");
    newWindow.document.write(content);
    newWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-8 shadow-xl">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-2">
            🔥 JavaScript Interview Hub
          </h1>
          <p className="text-center text-purple-100 text-lg">
            Master Async, Arrays & React Concepts
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {(showAllCategories ? categories : categories.slice(0, 5)).map(
            (cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                    activeCategory === cat.id
                      ? `${cat.color} text-white shadow-lg`
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} />
                  {cat.name}
                </button>
              );
            }
          )}
          {categories.length > 5 && (
            <button
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="px-6 py-3 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              {showAllCategories ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Download size={24} />
            Download PDF ({filteredQuestions.length} Questions)
          </button>
          <button
            onClick={previewPDF}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            <Eye size={24} />
            Preview PDF
          </button>
        </div>

        {/* Questions Count */}
        <div className="text-center mb-6">
          <span className="bg-white px-6 py-2 rounded-full shadow-md text-gray-700 font-semibold">
            Showing {filteredQuestions.length} Questions
          </span>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() =>
                  setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-600 font-bold text-lg">
                        Q{index + 1}
                      </span>
                      <span className="text-gray-500 font-semibold">
                        {q.level}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(
                          q.difficulty
                        )}`}
                      >
                        {q.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {q.question}
                    </h3>
                  </div>
                  <button className="text-purple-600 p-2">
                    {expandedQuestion === q.id ? (
                      <ChevronUp size={24} />
                    ) : (
                      <ChevronDown size={24} />
                    )}
                  </button>
                </div>

                {expandedQuestion === q.id && (
                  <div className="space-y-4 mt-6">
                    <div>
                      <h4 className="text-sm font-bold text-gray-600 mb-2">
                        💻 CODE:
                      </h4>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-xl overflow-x-auto text-sm">
                        {q.code}
                      </pre>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-600 mb-2">
                        ✅ OUTPUT:
                      </h4>
                      <pre className="bg-green-50 text-green-800 p-4 rounded-xl border-l-4 border-green-500 text-sm">
                        {q.output}
                      </pre>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-600 mb-2">
                        🧠 EXPLANATION:
                      </h4>
                      <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
                        <pre className="text-blue-900 whitespace-pre-wrap text-sm font-sans leading-relaxed">
                          {q.explanation}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rules Box */}
        <div className="mt-12 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            🔥 Golden Interview Rules
          </h2>
          <div className="bg-white bg-opacity-90 p-6 rounded-xl">
            <h3 className="font-bold text-gray-800 mb-3">
              Async Execution Order:
            </h3>
            <p className="text-gray-700 mb-4">
              Call Stack (Sync) → Microtask Queue (Promise) → Macrotask Queue
              (setTimeout)
            </p>

            <h3 className="font-bold text-gray-800 mb-3">Array Methods:</h3>
            <p className="text-gray-700">
              map returns array • forEach returns undefined • splice mutates •
              slice doesn't • sort is string-based by default
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-lg">
            ⭐ Keep practicing and ace your interviews! ⭐
          </p>
          <p className="text-gray-400 mt-2">
            Generated with ❤️ for aspiring developers
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
