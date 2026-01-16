Q1
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

✅ Output
A
C
B

📌 Explanation

console.log → synchronous

setTimeout → async (goes to macrotask queue)

Even 0ms timeout waits for call stack to clear

🧠 Level 2 – Multiple setTimeout
_____________________
Q2
console.log(1);

setTimeout(() => console.log(2), 100);

setTimeout(() => console.log(3), 0);

console.log(4);

✅ Output
1
4
3
2

📌 Explanation

3 runs before 2 because 0ms < 100ms
____________________________
🧠 Level 3 – setInterval with clearInterval
Q3
let count = 0;

const id = setInterval(() => {
  console.log(count);
  count++;

  if (count === 3) {
    clearInterval(id);
  }
}, 0);

console.log("Done");

✅ Output
Done
0
1
2

📌 Explanation

setInterval is async

"Done" executes first

Interval stops when count === 3
________________________
🧠 Level 4 – Nested setTimeout
Q4
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");

  setTimeout(() => {
    console.log("Timeout 2");
  }, 0);
}, 0);

console.log("End");

✅ Output
Start
End
Timeout 1
Timeout 2

📌 Explanation

Inner setTimeout waits for next event loop cycle
____________________________
🧠 Level 5 – Promise vs setTimeout (VERY IMPORTANT)
Q5
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

✅ Output
A
D
C
B

📌 Explanation
Task Type	Priority
Sync	Highest
Promise (then)	Microtask
setTimeout	Macrotask

👉 Microtask always runs before Macrotask
______________________________
🧠 Level 6 – Promise inside setTimeout
Q6
setTimeout(() => {
  console.log("Timeout");

  Promise.resolve().then(() => {
    console.log("Promise");
  });
}, 0);

console.log("End");

✅ Output
End
Timeout
Promise

📌 Explanation

Promise runs immediately after its macrotask finishes
______________________________
🧠 Level 7 – setInterval + setTimeout mix
Q7
let i = 1;

const interval = setInterval(() => {
  console.log("Interval:", i++);
}, 100);

setTimeout(() => {
  clearInterval(interval);
  console.log("Stopped");
}, 350);

✅ Output
Interval: 1
Interval: 2
Interval: 3
Stopped

📌 Explanation

Interval runs every 100ms

Cleared at 350ms
_____________________________
🧠 Level 8 – Closure + setTimeout (INTERVIEW FAVORITE)
Q8
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

✅ Output
3
3
3

📌 Explanation

var has function scope

All callbacks share same i

✔ Fix using let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}


✅ Output

0
1
2
________________________________
🧠 Level 9 – Promise chain + timeout
Q9
setTimeout(() => console.log("Timeout"), 0);

Promise.resolve()
  .then(() => console.log("P1"))
  .then(() => console.log("P2"));

console.log("End");

✅ Output
End
P1
P2
Timeout
________________________________
🧠 Level 10 – EXTREMELY TRICKY (1+ Year Level)
Q10
console.log("Start");

