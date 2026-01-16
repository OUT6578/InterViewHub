import  { useState } from "react";
import {
  Download,
  Eye,
  Code,
  Zap,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";
const App = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    {
      id: "all",
      name: "All Questions",
      icon: BookOpen,
      color: "bg-purple-500",
      subCategories: [],
    },
      {
      id: "quickRevsion",
      name: "Quick Revision",
      icon: BookOpen,
      color: "bg-gray-500",
      subCategories: [],
    },
    {
      id: "async",
      name: "Async & Event Loop",
      icon: Zap,
      color: "bg-blue-500",
      subCategories: ["setTimeout", "Promises", "async/await", "Microtasks"],
    },
    {
      id: "array",
      name: "Array Methods",
      icon: Code,
      color: "bg-green-500",
      subCategories: [
        "map/forEach",
        "filter/reduce",
        "slice/splice",
        "sort/search",
      ],
    },
    {
      id: "react",
      name: "React Hooks Practical",
      icon: Code,
      color: "bg-cyan-500",
      subCategories: ["useState", "useEffect", "useMemo", "useCallback"],
    },
    {
      id: "reacttheory",
      name: "React Hooks Theory",
      icon: BookOpen,
      color: "bg-indigo-500",
      subCategories: [
        "Performance",
        "Real World",
        "Interview Qs",
        "Best Practices",
      ],
    },
    {
      id: "operators",
      name: "Operators & Coercion",
      icon: Code,
      color: "bg-orange-500",
      subCategories: ["Type Coercion", "String Operations", "Math Operators"],
    },
    {
      id: "scope",
      name: "Var, Let, Const & Scope",
      icon: Code,
      color: "bg-pink-500",
      subCategories: ["Hoisting", "TDZ", "Block Scope", "Closures"],
    },
    {
      id: "reactfundamentals",
      name: "React Fundamentals",
      icon: BookOpen,
      color: "bg-red-500",
      subCategories: [
        "Webpack",
        "Props",
        "State",
        "Vite",
        "Redux",
        "Hooks",
        "Virtual DOM",
        "JSX",
        "Components",
        "Fragment",
        "Strict Mode",
      ],
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
      category: "operators",
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
  if (i === 3) {
    clearInterval(this);
  }
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
    {
      id: 139,
      category: "operators",
      level: "🧠 Q1",
      difficulty: "Easy",
      question: "Number + String Chain",
      code: `console.log(12 + "23" + 34);`,
      output: `"122334"`,
      explanation: `12 + "23" → "1223" (string), then +"34" → "122334"`,
    },
    {
      id: 140,
      category: "operators",
      level: "🧠 Q2",
      difficulty: "Easy",
      question: "String + Number Chain",
      code: `console.log("12" + 23 + 34);`,
      output: `"122334"`,
      explanation: `Starts with string → all concatenation`,
    },
    {
      id: 141,
      category: "operators",
      level: "🧠 Q3",
      difficulty: "Easy",
      question: "Numbers then String",
      code: `console.log(12 + 23 + "34");`,
      output: `"3534"`,
      explanation: `12+23=35, then "35"+"34"`,
    },
    {
      id: 142,
      category: "operators",
      level: "🧠 Q4",
      difficulty: "Medium",
      question: "Mixed Chain",
      code: `console.log(12 + "23" + 34 + 5);`,
      output: `"122345"`,
      explanation: `Once string starts, all after concat`,
    },
    {
      id: 143,
      category: "operators",
      level: "🧠 Q5",
      difficulty: "Medium",
      question: "Brackets First",
      code: `console.log(12 + ("23" + 34));`,
      output: `"122334"`,
      explanation: `Brackets first: "23"+34="2334", then 12+"2334"`,
    },
    {
      id: 144,
      category: "operators",
      level: "🧠 Q6",
      difficulty: "Medium",
      question: "Brackets with Addition",
      code: `console.log((12 + "23") + 34);`,
      output: `"122334"`,
      explanation: `12+"23"="1223", then "1223"+34`,
    },
    {
      id: 145,
      category: "operators",
      level: "🧠 Q7",
      difficulty: "Medium",
      question: "String with Number Brackets",
      code: `console.log("12" + (23 + 34));`,
      output: `"1257"`,
      explanation: `Brackets: 23+34=57, then "12"+"57"`,
    },
    {
      id: 146,
      category: "operators",
      level: "🧠 Q8",
      difficulty: "Hard",
      question: "String Literal in Middle",
      code: `console.log(12 + "23+34" + 64);`,
      output: `"1223+3464"`,
      explanation: `"23+34" is string literal, not math`,
    },
    {
      id: 147,
      category: "operators",
      level: "🧠 Q9",
      difficulty: "Medium",
      question: "Unary Plus in Chain",
      code: `console.log(12 + +"23" + 34);`,
      output: `69`,
      explanation: `+"23" → 23, so 12+23+34`,
    },
    {
      id: 148,
      category: "operators",
      level: "🧠 Q10",
      difficulty: "Medium",
      question: "Unary Minus in Chain",
      code: `console.log(12 + -"23" + 34);`,
      output: `23`,
      explanation: `-"23" → -23, so 12-23+34`,
    },
    {
      id: 149,
      category: "operators",
      level: "🧠 Q11",
      difficulty: "Hard",
      question: "String to Number Subtraction",
      code: `console.log(12 + "23" - 5);`,
      output: `1218`,
      explanation: `12+"23"="1223", then "1223"-5 → number`,
    },
    {
      id: 150,
      category: "operators",
      level: "🧠 Q12",
      difficulty: "Medium",
      question: "String Minus Addition",
      code: `console.log("12" - 2 + 3);`,
      output: `13`,
      explanation: `"12"-2=10, then 10+3`,
    },
    {
      id: 151,
      category: "operators",
      level: "Hard",
      question: "String Plus Minus",
      code: `console.log("12" + 2 - 3);`,
      output: `119`,
      explanation: `"12"+2="122", then "122"-3=119`,
    },
    {
      id: 152,
      category: "operators",
      level: "Medium",
      question: "Boolean in Chain",
      code: `console.log(12 + true + "3");`,
      output: `"133"`,
      explanation: `true →1, 12+1=13, then "13"+"3"`,
    },
    {
      id: 153,
      category: "operators",
      level: "Medium",
      question: "False in Chain",
      code: `console.log(12 + false + "3");`,
      output: `"123"`,
      explanation: `false →0, 12+0=12, then "12"+"3"`,
    },
    {
      id: 154,
      category: "operators",
      level: "Hard",
      question: "String with Boolean",
      code: `console.log("12" + true + 3);`,
      output: `"12true3"`,
      explanation: `string starts → concat only`,
    },
    {
      id: 155,
      category: "operators",
      level: "Medium",
      question: "Null in Chain",
      code: `console.log(12 + null + "3");`,
      output: `"123"`,
      explanation: `null →0, 12+0=12, then "12"+"3"`,
    },
    {
      id: 156,
      category: "operators",
      level: "Hard",
      question: "Undefined in Chain",
      code: `console.log(12 + undefined + "3");`,
      output: `"NaN3"`,
      explanation: `12+undefined = NaN, then "NaN"+"3"`,
    },
    {
      id: 157,
      category: "operators",
      level: "Hard",
      question: "String with Null",
      code: `console.log("12" + null + 3);`,
      output: `"12null3"`,
      explanation: `string starts → all concatenation`,
    },
    {
      id: 158,
      category: "operators",
      level: "🧠 Q21",
      difficulty: "Easy",
      question: "Simple String Concat",
      code: `console.log(5 + "5" + 5);`,
      output: `"555"`,
      explanation: `5+"5" → "55", then +"5" → "555"`,
    },
    {
      id: 159,
      category: "operators",
      level: "🧠 Q22",
      difficulty: "Easy",
      question: "Numbers then String",
      code: `console.log(5 + 5 + "5");`,
      output: `"105"`,
      explanation: `5+5=10, then "10"+"5"`,
    },
    {
      id: 160,
      category: "operators",
      level: "🧠 Q23",
      difficulty: "Easy",
      question: "String then Numbers",
      code: `console.log("5" + 5 + 5);`,
      output: `"555"`,
      explanation: `Starts with string → all concat`,
    },
    {
      id: 161,
      category: "operators",
      level: "🧠 Q24",
      difficulty: "Medium",
      question: "Nested Brackets 1",
      code: `console.log(5 + ("5" + 5));`,
      output: `"555"`,
      explanation: `Brackets first: "5"+5="55", then 5+"55"`,
    },
    {
      id: 162,
      category: "operators",
      level: "🧠 Q25",
      difficulty: "Medium",
      question: "Nested Brackets 2",
      code: `console.log((5 + "5") + 5);`,
      output: `"555"`,
      explanation: `5+"5"="55", then "55"+5`,
    },
    {
      id: 163,
      category: "operators",
      level: "🧠 Q26",
      difficulty: "Medium",
      question: "Addition in Brackets",
      code: `console.log("5" + (5 + 5));`,
      output: `"510"`,
      explanation: `Brackets: 5+5=10, then "5"+"10"`,
    },
    {
      id: 164,
      category: "operators",
      level: "🧠 Q27",
      difficulty: "Medium",
      question: "Unary Plus",
      code: `console.log(5 + +"5" + 5);`,
      output: `15`,
      explanation: `+"5" →5, so 5+5+5`,
    },
    {
      id: 165,
      category: "operators",
      level: "🧠 Q28",
      difficulty: "Medium",
      question: "Unary Minus",
      code: `console.log(5 + -"5" + 5);`,
      output: `5`,
      explanation: `-"5" → -5, so 5-5+5`,
    },
    {
      id: 166,
      category: "operators",
      level: "🧠 Q29",
      difficulty: "Medium",
      question: "String Minus",
      code: `console.log("5" - 2 + 3);`,
      output: `6`,
      explanation: `"5"-2=3, then 3+3`,
    },
    {
      id: 167,
      category: "operators",
      level: "Hard",
      question: "String Plus Minus Complex",
      code: `console.log("5" + 2 - 3);`,
      output: `49`,
      explanation: `"5"+2="52", then 52-3`,
    },
    {
      id: 168,
      category: "operators",
      level: "Medium",
      question: "Boolean in Mixed Chain",
      code: `console.log(5 + true + "5");`,
      output: `"115"`,
      explanation: `true→1, 5+1=6, "6"+"5"`,
    },
    {
      id: 169,
      category: "operators",
      level: "Medium",
      question: "False in Mixed Chain",
      code: `console.log(5 + false + "5");`,
      output: `"55"`,
      explanation: `false→0, 5+0=5, "5"+"5"`,
    },
    {
      id: 170,
      category: "operators",
      level: "Hard",
      question: "String Boolean Chain",
      code: `console.log("5" + true + 5);`,
      output: `"5true5"`,
      explanation: `string starts → all concatenation`,
    },
    {
      id: 171,
      category: "operators",
      level: "Medium",
      question: "Null in Mixed",
      code: `console.log(5 + null + "5");`,
      output: `"55"`,
      explanation: `null→0, 5+0=5, "5"+"5"`,
    },
    {
      id: 172,
      category: "operators",
      level: "Hard",
      question: "Undefined in Mixed",
      code: `console.log(5 + undefined + "5");`,
      output: `"NaN5"`,
      explanation: `5+undefined=NaN, "NaN"+"5"`,
    },
    {
      id: 173,
      category: "operators",
      level: "Hard",
      question: "String with Null",
      code: `console.log("5" + null + 5);`,
      output: `"5null5"`,
      explanation: `string starts → all concatenation`,
    },
    {
      id: 174,
      category: "operators",
      level: "Hard",
      question: "String with Undefined",
      code: `console.log("5" + undefined + 5);`,
      output: `"5undefined5"`,
      explanation: `string starts → all concatenation`,
    },
    {
      id: 175,
      category: "operators",
      level: "Hard",
      question: "Complex Chain 1",
      code: `console.log(5 + "5" - 2);`,
      output: `53`,
      explanation: `5+"5"="55", then 55-2`,
    },
    {
      id: 176,
      category: "operators",
      level: "Hard",
      question: "Complex Chain 2",
      code: `console.log("5" + 5 - "2");`,
      output: `53`,
      explanation: `"5"+5="55", then 55-"2"`,
    },
    {
      id: 177,
      category: "operators",
      level: "Expert",
      question: "Complex Chain 3",
      code: `console.log(5 + "5" + +"5");`,
      output: `"555"`,
      explanation: `+"5" →5 but string already started and all concatenation`,
    },
    {
      id: 178,
      category: "array",
      level: "Array Q1",
      difficulty: "Easy",
      question: "Sum of Numbers Array",
      code: `const arr = [1, 2, 3, 4];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `10`,
      explanation: `Simple sum of numbers`,
    },
    {
      id: 179,
      category: "array",
      level: "Array Q2",
      difficulty: "Easy",
      question: "Sum of String Numbers",
      code: `const arr = ["1", "2", "3"];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"0123"`,
      explanation: `string concatenation (0 + "1" = "01", etc)`,
    },
    {
      id: 180,
      category: "array",
      level: "Array Q3",
      difficulty: "Easy",
      question: "Sum with Number Conversion",
      code: `const arr = ["1", "2", "3"];
let sum = 0;
for (let i of arr) sum += Number(i);
console.log(sum);`,
      output: `6`,
      explanation: `Convert strings to numbers before adding`,
    },
    {
      id: 181,
      category: "array",
      level: "Array Q4",
      difficulty: "Medium",
      question: "Mixed Array Sum",
      code: `const arr = [1, "2", 3];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"123"`,
      explanation: `1 + "2" = "12", "12" + 3 = "123"`,
    },
    {
      id: 182,
      category: "array",
      level: "Array Q5",
      difficulty: "Medium",
      question: "String Concatenation Array",
      code: `const arr = [1, "2", "3"];
let sum = "";
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"123"`,
      explanation: `All values concatenated as strings`,
    },
    {
      id: 183,
      category: "array",
      level: "Array Q6",
      difficulty: "Medium",
      question: "Mixed with Addition",
      code: `const arr = [1, "2", "3"];
let sum = 0;
for (let i of arr) sum = sum + i;
console.log(sum);`,
      output: `"123"`,
      explanation: `0 + 1 = 1, 1 + "2" = "12", "12" + "3" = "123"`,
    },
    {
      id: 184,
      category: "array",
      level: "Array Q7",
      difficulty: "Hard",
      question: "forEach with Mixed",
      code: `const arr = [10, "20", 30];
let sum = 0;
arr.forEach(v => sum += v);
console.log(sum);`,
      output: `"102030"`,
      explanation: `string concatenation in forEach`,
    },
    {
      id: 185,
      category: "array",
      level: "Array Q8",
      difficulty: "Medium",
      question: "forEach with Number Conversion",
      code: `const arr = [10, "20", 30];
let sum = 0;
arr.forEach(v => sum += Number(v));
console.log(sum);`,
      output: `60`,
      explanation: `Convert strings to numbers in forEach`,
    },
    {
      id: 186,
      category: "array",
      level: "Array Q9",
      difficulty: "Hard",
      question: "Array with Non-numeric String",
      code: `const arr = ["a", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"0a12"`,
      explanation: `0 + "a" = "0a", "0a" + 1 = "0a1", "0a1" + 2 = "0a12"`,
    },
    {
      id: 187,
      category: "array",
      level: "Array Q10",
      difficulty: "Hard",
      question: "Mixed String Numbers",
      code: `const arr = ["5", 5, "5"];
let sum = 0;
for (let v of arr) sum = sum + v;
console.log(sum);`,
      output: `"0555"`,
      explanation: `0 + "5" = "05", "05" + 5 = "055", "055" + "5" = "0555"`,
    },
    {
      id: 188,
      category: "array",
      level: "Array Q11",
      difficulty: "Medium",
      question: "reduce with Strings",
      code: `const arr = ["10", "20", 30];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"102030"`,
      explanation: `reduce concatenates as strings`,
    },
    {
      id: 189,
      category: "array",
      level: "Array Q12",
      difficulty: "Medium",
      question: "reduce with Number Conversion",
      code: `const arr = ["10", "20", 30];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `60`,
      explanation: `Convert to numbers before adding in reduce`,
    },
    {
      id: 190,
      category: "array",
      level: "Array Q13",
      difficulty: "Hard",
      question: "reduce Mixed Types",
      code: `const arr = [1, 2, "3"];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"33"`,
      explanation: `1+2=3, 3+"3"="33"`,
    },
    {
      id: 191,
      category: "array",
      level: "Array Q14",
      difficulty: "Medium",
      question: "reduce Mixed with Conversion",
      code: `const arr = [1, 2, "3"];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `6`,
      explanation: `Convert all to numbers before adding`,
    },
    {
      id: 192,
      category: "array",
      level: "Array Q15",
      difficulty: "Hard",
      question: "Non-numeric in Loop",
      code: `const arr = [1, "a", 2];
let sum = 0;
for (let v of arr) sum += Number(v);
console.log(sum);`,
      output: `NaN`,
      explanation: `Number("a") = NaN, any operation with NaN = NaN`,
    },
    {
      id: 193,
      category: "array",
      level: "Array Q16",
      difficulty: "Easy",
      question: "String Concatenation Only",
      code: `const arr = ["1", "a", "2"];
let sum = "";
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"1a2"`,
      explanation: `Simple string concatenation`,
    },
    {
      id: 194,
      category: "array",
      level: "Array Q17",
      difficulty: "Hard",
      question: "Mixed with Non-numeric",
      code: `const arr = ["1", "a", "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01a2"`,
      explanation: `0 + "1" = "01", "01" + "a" = "01a", "01a" + "2" = "01a2"`,
    },
    {
      id: 195,
      category: "array",
      level: "Array Q18",
      difficulty: "Medium",
      question: "Boolean in Array",
      code: `const arr = [true, 1, "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"12"`,
      explanation: `true → 1, 1+1=2, 2+"2"="22"`,
    },
    {
      id: 196,
      category: "array",
      level: "Array Q19",
      difficulty: "Medium",
      question: "False in Array",
      code: `const arr = [false, "1", 1];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01"`,
      explanation: `false → 0, 0+"1"="01", "01"+1="011"`,
    },
    {
      id: 197,
      category: "array",
      level: "Array Q20",
      difficulty: "Medium",
      question: "Null in Array",
      code: `const arr = [null, "1", 1];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01"`,
      explanation: `null → 0, 0+"1"="01", "01"+1="011"`,
    },
    {
      id: 198,
      category: "array",
      level: "Array Q21",
      difficulty: "Hard",
      question: "Undefined in Array",
      code: `const arr = [undefined, 1, "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `NaN`,
      explanation: `undefined + 1 = NaN, NaN + "2" = "NaN2"`,
    },
    {
      id: 199,
      category: "array",
      level: "Array Q22",
      difficulty: "Medium",
      question: "Empty String in Array",
      code: `const arr = ["", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"012"`,
      explanation: `"" + 1 = "1", "1" + 2 = "12"`,
    },
    {
      id: 200,
      category: "array",
      level: "Array Q23",
      difficulty: "Medium",
      question: "Space String in Array",
      code: `const arr = [" ", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"0 12"`,
      explanation: `" " + 1 = " 1", " 1" + 2 = " 12"`,
    },
    {
      id: 201,
      category: "array",
      level: "Array Q24",
      difficulty: "Hard",
      question: "CSS Value in Array",
      code: `const arr = ["10px", 20];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"010px20"`,
      explanation: `0 + "10px" = "010px", "010px" + 20 = "010px20"`,
    },
    {
      id: 202,
      category: "array",
      level: "Array Q25",
      difficulty: "Medium",
      question: "parseInt in Loop",
      code: `const arr = ["10px", 20];
let sum = 0;
for (let v of arr) sum += parseInt(v);
console.log(sum);`,
      output: `30`,
      explanation: `parseInt("10px") = 10, 10 + 20 = 30`,
    },
    {
      id: 203,
      category: "array",
      level: "Array Q26",
      difficulty: "Medium",
      question: "Decimal Strings",
      code: `const arr = ["10.5", 1.5];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"10.51.5"`,
      explanation: `String concatenation`,
    },
    {
      id: 204,
      category: "array",
      level: "Array Q27",
      difficulty: "Medium",
      question: "Decimal with Number Conversion",
      code: `const arr = ["10.5", 1.5];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `12`,
      explanation: `10.5 + 1.5 = 12`,
    },
    {
      id: 205,
      category: "array",
      level: "Array Q28",
      difficulty: "Hard",
      question: "Complex Mixed Array",
      code: `const arr = [1, "2", true, "3"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"12true3"`,
      explanation: `1 + "2" = "12", "12" + true = "12true", "12true" + "3" = "12true3"`,
    },
    {
      id: 206,
      category: "array",
      level: "Array Q29",
      difficulty: "Hard",
      question: "Complex Mixed with Conversion",
      code: `const arr = [1, "2", true, "3"];
let sum = 0;
for (let v of arr) sum += Number(v);
console.log(sum);`,
      output: `NaN`,
      explanation: `Number(true) = 1, but Number("true") in string context = NaN`,
    },
    {
      id: 207,
      category: "array",
      level: "Array Q30",
      difficulty: "Medium",
      question: "Null in reduce",
      code: `const arr = ["5", 5, null];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"55null"`,
      explanation: `"5"+5="55", "55"+null="55null"`,
    },
    // React Theory Questions
    {
      id: 208,
      category: "reacttheory",
      level: "⚛️ React Theory 1",
      difficulty: "Medium",
      question: "useMemo vs useCallback - Hotel Booking Example",
      code: `// Hotel Stay Booking – Price Calculation
// Socho tum ek Hotel Booking App bana rahe ho:
// 1. User nights select karta hai
// 2. Rooms select karta hai
// 3. Luxury option on/off karta hai
// 4. Total price calculate hota hai
// 5. Button click se booking hoti hai

// Agar har render pe heavy calculation chale → app slow ho jaata.
// Yahin useMemo aur useCallback ka use hota hai.

import React, { useState, useMemo, useCallback } from "react";

// Child Component
function BookButton({ onBook }) {
  console.log("BookButton re-rendered");
  return <button onClick={onBook}>Book Now</button>;
}

function HotelBooking() {
  const [nights, setNights] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [luxury, setLuxury] = useState(false);
  const [count, setCount] = useState(0); // unrelated state

  const roomPrice = 2000;
  const luxuryCharge = 3000;

  // useMemo: Sirf tab calculate hoga jab dependency change hogi
  const totalPrice = useMemo(() => {
    console.log("Calculating total price...");
    let base = nights * rooms * roomPrice;
    if (luxury) base += luxuryCharge;
    return base;
  }, [nights, rooms, luxury]);

  // useCallback: Function ko memory me save karna
  const bookHotel = useCallback(() => {
    alert(\`Hotel booked for ₹\${totalPrice}\`);
  }, [totalPrice]);

  return (
    <div>
      <h2>Hotel Stay Booking</h2>
      
      <p>Nights: {nights}</p>
      <button onClick={() => setNights(nights + 1)}>Add Night</button>
      
      <p>Rooms: {rooms}</p>
      <button onClick={() => setRooms(rooms + 1)}>Add Room</button>
      
      <p>Luxury:
        <input
          type="checkbox"
          checked={luxury}
          onChange={() => setLuxury(!luxury)}
        />
      </p>
      
      <h3>Total Price: ₹{totalPrice}</h3>
      
      <BookButton onBook={bookHotel} />
      
      {/* Ye button price se related nahi */}
      <button onClick={() => setCount(count + 1)}>
        Random Click: {count}
      </button>
    </div>
  );
}

export default HotelBooking;`,
      output: `• Jab sirf count button click hoga → totalPrice dubara calculate nahi hoga
• BookButton component unnecessary re-render nahi hoga
• App performance improve hoga`,
      explanation: `useMemo Ka Fayda:
• Heavy calculation ko cache karta hai
• Jab sirf count badhe → total price dubara calculate nahi hoga
• Sirf tab chalega jab: nights, rooms, ya luxury change hoga

useCallback Ka Fayda:
• Function reference ko stable rakhta hai
• BookButton component ko unnecessary re-render se bachata hai
• Function sirf tab change hoga jab totalPrice change hoga

Interview Line (Hinglish):
• useMemo → "Bhai calculation ko yaad rakh, jab tak dependency change na ho"
• useCallback → "Function ko naya mat bana, same reference reuse kar"

Use when:
• Heavy calculation ho (useMemo)
• Child component unnecessary re-render ho raha ho (useCallback)
• Prop drilling me functions pass kar rahe ho
• Event handlers ko optimize karna ho`,
    },
    {
      id: 209,
      category: "reacttheory",
      level: "⚛️ React Theory 2",
      difficulty: "Medium",
      question: "useMemo vs useCallback - Syntax Difference",
      code: `// useMemo Syntax - Returns a VALUE
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback Syntax - Returns a FUNCTION
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Practical Example
const expensiveCalculation = useMemo(() => {
  console.log('Calculating...');
  return users.filter(u => u.active).map(u => u.salary).reduce((a, b) => a + b, 0);
}, [users]);

const handleClick = useCallback(() => {
  console.log('Button clicked for user:', currentUser);
}, [currentUser]);`,
      output: `useMemo → Returns cached VALUE
useCallback → Returns cached FUNCTION REFERENCE`,
      explanation: `Key Differences:
1. Return Type:
   • useMemo → returns the RESULT of the function
   • useCallback → returns the FUNCTION ITSELF

2. Use Case:
   • useMemo → Heavy computations, derived values
   • useCallback → Event handlers, prop functions

3. Memory:
   • Both cache their dependencies
   • Both prevent unnecessary re-renders

Example Scenarios:
• useMemo → Filtering large lists, expensive calculations
• useCallback → Passing callbacks to optimized child components

Golden Rule:
• Jab bhi aapko function return karna ho → useCallback
• Jab bhi aapko value return karni ho → useMemo`,
    },
    {
      id: 210,
      category: "reacttheory",
      level: "⚛️ React Theory 3",
      difficulty: "Hard",
      question: "When NOT to use useMemo/useCallback",
      code: `// ❌ BAD - Unnecessary optimization
const userCount = useMemo(() => {
  return users.length;
}, [users]);

const handleClick = useCallback(() => {
  console.log('Clicked');
}, []);

// ✅ GOOD - Simple calculations don't need memoization
const userCount = users.length;

const handleClick = () => {
  console.log('Clicked');
};

// ❌ BAD - Empty dependency array with changing values
const data = useMemo(() => fetchData(), []); // Stale data

// ✅ GOOD
const data = useMemo(() => fetchData(id), [id]);`,
      output: `Performance optimization should be measured, not assumed`,
      explanation: `Avoid Premature Optimization:
1. Simple calculations → No need for useMemo
   • users.length
   • a + b
   • !loading

2. Component is not re-rendering frequently → No need

3. When dependencies change on every render → useMemo useless

4. Small components → Optimization overhead > benefit

When to Actually Use:
1. Large array operations (filter, map, reduce)
2. Expensive mathematical calculations
3. Creating objects/arrays in render (prevent child re-renders)
4. Functions passed to memoized child components

Performance Measurement:
• Always measure with React DevTools Profiler
• Optimize only when you see performance issues
• Don't optimize everything blindly`,
    },
    {
      id: 211,
      category: "reacttheory",
      level: "⚛️ React Theory 4",
      difficulty: "Expert",
      question: "Real World E-commerce Example",
      code: `// E-commerce Cart with Optimization
import React, { useState, useMemo, useCallback, memo } from 'react';

// Optimized Child Component
const ProductItem = memo(({ product, onAddToCart }) => {
  console.log(\`Rendering \${product.name}\`);
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: {product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});

function EcommerceStore() {
  const [products] = useState([
    { id: 1, name: 'Laptop', price: 50000, category: 'electronics' },
    { id: 2, name: 'Shirt', price: 2000, category: 'fashion' },
    { id: 3, name: 'Phone', price: 30000, category: 'electronics' },
    { id: 4, name: 'Jeans', price: 2500, category: 'fashion' },
  ]);
  
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [coupon, setCoupon] = useState('');

  // useMemo: Filtered products (expensive operation)
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  // useMemo: Cart total (expensive calculation)
  const cartTotal = useMemo(() => {
    console.log('Calculating cart total...');
    return cart.reduce((total, item) => total + item.price, 0);
  }, [cart]);

  // useMemo: Discount calculation
  const discount = useMemo(() => {
    if (coupon === 'SAVE10') return cartTotal * 0.1;
    if (coupon === 'SAVE20') return cartTotal * 0.2;
    return 0;
  }, [cartTotal, coupon]);

  // useCallback: Add to cart function
  const handleAddToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
  }, []);

  // useCallback: Apply coupon
  const applyCoupon = useCallback(() => {
    setCoupon('SAVE10');
  }, []);

  return (
    <div>
      <h1>E-commerce Store</h1>
      
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
      </select>
      
      <h2>Products ({filteredProducts.length})</h2>
      {filteredProducts.map(product => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
      
      <h2>Cart: {cart.length} items</h2>
      <p>Total: ₹{cartTotal}</p>
      <p>Discount: ₹{discount}</p>
      <p>Final: ₹{cartTotal - discount}</p>
      
      <button onClick={applyCoupon}>Apply 10% Coupon</button>
    </div>
  );
}`,
      output: `• ProductItem components only re-render when their specific product changes
• Filtering only happens when search/category changes
• Cart total only recalculates when cart changes
• Optimized performance for large product lists`,
      explanation: `Industrial Best Practices:

1. useMemo for:
   • Filtering/Searching large lists
   • Cart calculations
   • Derived data (discount, totals)
   • Sorting operations

2. useCallback for:
   • Event handlers passed to child components
   • Functions in dependency arrays
   • Callbacks that trigger re-renders

3. React.memo for:
   • List items (ProductItem)
   • Pure presentational components
   • Components that re-render with same props

Performance Gains:
• Search typing → No product re-renders
• Category change → Only filtering runs
• Add to cart → Only cart updates
• Apply coupon → Only discount calculation

Memory vs CPU Tradeoff:
• useMemo/useCallback use more memory (cache)
• But save CPU cycles (avoid recalculations)
• Good for frequently updating components`,
    },
    {
      id: 212,
      category: "reacttheory",
      level: "⚛️ React Theory 5",
      difficulty: "Medium",
      question: "Common Interview Questions on useMemo/useCallback",
      code: `// Question 1: What will be logged?
function Component() {
  const [count, setCount] = useState(0);
  
  const increment = useCallback(() => {
    setCount(count + 1);
  }, []);
  
  console.log('Render');
  return <button onClick={increment}>Count: {count}</button>;
}

// Question 2: Is this correct?
const data = useMemo(() => {
  return fetchData(userId);
}, []);

// Question 3: Performance issue?
const List = ({ items }) => {
  const sortedItems = useMemo(() => {
    return [...items].sort();
  }, [items]);
  
  return sortedItems.map(item => <div key={item}>{item}</div>);
};`,
      output: `Q1: Button click won't increase count correctly
Q2: No, missing userId dependency
Q3: Yes, sorting on every render of parent`,
      explanation: `Interview Answers:

Q1: The increment function has empty dependencies, so it captures the initial count (0). Every click sets count to 1.

Fix: Add count to dependencies or use functional update:
const increment = useCallback(() => {
  setCount(prev => prev + 1);
}, []);

Q2: Missing userId dependency → stale data. Add [userId] to dependencies.

Q3: If parent re-renders often, sorting happens each time. But if items array is same reference, useMemo prevents recalculation. However, creating new arrays [...items] might defeat memoization.

Advanced Questions:

1. What's the difference between useMemo and React.memo?
   • useMemo → memoizes a value
   • React.memo → memoizes a component

2. When does useMemo run?
   • During render, before painting
   • Only when dependencies change

3. Can useMemo replace useEffect?
   • No! useMemo is for values, useEffect is for side effects

4. Cost of overusing useMemo/useCallback?
   • Memory overhead
   • Complexity
   • Debugging difficulty

Pro Tip:
• Start without optimization
• Measure performance
• Add useMemo/useCallback only where needed
• Use React DevTools Profiler to identify bottlenecks`,
    },
    {
      id: 213,
      category: "operators",
      level: "😵‍💫 Coercion Challenge",
      difficulty: "Hard",
      question: "Complex Chain of Operations",
      code: `const a = 12 + "23+45" + 234 + "64-2" - 212;
console.log(a);`,
      output: `NaN`,
      explanation: `Step-by-Step Evaluation:

1) 12 + "23+45" -> "1223+45" (Number + String -> String)
2) "1223+45" + 234 -> "1223+45234" (String + Number -> String)
3) "1223+45234" + "64-2" -> "1223+4523464-2" (String + String -> String)
4) "1223+4523464-2" - 212 -> NaN

Reason: The string "1223+4523464-2" cannot be converted to a valid number because of the non-numeric characters ('+' and '-'), resulting in NaN during the subtraction operation.`,
    },
    {
      id: 214,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Webpack & Props Drilling",
      code: `// Props Drilling Example
function App() {
  const user = "Devesh";
  return <Parent user={user} />;
}

function Parent({ user }) {
  return <Child user={user} />;
}

function Child({ user }) {
  return <GrandChild user={user} />;
}

function GrandChild({ user }) {
  return <h1>Hello {user}</h1>;
}
// Data is passed through Parent and Child just to reach GrandChild`,
      output: `Hello Devesh`,
      explanation: `Webpack:
• Webpack ek bundler hai.
• Matlab: Tumhare React app ke saare files (JS, CSS, images) ko mila kar ek optimized bundle bana deta hai.
• Kaam: Bundling, Minification, Code Splitting, Hot Reload.

Props Drilling:
• Jab data parent se child, phir uske child, phir uske child… sirf pass karne ke liye bheja jata hai, use Props Drilling kehte hain.
• Problem: Code messy aur maintain karna mushkil.
• Solution: Context API, Redux, ya Zustand.`,
    },
    {
      id: 215,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is Vite?",
      code: `npm create vite@latest

// Vite = Instant Server Start + Super Fast HMR`,
      output: `Vite is a build tool`,
      explanation: `Vite:
• Vite ek modern build tool aur dev server hai jo React, Vue, Svelte jaise frameworks ke liye use hota hai.
• Vite Itna Fast Kyun Hai?
  - Dev time par bundling nahi karta.
  - Browser ke native ES Modules use karta hai.
  - Sirf wahi file serve karta jo browser ne maangi.
• Flow: React Files -> Vite Dev Server -> Browser (ES Modules).`,
    },
    {
      id: 216,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "Props vs State",
      code: `// Props (Read-only)
function Child(props) {
  return <h1>{props.name}</h1>;
}

// State (Mutable)
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>+</button>;
}`,
      output: `Props come from parent, State is internal`,
      explanation: `Props:
• Props ka matlab: data jo parent se child ko bheja jata hai.
• Props read-only hote hain (Immutable).
• External data.

State:
• State component ka apna data hota hai jo change ho sakta hai.
• Jab state change hota hai, component re-render hota hai.
• Internal data (Mutable via setter).`,
    },
    {
      id: 217,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Class vs Functional Component",
      code: `// Class Component
class Counter extends React.Component {
  state = { count: 0 };
  render() { 
    return <button onClick={() => this.setState({count: this.state.count + 1})}>
      {this.state.count}
    </button>; 
  }
}

// Functional Component
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}`,
      output: `Both render the same UI`,
      explanation: `Class Component (Purana Style):
• 'this' keyword use hota hai.
• Lifecycle methods (componentDidMount) hote hain.
• Code zyada hota hai.

Functional Component (Modern React):
• Hooks (useState, useEffect) use hote hain.
• 'this' nahi hota.
• Code kam aur simple hota hai.`,
    },
    {
      id: 218,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is React?",
      code: `function App() {
  return <h1>Hello React</h1>;
}`,
      output: `Hello React`,
      explanation: `React:
• React ek JavaScript library hai jo fast, interactive aur dynamic UI banane ke liye use hoti hai (developed by Meta).
• Component-Based: UI ko chhote-chhote reusable components me tod deta hai.
• Virtual DOM: Real DOM ke bajay virtual copy banata hai aur sirf changed part ko update karta hai (fast performance).
• Declarative: Tum batate ho "kya chahiye", React decide karta hai "kaise render kare".`,
    },
    {
      id: 219,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "What is Redux?",
      code: `// Central Store -> Components
// No need to pass props down the tree

const store = createStore(reducer);
// Components subscribe to store directly`,
      output: `Centralized State Management`,
      explanation: `Redux:
• Redux ek state management library hai jo React ke saath use hoti hai.
• Simple Words: Ek central store banata hai jahan app ka important data rakha jata hai.
• Solution to Props Drilling: Sab components store se directly data le sakte hain.
• Redux Flow: Component -> Action -> Reducer -> Store -> Component.`,
    },
    {
      id: 220,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Why Redux Toolkit?",
      code: `const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => {
      // Immer makes this immutable under the hood
      state.value += 1;
    }
  }
});`,
      output: `Less boilerplate, easier to write`,
      explanation: `Redux Toolkit (RTK):
• Redux ka modern aur easy version hai.
• Fayde:
  - Standard Redux me boilerplate code bahut zyada hota tha (Actions, Types, Reducers alag-alag).
  - RTK me 'createSlice' use hota hai jo sab kuchh ek jagah handle karta hai.
  - Immer.js built-in hai, to state ko directly mutate kar sakte hain (e.g., state.value += 1).`,
    },
    {
      id: 221,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What is createAsyncThunk?",
      code: `const fetchUser = createAsyncThunk(
  'users/fetchById',
  async (userId) => {
    const response = await userAPI.fetchById(userId)
    return response.data
  }
)`,
      output: `Handles API loading states automatically`,
      explanation: `createAsyncThunk:
• Yeh RTK ka ek powerful function hai jo Async Operations (API calls) handle karta hai.
• Magic: Yeh apne aap 3 actions generate karta hai:
  - pending (Loading start)
  - fulfilled (Success)
  - rejected (Error)
• Tumhe manually 'dispatch({ type: "LOADING" })' karne ki zarurat nahi.`,
    },
    {
      id: 222,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "What is useRef?",
      code: `function TextInput() {
  const inputRef = useRef(null);

  const onButtonClick = () => {
    // Access DOM directly
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={onButtonClick}>Focus Input</button>
    </>
  );
}`,
      output: `Direct DOM access, No Re-renders`,
      explanation: `useRef:
• useRef ka use DOM elements ko directly access karne ke liye hota hai.
• Example: Input field ko focus karna (inputRef.current.focus()).
• Speciality: Yeh value ko persist karta hai bina re-render karwaye. Agar useState use karoge to har change pe component re-render hoga, par useRef me aisa nahi hota.`,
    },
    {
      id: 223,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Pure vs Impure Functions",
      code: `// Pure Function
const add = (a, b) => a + b;
// Always returns same result for same inputs

// Impure Function
const getRandom = () => Math.random();
// Returns different result every time`,
      output: `Reducers must be Pure`,
      explanation: `Pure vs Impure:
• Pure Function: Jo same input ke liye hamesha same output de aur koi side-effect na kare (e.g., DOM change, API call nahi). React ke Reducers pure hone chahiye.
• Impure Function: Jo external variable change kare ya random result de (e.g., Math.random(), Date.now()).`,
    },
    {
      id: 224,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Controlled vs Uncontrolled Components",
      code: `// Controlled (Recommended)
const [val, setVal] = useState("");
<input value={val} onChange={e => setVal(e.target.value)} />

// Uncontrolled
const ref = useRef();
<input ref={ref} />`,
      output: `Controlled = React State, Uncontrolled = DOM`,
      explanation: `Difference:
• Controlled: Jiska data React state (useState) control kare. Best approach hai kyunki data sync rehta hai.
• Uncontrolled: Jiska data DOM khud handle kare (useRef se access karte hain). Form submit hone par hi value milti hai.`,
    },
    {
      id: 225,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "useEffect vs useLayoutEffect",
      code: `useEffect(() => {
  // Runs after paint
  console.log("Painted");
}, []);

useLayoutEffect(() => {
  // Runs before paint
  console.log("Before Paint");
}, []);`,
      output: `Timing is the key`,
      explanation: `Kab kya use karein:
• useEffect: Render hone ke *baad* chalta hai (Async). Isse UI block nahi hoti. Standard use case.
• useLayoutEffect: Browser ke paint karne se *pehle* chalta hai (Sync).
• Use Case: Agar UI flicker kar raha hai (e.g., measurements calculate karna), to useLayoutEffect use karo.`,
    },
    {
      id: 226,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Virtual vs Real vs Shadow DOM",
      code: `// React uses Virtual DOM for performance`,
      output: `Virtual DOM = Fast Updates`,
      explanation: `Definitions:
• Real DOM: Browser ka actual structure. Slow hota hai agar baar-baar update karo.
• Virtual DOM: React ki memory me ek copy. Jab state change hoti hai, React pehle Virtual DOM update karta hai, diff nikalta hai, aur sirf changed part Real DOM me update karta hai (Reconciliation).
• Shadow DOM: Browser ka feature hai jo styles aur markup ko isolate karta hai (e.g., video tag ke controls). React iska use nahi karta.`,
    },
    {
      id: 227,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "useRef Industrial Example (API Debouncing)",
      code: `function Search() {
  const timerRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Clear previous timer (Debouncing)
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fetch(\`/api/search?q=\${query}\`);
      console.log("API Called");
    }, 500);
  }, [query]);

  return <input onChange={(e) => setQuery(e.target.value)} />;
}`,
      output: `Optimized API Calls`,
      explanation: `Industrial Use Case:
• Scenario: Search box me user fast type kar raha hai. Har keystroke pe API call server kill kar dega.
• Solution: useRef me timer ID store karo.
• Logic:
  - Jab user type kare, purana timer clear karo (clearTimeout).
  - Naya timer set karo.
  - Agar user 500ms tak rukta hai, tabhi API call hogi.
• Benefit: useRef re-render par reset nahi hota, isliye timer ID persist rahti hai without causing extra re-renders.`,
    },
    {
      id: 228,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What is Debouncing?",
      code: `function Search() {
  const [query, setQuery] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log("API Call for:", query);
      // fetch(\`/api/search?q=\${query}\`);
    }, 500);

  }, [query]);

  return (
    <input
      placeholder="Search..."
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}`,
      output: `API call happens only after user stops typing`,
      explanation: `Debouncing:
• Matlab: User jab tak action repeat karta rahe, function call mat karo. Jab user ruk jaaye thoda time -> tab call karo.
• Real Use: Search box, Form validation, API calls.
• Flow:
  - User types "r" -> timer set
  - User types "re" -> old timer clear
  - User stops typing -> 500ms wait -> API call.
• Exam-Ready Line: User ke rukne ke baad function call karna.`,
    },
    {
      id: 229,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What is Throttling?",
      code: `function ScrollTracker() {
  const lastCallRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastCallRef.current > 500) {
        console.log("Scroll event handled");
        lastCallRef.current = now;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div style={{ height: "200vh" }}>Scroll Me</div>;
}`,
      output: `Event runs at most once every 500ms`,
      explanation: `Throttling:
• Matlab: Chahe user 100 baar action kare, function fixed time me sirf ek baar chale.
• Real Use: Window scroll, Window resize, Mouse move.
• Exam-Ready Line: Fixed time interval me function ko ek baar chalana.`,
    },
    {
      id: 230,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Debounce vs Throttle",
      code: `// Debounce (Wait for stop)
// Search boxes, API calls
// User stops -> Action

// Throttle (Fixed interval)
// Scroll, Resize, Mouse move
// Continuous action -> Periodic updates`,
      output: `Performance Optimization`,
      explanation: `Comparison:
1. Debounce:
   • User rukne ke baad call hota hai.
   • Best for: Search, API optimization.

2. Throttle:
   • Fixed time me ek baar call hota hai.
   • Best for: Scroll, resize, performance heavy events.

Industrial Summary:
• Search boxes -> Debounce
• API calls -> Debounce
• Scroll/resize -> Throttle`,
    },
    {
      id: 231,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is JSX?",
      code: `const element = <h1>Hello, world!</h1>;`,
      output: `JavaScript XML`,
      explanation: `JSX:
• JSX stands for JavaScript XML.
• It allows us to write HTML in React.
• JSX makes it easier to write and add HTML in React.`,
    },
    {
      id: 232,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is a Component?",
      code: `function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
      output: `Building block of React`,
      explanation: `Component:
• Components are like functions that return HTML elements.
• They are independent and reusable bits of code.
• They serve the same purpose as JavaScript functions, but work in isolation and return HTML.`,
    },
    {
      id: 233,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is React Fragment?",
      code: `function App() {
  return (
    <>
      <h1>One</h1>
      <h2>Two</h2>
    </>
  );
}`,
      output: `Wrapper without extra DOM node`,
      explanation: `React Fragment:
• A common pattern in React is for a component to return multiple elements.
• Fragments let you group a list of children without adding extra nodes to the DOM.
• <React.Fragment> or short syntax <>...</> can be used.`,
    },
    {
      id: 234,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is Strict Mode?",
      code: `<React.StrictMode>
  <App />
</React.StrictMode>`,
      output: `Development helper`,
      explanation: `Strict Mode:
• StrictMode is a tool for highlighting potential problems in an application.
• Like Fragment, StrictMode does not render any visible UI.
• It activates additional checks and warnings for its descendants.
• Note: Strict mode checks are run in development mode only; they do not impact the production build.`,
    },
    {
      id: 235,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Why use Keys in Lists?",
      code: `const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);`,
      output: `Stable Identity for Elements`,
      explanation: `Keys:
• React needs 'key' to identify which items have changed, added, or removed.
• Without keys, React might re-render the whole list instead of just updates.
• Hinglish: "Agar key nahi doge, to React confuse ho jayega ki kaunsa item naya hai aur kaunsa purana. Performance down ho jayegi."
• Industrial Rule: Never use 'index' as key if list can change (add/remove/reorder). Use unique IDs.`,
    },
    {
      id: 236,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "What is Context API?",
      code: `const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}`,
      output: `Solves Prop Drilling`,
      explanation: `Context API:
• Allows sharing data (global state) without passing props manually at every level.
• Use Cases: Theme, User Auth, Language settings.
• Hinglish: "Har component ko prop pass karne ki bajaye, 'Context' banao aur jisko chahiye wo wahan se direct le lega."
• Industrial Definition: Dependency Injection mechanism for React component tree.`,
    },
    {
      id: 237,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "Higher-Order Components (HOC)",
      code: `function withAuth(Component) {
  return function WrappedComponent(props) {
    if (!props.isAuthenticated) return <Login />;
    return <Component {...props} />;
  }
}`,
      output: `Function returning a Component`,
      explanation: `HOC:
• A function that takes a component and returns a new component with added logic.
• Pattern used for reusing component logic (e.g., Auth check, Logging).
• Hinglish: "Ye ek wrapper hai. Component ko decorate karke wapas deta hai naye features ke saath."
• Industrial: Decorator pattern implementation in React.`,
    },
    {
      id: 238,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What are React Portals?",
      code: `ReactDOM.createPortal(
  child,
  container
)`,
      output: `Render outside DOM hierarchy`,
      explanation: `Portals:
• Allows rendering children into a DOM node that exists outside the DOM hierarchy of the parent component.
• Use Cases: Modals, Tooltips, Popups (to avoid z-index issues).
• Hinglish: "Agar component ko apne parent ke bahar (jaise body tag me) dikhana ho, to Portal use karo."`,
    },
    {
      id: 239,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "What are Error Boundaries?",
      code: `class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
      output: `Catch JS errors in UI`,
      explanation: `Error Boundaries:
• React components that catch JavaScript errors anywhere in their child component tree.
• Prevent the whole app from crashing.
• Hinglish: "Ye ek safety net hai. Agar child component me error aayi, to ye app ko crash hone se bachata hai aur fallback UI dikhata hai."
• Note: Only works with Class Components currently.`,
    },
    {
      id: 240,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "React Router Basics",
      code: `<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>`,
      output: `Client Side Routing`,
      explanation: `React Router:
• Standard library for routing in React.
• Enables navigation among views without full page refresh.
• Hinglish: "Bina page reload kiye URL change karna aur naya content dikhana."
• Industrial: SPA (Single Page Application) navigation manager.`,
    },
    {
      id: 241,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "useState vs useReducer",
      code: `const [state, dispatch] = useReducer(reducer, initialState);`,
      output: `Complex State Logic`,
      explanation: `Comparison:
• useState: Simple state (numbers, strings, booleans).
• useReducer: Complex state logic involving multiple sub-values or when next state depends on previous one.
• Hinglish: "Jab state simple ho to useState. Jab logic complex ho ya Redux jaisa feel chahiye to useReducer."
• Industrial: useReducer is preferred for complex state transitions and state machines.`,
    },
    {
      id: 242,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What are Custom Hooks?",
      code: `function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  useEffect(() => {
    // logic to update size
  }, []);
  return size;
}`,
      output: `Reusable Logic`,
      explanation: `Custom Hooks:
• JavaScript functions that start with 'use' and can call other hooks.
• Allow reusing stateful logic between components.
• Hinglish: "Agar same logic do components me chahiye, to copy-paste mat karo, custom hook bana lo."
• Industrial: DRY (Don't Repeat Yourself) principle for React Logic.`,
    },
    {
      id: 243,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Lazy Loading & Suspense",
      code: `const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}`,
      output: `Code Splitting`,
      explanation: `Lazy & Suspense:
• React.lazy: Loads component only when needed (on-demand).
• Suspense: Shows a fallback (loader) while waiting for the lazy component.
• Hinglish: "Pura app ek saath load mat karo. Jab zarurat ho tabhi component download karo. Tab tak loading dikhao."
• Industrial: Reduces Initial Bundle Size (Faster First Contentful Paint).`,
    },
    {
      id: 244,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "What is forwardRef?",
      code: `const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));`,
      output: `Pass Ref to Child`,
      explanation: `forwardRef:
• Allows a parent component to pass a ref down to a child component's DOM node.
• Hinglish: "Normally ref sirf HTML tag pe lagta hai. Agar custom component pe ref lagana hai to forwardRef use karna padega."
• Use Case: Focus management, Animations interacting with DOM.`,
    },
    {
      id: 245,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "What are Synthetic Events?",
      code: `function handleClick(e) {
  e.preventDefault(); // Works same across all browsers
  console.log('The link was clicked.');
}`,
      output: `Cross-Browser Wrapper`,
      explanation: `Synthetic Events:
• React wraps the native browser event to ensure it works identically across all browsers.
• Hinglish: "Browser ka apna event system alag hota hai. React sabko ek jaisa bana deta hai taaki cross-browser issue na aaye."
• Industrial: Normalizes inconsistencies between browser event implementations.`,
    },
    {
      id: 246,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "Lifting State Up",
      code: `function Calculator() {
  const [temp, setTemp] = useState('');
  return (
    <div>
      <Input1 value={temp} onChange={setTemp} />
      <Input2 value={temp} onChange={setTemp} />
    </div>
  );
}`,
      output: `Sharing State`,
      explanation: `Lifting State Up:
• Moving state to the closest common ancestor of components that need it.
• Hinglish: "Jab do bhaiyon (siblings) ko same khilauna (data) chahiye, to papa (parent) ke paas rakh do."
• Industrial: Fundamental pattern for sharing data between sibling components.`,
    },
    {
      id: 247,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "Prop Types vs TypeScript",
      code: `// PropTypes (Runtime)
MyComponent.propTypes = {
  name: PropTypes.string
};

// TypeScript (Compile time)
interface Props {
  name: string;
}`,
      output: `Type Checking`,
      explanation: `Comparison:
• PropTypes: Checks types at runtime (in browser console).
• TypeScript: Checks types at compile time (before running code).
• Hinglish: "PropTypes browser me check karta hai, TypeScript code likhte waqt hi galti bata deta hai."
• Industrial: TypeScript is industry standard now. PropTypes is legacy.`,
    },
    {
      id: 248,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "PureComponent vs React.memo",
      code: `class MyPure extends React.PureComponent { ... }

const MyMemo = React.memo(function MyComponent(props) { ... });`,
      output: `Performance Optimization`,
      explanation: `Difference:
• PureComponent: For Class Components. Implements shouldComponentUpdate with shallow prop comparison.
• React.memo: For Functional Components. Does the same thing.
• Hinglish: "Dono ka kaam same hai - agar props change nahi hue to re-render mat karo. PureComponent class ke liye, memo function ke liye."`,
    },
    {
      id: 249,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Expert",
      question: "What is Reconciliation?",
      code: `// React Diffing Algorithm`,
      output: `Process of updating DOM`,
      explanation: `Reconciliation:
• The process through which React updates the DOM.
• It compares the Virtual DOM with the previous one to determine changes.
• Hinglish: "React ka wo algorithm jo decide karta hai ki kya change hua hai aur kaise efficiently update karna hai."
• Industrial: Based on heuristic O(n) algorithm assuming elements of different types produce different trees.`,
    },
    {
      id: 250,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Expert",
      question: "React Fiber Architecture",
      code: `// Incremental Rendering`,
      output: `New Core Engine`,
      explanation: `React Fiber:
• The new reconciliation engine in React 16.
• Ability to split rendering work into chunks and spread it out over multiple frames.
• Hinglish: "React ka naya engine jo kaam ko tod-tod kar karta hai taaki UI freeze na ho."
• Industrial: Enables features like Suspense and Concurrent Mode.`,
    },
    {
      id: 251,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Easy",
      question: "What is 'children' prop?",
      code: `<Card>
  <h1>Title</h1>
  <p>Content</p>
</Card>

// In Card component:
{props.children}`,
      output: `Composition`,
      explanation: `children prop:
• A special prop that contains whatever you include between the opening and closing tags of a component.
• Hinglish: "Component ke andar jo bhi HTML likhoge, wo 'children' prop ban kar milega."
• Industrial: Used for Layout components and Generic containers.`,
    },
    {
      id: 252,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "One-Way Data Binding",
      code: `Parent -> Child (Props)
Child -> Parent (Callback)`,
      output: `Unidirectional Flow`,
      explanation: `One-Way Binding:
• In React, data flows down (Parent to Child).
• To communicate up, children call functions passed from parents.
• Hinglish: "Data sirf upar se neeche behta hai (Water fall). Neeche se upar bhejna hai to callback use karo."
• Industrial: Makes app data flow predictable and easier to debug.`,
    },
    {
      id: 253,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Hard",
      question: "Flux vs Redux",
      code: `// Flux: Multiple Stores
// Redux: Single Store`,
      output: `Architecture Pattern`,
      explanation: `Comparison:
• Flux: An architecture pattern developed by Facebook. Can have multiple stores.
• Redux: A library implementing Flux-like pattern but with a SINGLE store and pure reducers.
• Hinglish: "Flux ek idea hai, Redux uska implementation hai (thode changes ke saath)."
• Industrial: Redux is the de-facto standard implementation of Flux pattern.`,
    },
    {
      id: 254,
      category: "reactfundamentals",
      level: "React Fundamentals",
      difficulty: "Medium",
      question: "JSX under the hood",
      code: `// JSX
<div id="abc">Hello</div>

// Compiles to
React.createElement('div', {id: 'abc'}, 'Hello')`,
      output: `React.createElement`,
      explanation: `JSX internals:
• JSX is syntactic sugar.
• Babel compiles JSX down to React.createElement() calls.
• Hinglish: "Browser JSX nahi samajhta. Babel usko JavaScript function calls me convert karta hai."
• Industrial: Understanding this helps in debugging and writing advanced patterns.`,
    },
    {
      id:255,
      category:"quickRevsion",
      question:"What is React Fiber?",
      output:"React Fiber is a reimplementation of React’s reconciliation algorithm that allows incremental rendering and prioritization."

    },
    
{
 id:255,
 category:"quickRevsion",
 question:"What is React Fiber?",
 output:"React Fiber is a reimplementation of React's reconciliation algorithm that enables incremental rendering, prioritization, and interruption for better performance."
},
{
 id:256,
 category:"quickRevsion",
 question:"Explain reconciliation in React.",
 output:"Reconciliation is the process where React compares the new virtual DOM with the previous one and updates only the changed parts in the real DOM."
},
{
 id:257,
 category:"quickRevsion",
 question:"How does React batching work?",
 output:"React groups multiple state updates into a single re-render to improve performance."
},
{
 id:258,
 category:"quickRevsion",
 question:"Difference between useEffect and useLayoutEffect?",
 output:"useLayoutEffect runs synchronously after DOM mutations, while useEffect runs asynchronously after paint."
},
{
 id:259,
 category:"quickRevsion",
 question:"How do you prevent unnecessary re-renders?",
 output:"Using React.memo, useCallback, useMemo, proper key usage, and splitting components."
},
{
 id:260,
 category:"quickRevsion",
 question:"What causes memory leaks in React?",
 output:"Uncleared timers, subscriptions, or event listeners inside useEffect."
},
{
 id:261,
 category:"quickRevsion",
 question:"How does React handle keys internally?",
 output:"Keys help React identify which elements have changed, added, or removed during reconciliation."
},
{
 id:262,
 category:"quickRevsion",
 question:"Explain controlled vs uncontrolled components.",
 output:"Controlled components use React state; uncontrolled rely on DOM state via refs."
},
{
 id:263,
 category:"quickRevsion",
 question:"How do you design scalable React architecture?",
 output:"By modular components, feature-based structure, reusable hooks, and clear state boundaries."
},
{
 id:264,
 category:"quickRevsion",
 question:"Redux vs Context API?",
 output:"Redux is better for complex global state, Context is suitable for small shared state."
},
{
 id:265,
 category:"quickRevsion",
 question:"What is middleware in Redux?",
 output:"Middleware intercepts actions to handle async logic or side effects."
},
{
 id:266,
 category:"quickRevsion",
 question:"How does Next.js improve performance?",
 output:"Through SSR, SSG, code splitting, image optimization, and caching."
},
{
 id:267,
 category:"quickRevsion",
 question:"What is hydration?",
 output:"Hydration attaches event listeners to server-rendered HTML on the client."
},
{
 id:268,
 category:"quickRevsion",
 question:"How do you handle authentication in SSR?",
 output:"By validating cookies or headers inside getServerSideProps."
},
{
 id:269,
 category:"quickRevsion",
 question:"Explain code splitting.",
 output:"Code splitting loads JavaScript in smaller chunks to reduce initial load time."
},
{
 id:270,
 category:"quickRevsion",
 question:"What are Web Vitals?",
 output:"Metrics like LCP, FID, and CLS that measure user experience performance."
},
{
 id:271,
 category:"quickRevsion",
 question:"How do you optimize large lists?",
 output:"Using virtualization libraries like react-window."
},
{
 id:272,
 category:"quickRevsion",
 question:"How do you secure React applications?",
 output:"By preventing XSS, using HTTP-only cookies, and secure API calls."
},
{
 id:273,
 category:"quickRevsion",
 question:"How do you test React apps?",
 output:"Using Jest for unit tests and Cypress for end-to-end tests."
},

/* ---------- React Quick Notes ---------- */

{
 id:274,
 category:"quickRevsion",
 question:"What is React?",
 output:"A JavaScript library for building UI."
},
{
 id:275,
 category:"quickRevsion",
 question:"What is JSX?",
 output:"Syntax extension to write HTML in JS."
},
{
 id:276,
 category:"quickRevsion",
 question:"Virtual DOM?",
 output:"Lightweight copy of real DOM."
},
{
 id:277,
 category:"quickRevsion",
 question:"Why React is fast?",
 output:"Efficient diffing and batching."
},
{
 id:278,
 category:"quickRevsion",
 question:"Props vs State?",
 output:"Props are read-only, state is mutable."
},
{
 id:279,
 category:"quickRevsion",
 question:"Hooks?",
 output:"Functions to use state and lifecycle."
},
{
 id:280,
 category:"quickRevsion",
 question:"Rules of Hooks?",
 output:"Top-level, only in React functions."
},
{
 id:281,
 category:"quickRevsion",
 question:"useState?",
 output:"Manages component state."
},
{
 id:282,
 category:"quickRevsion",
 question:"useEffect?",
 output:"Handles side effects."
},
{
 id:283,
 category:"quickRevsion",
 question:"Dependency array?",
 output:"Controls effect execution."
},
{
 id:284,
 category:"quickRevsion",
 question:"useMemo?",
 output:"Memoizes values."
},
{
 id:285,
 category:"quickRevsion",
 question:"useCallback?",
 output:"Memoizes functions."
},
{
 id:286,
 category:"quickRevsion",
 question:"React.memo?",
 output:"Prevents unnecessary re-renders."
},
{
 id:287,
 category:"quickRevsion",
 question:"Key prop?",
 output:"Identifies list items."
},
{
 id:288,
 category:"quickRevsion",
 question:"Re-render cause?",
 output:"State/props change."
},
{
 id:289,
 category:"quickRevsion",
 question:"Prevent re-render?",
 output:"Memoization."
},
{
 id:290,
 category:"quickRevsion",
 question:"Fiber?",
 output:"React’s rendering engine."
},
{
 id:291,
 category:"quickRevsion",
 question:"Lazy loading?",
 output:"Load components on demand."
},
{
 id:292,
 category:"quickRevsion",
 question:"Suspense?",
 output:"Handles async rendering."
},
{
 id:293,
 category:"quickRevsion",
 question:"Context API?",
 output:"Global state sharing."
},
{
 id:294,
 category:"quickRevsion",
 question:"Redux?",
 output:"Predictable state container."
},

/* ---------- JavaScript Advanced ---------- */

{
 id:295,
 category:"quickRevsion",
 question:"What is optional chaining?",
 output:"Safely access nested properties."
},
{
 id:296,
 category:"quickRevsion",
 question:"Nullish coalescing?",
 output:"Returns right operand if left is null or undefined."
},
{
 id:297,
 category:"quickRevsion",
 question:"What is module?",
 output:"Reusable piece of code with export/import."
},
{
 id:298,
 category:"quickRevsion",
 question:"ES6 features?",
 output:"Arrow functions, classes, promises, modules."
},
{
 id:299,
 category:"quickRevsion",
 question:"What is BigInt?",
 output:"Data type for large integers."
},
{
 id:300,
 category:"quickRevsion",
 question:"What is GC?",
 output:"Garbage Collector that frees unused memory."
},

/* ---------- Event Loop / Security ---------- */

{
 id:301,
 category:"quickRevsion",
 question:"Microtask queue?",
 output:"Queue for promises and mutation observers."
},
{
 id:302,
 category:"quickRevsion",
 question:"Macrotask queue?",
 output:"Queue for setTimeout, setInterval, I/O."
},
{
 id:303,
 category:"quickRevsion",
 question:"Deep copy?",
 output:"Completely independent copy of an object."
},
{
 id:304,
 category:"quickRevsion",
 question:"Shallow copy?",
 output:"Copies only first-level properties."
},
{
 id:305,
 category:"quickRevsion",
 question:"Memory leak?",
 output:"Unused memory not released by GC."
},
{
 id:306,
 category:"quickRevsion",
 question:"Strict mode?",
 output:"Restricts unsafe JavaScript behavior."
},
{
 id:307,
 category:"quickRevsion",
 question:"Currying?",
 output:"Transforming function into nested functions."
},
{
 id:308,
 category:"quickRevsion",
 question:"IIFE?",
 output:"Immediately Invoked Function Expression."
},
{
 id:309,
 category:"quickRevsion",
 question:"Event bubbling?",
 output:"Event propagates from child to parent."
},
{
 id:310,
 category:"quickRevsion",
 question:"Event capturing?",
 output:"Event propagates from parent to child."
},
{
 id:311,
 category:"quickRevsion",
 question:"DOM?",
 output:"Document Object Model."
},
{
 id:312,
 category:"quickRevsion",
 question:"CORS?",
 output:"Security mechanism for cross-origin requests."
},

/* ---------- Core JavaScript ---------- */

{
 id:313,
 category:"quickRevsion",
 question:"What is JavaScript?",
 output:"Single-threaded interpreted dynamic language."
},
{
 id:314,
 category:"quickRevsion",
 question:"Event Loop?",
 output:"Manages sync code, microtasks, macrotasks."
},
{
 id:315,
 category:"quickRevsion",
 question:"var vs let vs const?",
 output:"var function scoped, let/const block scoped."
},
{
 id:316,
 category:"quickRevsion",
 question:"Hoisting?",
 output:"Moves declarations to top."
},
{
 id:317,
 category:"quickRevsion",
 question:"Closure?",
 output:"Function remembers lexical scope."
},
{
 id:318,
 category:"quickRevsion",
 question:"== vs ===?",
 output:"== checks value, === checks value and type."
},
{
 id:319,
 category:"quickRevsion",
 question:"this keyword?",
 output:"Refers to execution context."
},
{
 id:320,
 category:"quickRevsion",
 question:"Call apply bind?",
 output:"Control function context."
},
{
 id:321,
 category:"quickRevsion",
 question:"Debounce?",
 output:"Delay execution."
},
{
 id:322,
 category:"quickRevsion",
 question:"Throttle?",
 output:"Limit execution rate."
},
{
 id:323,
 category:"quickRevsion",
 question:"Promise?",
 output:"Future value object."
},
{
 id:324,
 category:"quickRevsion",
 question:"Promise states?",
 output:"Pending, fulfilled, rejected."
},
{
 id:325,
 category:"quickRevsion",
 question:"async/await?",
 output:"Promise handling syntax."
}


  ];

  const filteredQuestions =
    activeCategory === "all"
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  // const getDifficultyColor = (difficulty) => {
  //   const colors = {
  //     Easy: "bg-green-100 text-green-700",
  //     Medium: "bg-yellow-100 text-yellow-700",
  //     Hard: "bg-orange-100 text-orange-700",
  //     Expert: "bg-red-100 text-red-700",
  //   };
  //   return colors[difficulty] || "bg-gray-100 text-gray-700";
  // };

  const getDifficultyColor = (difficulty: Difficulty) => {
  const colors: Record<Difficulty, string> = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-orange-100 text-orange-700",
    Expert: "bg-red-100 text-red-700",
  };
  return colors[difficulty] || "bg-gray-100 text-gray-700";
};


  // Helper function to escape HTML
  const escapeHtml = (text:string)=>{
    if (!text) return "";
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const generatePDFContent = () => {
    let content = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      padding: 20px; 
      max-width: 1000px; 
      margin: 0 auto; 
      background: #ffffff; 
      line-height: 1.6;
    }
    h1 { 
      color: #8b5cf6; 
      text-align: center; 
      border-bottom: 4px solid #8b5cf6; 
      padding-bottom: 15px; 
      margin-bottom: 30px;
      font-size: 2.5rem;
    }
    .question { 
      background: white; 
      padding: 20px; 
      margin: 25px 0; 
      border-radius: 10px; 
      border: 1px solid #e5e7eb;
      page-break-inside: avoid;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: center; 
      margin-bottom: 15px; 
      padding-bottom: 10px;
      border-bottom: 2px solid #f3f4f6;
    }
    .level { 
      color: #7c3aed; 
      font-weight: bold; 
      font-size: 1.1rem; 
      background: #f5f3ff;
      padding: 5px 12px;
      border-radius: 20px;
    }
    .difficulty { 
      padding: 4px 12px; 
      border-radius: 20px; 
      font-size: 0.85rem; 
      font-weight: 600; 
    }
    .easy { background: #dcfce7; color: #166534; }
    .medium { background: #fef3c7; color: #92400e; }
    .hard { background: #fed7aa; color: #9a3412; }
    .expert { background: #fee2e2; color: #991b1b; }
    .question-title { 
      color: #1f2937; 
      margin: 15px 0; 
      font-size: 1.2rem;
      font-weight: 600;
    }
    .code { 
      background: #1e293b; 
      color: #e2e8f0; 
      padding: 20px; 
      border-radius: 8px; 
      overflow-x: auto; 
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace; 
      margin: 15px 0; 
      line-height: 1.5;
      font-size: 0.95rem;
      border: 1px solid #374151;
    }
    .output { 
      background: #ecfdf5; 
      color: #065f46; 
      padding: 20px; 
      border-radius: 8px; 
      border-left: 4px solid #10b981; 
      margin: 15px 0; 
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      line-height: 1.5;
      font-size: 0.95rem;
    }
    .explanation { 
      background: #eff6ff; 
      padding: 20px; 
      border-radius: 8px; 
      border-left: 4px solid #3b82f6; 
      margin: 15px 0; 
      line-height: 1.7;
      font-size: 0.95rem;
    }
    .footer { 
      text-align: center; 
      margin-top: 40px; 
      color: #6b7280; 
      padding: 25px 20px;
      border-top: 2px solid #f3f4f6;
    }
    .category-badge {
      display: inline-block;
      background: #8b5cf6;
      color: white;
      padding: 6px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
    @media print {
      body { 
        padding: 10px;
        font-size: 12pt;
      }
      .question { 
        margin: 15px 0;
        page-break-inside: avoid;
      }
      h1 { font-size: 24pt; }
      .code, .output, .explanation {
        font-size: 10pt;
      }
    }
  </style>
</head>
<body>
  <h1>🔥 JavaScript & React Interview Questions - Complete Guide 🔥</h1>
  <div style="text-align: center; color: #6b7280; margin-bottom: 30px; font-size: 1.1rem;">
    <p>Master Async JavaScript, Array Methods, React Hooks & Core Concepts</p>
    <div class="category-badge">Category: ${
      categories.find((c) => c.id === activeCategory)?.name || "All Questions"
    }</div>
    <p>Total Questions: ${
      filteredQuestions.length
    } | Generated on ${new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}</p>
  </div>
`;

    filteredQuestions.forEach((q, index) => {
      const diffClass = (q.difficulty || "Medium").toLowerCase();
      content += `
  <div class="question">
    <div class="header">
      <span class="level">Q${index + 1}: ${q.level || ""}</span>
      <span class="difficulty ${diffClass}">${q.difficulty || "Medium"}</span>
    </div>
    
    <h3 class="question-title">📌 ${q.question || "No Question"}</h3>
    
    <h4 style="color: #4b5563; margin: 10px 0 5px 0; font-weight: 600;">💻 Code:</h4>
    <pre class="code">${escapeHtml(q.code || "")}</pre>
    
    <h4 style="color: #4b5563; margin: 10px 0 5px 0; font-weight: 600;">✅ Output:</h4>
    <pre class="output">${escapeHtml(q.output || "")}</pre>
    
    <h4 style="color: #4b5563; margin: 10px 0 5px 0; font-weight: 600;">🧠 Explanation:</h4>
    <div class="explanation">${(q.explanation || "").replace(
      /\n/g,
      "<br>"
    )}</div>
  </div>
`;
    });

    content += `
  <div class="footer">
    <p><strong>📚 Total Questions Covered: ${filteredQuestions.length}</strong></p>
    <p style="margin-top: 15px; font-size: 1.1rem;">⭐ Keep practicing and ace your interviews! ⭐</p>
    <p style="color: #9ca3af; margin-top: 10px;">Generated with ❤️ for aspiring developers</p>
  </div>
</body>
</html>
`;
    return content;
  };

  const downloadPDF = () => {
    const content = generatePDFContent();
    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `js-interview-${activeCategory}-${new Date()
      .toISOString()
      .slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const previewPDF = () => {
    const content = generatePDFContent();
    const previewWindow = window.open(
      "",
      "_blank",
      "width=1200,height=800,scrollbars=yes"
    );

    if (previewWindow) {
      previewWindow.document.open();
      previewWindow.document.write(content);
      previewWindow.document.close();

      // Add print button to the preview window
      previewWindow.onload = () => {
        const printBtn = previewWindow.document.createElement("button");
        printBtn.innerHTML = "🖨️ Print";
        printBtn.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 10px 20px;
          background: #8b5cf6;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          z-index: 1000;
        `;
        printBtn.onclick = () => previewWindow.print();
        previewWindow.document.body.appendChild(printBtn);
      };
    } else {
      alert("Please allow popups to view the preview");
    }
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
                  onClick={() => {
                    setActiveCategory(cat.id);
                   
                  }}
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
              {showAllCategories ? (
                <>
                  <ChevronUp size={20} className="inline mr-2" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown size={20} className="inline mr-2" />
                  Show More
                </>
              )}
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
                          q.difficulty as Difficulty
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
            <p className="text-gray-700 mb-4">
              map returns array • forEach returns undefined • splice mutates •
              slice doesn't • sort is string-based by default
            </p>

            <h3 className="font-bold text-gray-800 mb-3">Operator Rules:</h3>
            <p className="text-gray-700">
              + with string → concatenation • - * / → numeric conversion • Once
              string appears in chain → everything becomes string • true=1,
              false=0, null=0, undefined=NaN
            </p>

            <h3 className="font-bold text-gray-800 mt-4 mb-3">React Hooks:</h3>
            <p className="text-gray-700">
              useMemo → "Cache expensive calculations" • useCallback → "Keep
              function references stable" • useState updates are batched •
              useEffect runs after render
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
            Generated with ❤️ for aspiring developers | Total Questions:{" "}
            {questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