setTimeout(() => {
  console.log("Timeout");

  Promise.resolve().then(() => {
    console.log("Promise inside Timeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

console.log("End");

✅ Output
Start
End
Promise 1
Timeout
Promise inside Timeout

🔥 Interview One-Line Rule (MUST REMEMBER)

Execution Order

Synchronous
→ Microtasks (Promise.then)
→ Macrotasks (setTimeout / setInterval)
_______________________________
😵‍💫 Q11 – setTimeout inside Promise
Promise.resolve().then(() => {
  setTimeout(() => console.log("A"), 0);
  console.log("B");
});

console.log("C");

✅ Output
C
B
A

🧠 Reason

Promise.then → microtask

setTimeout → macrotask (waits)
______________________________
😵‍💫 Q12 – Promise inside Promise
Promise.resolve().then(() => {
  console.log(1);

  Promise.resolve().then(() => {
    console.log(2);
  });
});

Promise.resolve().then(() => {
  console.log(3);
});

✅ Output
1
3
2

🧠 Reason

Microtasks are queued FIFO

Inner Promise waits until current microtask finishes
____________________________
😵‍💫 Q13 – async / await ULTA flow
async function test() {
  console.log("A");
  await Promise.resolve();
  console.log("B");
}

console.log("C");
test();
console.log("D");

✅ Output
C
A
D
B

🧠 Reason

await breaks function and schedules remaining code as microtask
______________________________
😵‍💫 Q14 – await + setTimeout
async function demo() {
  console.log(1);

  setTimeout(() => console.log(2), 0);

  await Promise.resolve();
  console.log(3);
}

demo();
console.log(4);

✅ Output
1
4
3
2
________________________________
😵‍💫 Q15 – setInterval + heavy sync block
setInterval(() => {
  console.log("Interval");
}, 100);

for (let i = 0; i < 1e9; i++) {}

console.log("End");

✅ Output
End
Interval
Interval
...

🧠 Reason

Blocking synchronous code delays async tasks

Event loop waits for call stack to clear

😵‍💫 Q16 – Promise vs async function
async function foo() {
  console.log("foo");
}

Promise.resolve().then(() => console.log("promise"));

foo();

console.log("end");

✅ Output
foo
end
promise

🧠 Reason

async function executes synchronously until await

Promise .then is microtask

😵‍💫 Q17 – Nested microtasks explosion
Promise.resolve().then(() => {
  console.log("A");

  Promise.resolve().then(() => {
    console.log("B");
  });
});

Promise.resolve().then(() => {
  console.log("C");
});

✅ Output
A
C
B

😵‍💫 Q18 – setTimeout chaining (ULTRA TRICK)
setTimeout(() => {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
}, 0);

setTimeout(() => {
  console.log(3);
}, 0);

✅ Output
1
3
2

🧠 Reason

Inner setTimeout goes to next macrotask cycle

😵‍💫 Q19 – Promise + setTimeout ordering
setTimeout(() => console.log("T1"), 0);

Promise.resolve().then(() => {
  console.log("P1");

  setTimeout(() => console.log("T2"), 0);
});

Promise.resolve().then(() => console.log("P2"));

✅ Output
P1
P2
T1
T2

😵‍💫 Q20 – async return vs then
async function test() {
  return "Hello";
}

test().then(console.log);

console.log("World");

✅ Output
World
Hello

🧠 Reason

async always returns a Promise

.then runs as microtask

🔥 SUPER ULTA (MOST CONFUSING)
________________________
🤯 Q21 – await inside loop
async function run() {
  for (let i = 0; i < 3; i++) {
    await Promise.resolve();
    console.log(i);
  }
}

run();
console.log("Done");

✅ Output
Done
0
1
2
_________________________
🤯 Q22 – Promise recursion
Promise.resolve().then(function fn() {
  console.log("X");
  Promise.resolve().then(fn);
});

✅ Output
X
X
X
X
...

🧠 Reason

Infinite microtask queue → browser freeze risk
__________________________
🤯 Q23 – var + async combo
for (var i = 0; i < 3; i++) {
  Promise.resolve().then(() => console.log(i));
}

✅ Output
3
3
3
__________________________
🤯 Q24 – let + async combo
for (let i = 0; i < 3; i++) {
  Promise.resolve().then(() => console.log(i));
}

✅ Output
0
1
2

🧠 GOLDEN INTERVIEW LINE (MEMORIZE THIS)

JavaScript executes code in this order:

Call Stack (Sync)
→ Microtask Queue (Promise, await)
→ Macrotask Queue (setTimeout, setInterval

______________________
import { useEffect, useState } from "react";

function App() {
  const [fruit, setFruit] = useState("mango");

  useEffect(() => {
    console.log("1️⃣ Sync log:", fruit);

    setFruit("apple");

    console.log("2️⃣ After setState:", fruit);

    setTimeout(() => {
      setFruit("banana");
      console.log("3️⃣ Inside setTimeout:", fruit);
    }, 0);
  }, []);

  console.log("4️⃣ Render:", fruit);

  return <h1>{fruit}</h1>;
}

export default App;


Output:
4️⃣ Render: mango
1️⃣ Sync log: mango
2️⃣ After setState: mango
3️⃣ Inside setTimeout: mango
4️⃣ Render: apple
4️⃣ Render: banana
_____________________

Array Ultra Interview 


😵‍💫 Q1 – map vs forEach (MOST COMMON TRAP)
const arr = [1, 2, 3];

const a = arr.map(x => x * 2);
const b = arr.forEach(x => x * 2);

console.log(a);
console.log(b);

✅ Output
[2, 4, 6]
undefined


🧠 Reason

map → returns new array

forEach → returns undefined

😵‍💫 Q2 – filter truthy/falsy confusion
const arr = [0, 1, false, 2, "", 3];

const result = arr.filter(Boolean);
console.log(result);

✅ Output
[1, 2, 3]


🧠 Reason
Falsy values removed: 0, false, "", null, undefined, NaN

😵‍💫 Q3 – splice vs slice (INTERVIEW FAVORITE)
const arr = [1, 2, 3, 4, 5];

const a = arr.slice(1, 3);
const b = arr.splice(1, 3);

console.log(a);
console.log(b);
console.log(arr);

✅ Output
[2, 3]
[2, 3, 4]
[1, 5]


🧠 Reason

slice → non-mutating

splice → mutates original array

😵‍💫 Q4 – reduce with string + number
const arr = [1, "2", 3];

const result = arr.reduce((acc, cur) => acc + cur, 0);
console.log(result);

✅ Output
0123


🧠 Reason

0 + 1 = 1

1 + "2" = "12"

"12" + 3 = "123"

😵‍💫 Q5 – sort trap (NUMBERS)
const arr = [10, 2, 5, 1];

arr.sort();
console.log(arr);

✅ Output
[1, 10, 2, 5]


🧠 Reason
Default sort() converts to string.

✔ Correct way
arr.sort((a, b) => a - b);

😵‍💫 Q6 – reference vs copy
const a = [1, 2];
const b = a;

b.push(3);

console.log(a);
console.log(b);

✅ Output
[1, 2, 3]
[1, 2, 3]


🧠 Reason
Arrays are reference types

😵‍💫 Q7 – spread operator shallow copy
const a = [{ x: 1 }];
const b = [...a];

b[0].x = 5;

console.log(a);
console.log(b);

✅ Output
[{ x: 5 }]
[{ x: 5 }]


🧠 Reason
Spread makes shallow copy, inner objects still shared.

😵‍💫 Q8 – length manipulation
const arr = [1, 2, 3];
arr.length = 1;

console.log(arr);

✅ Output
[1]


🧠 Reason
Changing length truncates array.

😵‍💫 Q9 – delete vs splice
const arr = [1, 2, 3];

delete arr[1];

console.log(arr);
console.log(arr.length);

✅ Output
[1, <empty>, 3]
3


🧠 Reason
delete removes value but keeps index

😵‍💫 Q10 – includes vs indexOf (NaN TRAP)
const arr = [NaN, 1, 2];

console.log(arr.includes(NaN));
console.log(arr.indexOf(NaN));

✅ Output
true
-1


🧠 Reason

includes uses SameValueZero

indexOf fails for NaN

😵‍💫 Q11 – map + parseInt TRAP (VERY COMMON)
const arr = ["10", "20", "30"];

const result = arr.map(parseInt);
console.log(result);

✅ Output
[10, NaN, NaN]


🧠 Reason
parseInt(value, index)
→ radix becomes 1, 2, 3

😵‍💫 Q12 – reduce without initial value
const arr = [1, 2, 3];

const result = arr.reduce((a, b) => a + b);
console.log(result);

✅ Output
6


🧠 Reason

First element becomes accumulator

😵‍💫 Q13 – empty array reduce
[].reduce((a, b) => a + b);

✅ Output
TypeError


🧠 Reason
Reduce needs initial value if array is empty.

😵‍💫 Q14 – find vs filter
const arr = [1, 2, 3, 4];

console.log(arr.find(x => x > 2));
console.log(arr.filter(x => x > 2));

✅ Output
3
[3, 4]

😵‍💫 Q15 – flat depth confusion
const arr = [1, [2, [3, [4]]]];

console.log(arr.flat(2));

✅ Output
[1, 2, 3, [4]]

🧠 GOLDEN ARRAY INTERVIEW RULES
map → returns new array
forEach → returns undefined
splice → mutates
slice → non-mutating
sort → string based by default
spread → shallow copy

🎯 WANT NEXT?

I can:

📘 Make PDF of these array questions

🔥 Add React + array state trick questions

🧪 Add output + debugging mixed

🎤 Give interview explanation scripts

Just say PDF or MORE HARD 🔥

give me more questions

🔥 ULTRA-TRICKY ARRAY OUTPUT QUESTIONS (1-YEAR EXP – PART-2) 🔥
Below are MORE interview-level array output-based questions that test concept clarity, not memory.

I’ll keep them ulta-tricky, practical, and frequently asked.

🤯 Q16 – push returns WHAT?
const arr = [1, 2, 3];

const x = arr.push(4);

console.log(x);
console.log(arr);

✅ Output
4
[1, 2, 3, 4]


🧠 Reason
push() returns new length, not array.

🤯 Q17 – unshift return value
const arr = [2, 3];

const x = arr.unshift(1);

console.log(x);
console.log(arr);

✅ Output
3
[1, 2, 3]

🤯 Q18 – pop vs shift
const arr = [1, 2, 3];

console.log(arr.pop());
console.log(arr.shift());
console.log(arr);

✅ Output
3
1
[2]

🤯 Q19 – concat does NOT mutate
const a = [1, 2];
const b = [3, 4];

const c = a.concat(b);

console.log(a);
console.log(c);

✅ Output
[1, 2]
[1, 2, 3, 4]

🤯 Q20 – reverse mutates array
const arr = [1, 2, 3];

const x = arr.reverse();

console.log(arr);
console.log(x);

✅ Output
[3, 2, 1]
[3, 2, 1]


🧠 Reason
reverse() mutates original array.

🤯 Q21 – fill overwrites everything
const arr = [1, 2, 3, 4];

arr.fill(0, 1, 3);

console.log(arr);

✅ Output
[1, 0, 0, 4]

🤯 Q22 – copyWithin (RARE INTERVIEW)
const arr = [1, 2, 3, 4, 5];

arr.copyWithin(1, 3);

console.log(arr);

✅ Output
[1, 4, 5, 4, 5]

🤯 Q23 – some vs every
const arr = [1, 2, 3];

console.log(arr.some(x => x > 2));
console.log(arr.every(x => x > 2));

✅ Output
true
false

🤯 Q24 – findIndex
const arr = [5, 10, 15];

console.log(arr.findIndex(x => x > 8));

✅ Output
1

🤯 Q25 – sparse array behavior
const arr = [1, , 3];

console.log(arr.length);
console.log(arr.map(x => x * 2));

✅ Output
3
[2, <empty>, 6]

🤯 Q26 – filter skips empty slots
const arr = [1, , 3];

console.log(arr.filter(Boolean));

✅ Output
[1, 3]

🤯 Q27 – reduce + sparse array
const arr = [1, , 3];

const sum = arr.reduce((a, b) => a + b, 0);
console.log(sum);

✅ Output
4


🧠 Reason
Empty slots are skipped in reduce.

🤯 Q28 – Array constructor confusion
const a = new Array(3);
const b = Array(3);

console.log(a.length);
console.log(b.length);

✅ Output
3
3


⚠️ But both are empty slots, not [undefined].

🤯 Q29 – Array.of vs Array
console.log(Array(3));
console.log(Array.of(3));

✅ Output
[ <3 empty items> ]
[3]

🤯 Q30 – destructuring with default
const [a, b = 2] = [1];

console.log(a, b);

✅ Output
1 2

🤯 Q31 – flatMap vs map
const arr = [1, 2, 3];

console.log(arr.map(x => [x * 2]));
console.log(arr.flatMap(x => [x * 2]));

✅ Output
[[2], [4], [6]]
[2, 4, 6]

🤯 Q32 – join with undefined
const arr = [1, undefined, 3];

console.log(arr.join("-"));

✅ Output
1--3

🤯 Q33 – indexOf vs lastIndexOf
const arr = [1, 2, 3, 2];

console.log(arr.indexOf(2));
console.log(arr.lastIndexOf(2));

✅ Output
1
3

🧠 ULTRA IMPORTANT INTERVIEW RULES (MEMORIZE)
push / unshift → return length
pop / shift → return removed element
concat → non-mutating
reverse / sort / splice → mutating
flatMap = map + flat(1)
______________________
Based on Confusion based Array addition and Subtraction Code string

😵‍💫 Q1 – Number + String domino effect
const arr = [1, "2", 3];

const result = arr.reduce((a, b) => a + b);
console.log(result);

✅ Output
123


🧠 WHY

1 + "2" = "12"
"12" + 3 = "123"


Once string enters ➜ everything becomes string

😵‍💫 Q2 – Initial value changes everything
const arr = [1, "2", 3];

const result = arr.reduce((a, b) => a + b, 0);
console.log(result);

✅ Output
0123


🧠 WHY

0 + 1 = 1
1 + "2" = "12"
"12" + 3 = "123"

😵‍💫 Q3 – Subtraction ignores strings 😱
const arr = [10, "5", 2];

const result = arr.reduce((a, b) => a - b);
console.log(result);

✅ Output
3


🧠 WHY

10 - "5" = 5
5 - 2 = 3


👉 - forces number conversion

😵‍💫 Q4 – + vs - (INTERVIEW FAVORITE)
console.log("5" + 3 - 1);

✅ Output
52


🧠 WHY

"5" + 3 = "53"
"53" - 1 = 52

😵‍💫 Q5 – reduce with mixed operators
const arr = ["10", 5, 2];

const result = arr.reduce((a, b) => a - b);
console.log(result);

✅ Output
3


🧠 WHY

"10" - 5 = 5
5 - 2 = 3

😵‍💫 Q6 – reduce with + and explicit Number
const arr = [1, "2", "3"];

const result = arr.reduce((a, b) => a + Number(b), 0);
console.log(result);

✅ Output
6


🧠 WHY
All values converted to numbers before addition.

😵‍💫 Q7 – array of strings subtraction
const arr = ["10", "2", "3"];

const result = arr.reduce((a, b) => a - b);
console.log(result);

✅ Output
5


🧠 WHY

"10" - "2" = 8
8 - "3" = 5

😵‍💫 Q8 – map + reduce confusion
const arr = [1, "2", 3];

const result = arr
  .map(x => x + 1)
  .reduce((a, b) => a + b);

console.log(result);

✅ Output
2231


🧠 WHY

map → [2, "21", 4]
reduce → 2 + "21" = "221"
"221" + 4 = "2214" ❌


⚠️ If interviewer asks ➜ string pollution

😵‍💫 Q9 – subtraction inside map
const arr = ["5", 3, "2"];

const result = arr.map(x => x - 1);
console.log(result);

✅ Output
[4, 2, 1]


🧠 WHY
- always converts to number

😵‍💫 Q10 – confusing reduce + empty string
const arr = [1, 2, 3];

const result = arr.reduce((a, b) => a + b, "");
console.log(result);

✅ Output
123


🧠 WHY

"" + 1 = "1"
"1" + 2 = "12"
"12" + 3 = "123"

😵‍💫 Q11 – parseInt trap inside reduce
const arr = ["10", "20", "30"];

const result = arr.reduce((a, b) => a + parseInt(b), 0);
console.log(result);

✅ Output
60


✔ Correct approach
But ❌ map(parseInt) is dangerous (radix issue).

😵‍💫 Q12 – subtraction with undefined
const arr = [10, undefined, 2];

const result = arr.reduce((a, b) => a - b);
console.log(result);

✅ Output
NaN


🧠 WHY

10 - undefined = NaN

😵‍💫 Q13 – filter then add
const arr = [1, "2", null, 3];

const result = arr
  .filter(Boolean)
  .reduce((a, b) => a + b);

console.log(result);

✅ Output
123


🧠 WHY

filter → [1, "2", 3]
string pollution again

😵‍💫 Q14 – subtraction ignores pollution
const arr = [1, "2", 3];

const result = arr.reduce((a, b) => a - b);
console.log(result);

✅ Output
-4


🧠 WHY

1 - "2" = -1
-1 - 3 = -4

😵‍💫 Q15 – tricky unary plus FIX
const arr = [1, "2", "3"];

const result = arr.reduce((a, b) => a + +b, 0);
console.log(result);

✅ Output
6


🧠 WHY
+b → converts string to number