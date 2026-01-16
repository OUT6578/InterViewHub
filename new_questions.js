    {
      id: 139,
      category: "operators",
      level: "Q1 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q1",
      code: `const arr = [1, 2, 3, 4];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `10`,
      explanation: `Check output for details.`,
    },
    {
      id: 140,
      category: "operators",
      level: "Q2 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q2",
      code: `const arr = ["1", "2", "3"];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"0123"`,
      explanation: `(string concatenation)`,
    },
    {
      id: 141,
      category: "operators",
      level: "Q3 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q3",
      code: `const arr = ["1", "2", "3"];
let sum = 0;
for (let i of arr) sum += Number(i);
console.log(sum);`,
      output: `6`,
      explanation: `Check output for details.`,
    },
    {
      id: 142,
      category: "operators",
      level: "Q4 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q4",
      code: `const arr = [1, "2", 3];
let sum = 0;
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"123"`,
      explanation: `(1 + "2" → "12", "12" + 3 → "123")`,
    },
    {
      id: 143,
      category: "operators",
      level: "Q5 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q5",
      code: `const arr = [1, "2", "3"];
let sum = "";
for (let i of arr) sum += i;
console.log(sum);`,
      output: `"123"`,
      explanation: `Check output for details.`,
    },
    {
      id: 144,
      category: "operators",
      level: "Q6 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q6",
      code: `const arr = [1, "2", "3"];
let sum = 0;
for (let i of arr) sum = sum + i;
console.log(sum);`,
      output: `"123"`,
      explanation: `Check output for details.`,
    },
    {
      id: 145,
      category: "operators",
      level: "Q7 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q7",
      code: `const arr = [10, "20", 30];
let sum = 0;
arr.forEach(v => sum += v);
console.log(sum);`,
      output: `"102030"`,
      explanation: `Check output for details.`,
    },
    {
      id: 146,
      category: "operators",
      level: "Q8 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q8",
      code: `const arr = [10, "20", 30];
let sum = 0;
arr.forEach(v => sum += Number(v));
console.log(sum);`,
      output: `60`,
      explanation: `Check output for details.`,
    },
    {
      id: 147,
      category: "operators",
      level: "Q9 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q9",
      code: `const arr = ["a", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"0a12"`,
      explanation: `Check output for details.`,
    },
    {
      id: 148,
      category: "operators",
      level: "Q10 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q10",
      code: `const arr = ["5", 5, "5"];
let sum = 0;
for (let v of arr) sum = sum + v;
console.log(sum);`,
      output: `"0555"`,
      explanation: `Check output for details.`,
    },
    {
      id: 149,
      category: "operators",
      level: "Q11 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q11",
      code: `const arr = ["10", "20", 30];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"102030"`,
      explanation: `Check output for details.`,
    },
    {
      id: 150,
      category: "operators",
      level: "Q12 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q12",
      code: `const arr = ["10", "20", 30];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `60`,
      explanation: `Check output for details.`,
    },
    {
      id: 151,
      category: "operators",
      level: "Q13 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q13",
      code: `const arr = [1, 2, "3"];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"33"`,
      explanation: `Check output for details.`,
    },
    {
      id: 152,
      category: "operators",
      level: "Q14 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q14",
      code: `const arr = [1, 2, "3"];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `6`,
      explanation: `Check output for details.`,
    },
    {
      id: 153,
      category: "operators",
      level: "Q15 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q15",
      code: `const arr = [1, "a", 2];
let sum = 0;
for (let v of arr) sum += Number(v);
console.log(sum);`,
      output: `NaN`,
      explanation: `Check output for details.`,
    },
    {
      id: 154,
      category: "operators",
      level: "Q16 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q16",
      code: `const arr = ["1", "a", "2"];
let sum = "";
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"1a2"`,
      explanation: `Check output for details.`,
    },
    {
      id: 155,
      category: "operators",
      level: "Q17 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q17",
      code: `const arr = ["1", "a", "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01a2"`,
      explanation: `Check output for details.`,
    },
    {
      id: 156,
      category: "operators",
      level: "Q18 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q18",
      code: `const arr = [true, 1, "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"12"`,
      explanation: `(true → 1, 1+1=2, "2" concat)`,
    },
    {
      id: 157,
      category: "operators",
      level: "Q19 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q19",
      code: `const arr = [false, "1", 1];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01"`,
      explanation: `(false → 0)`,
    },
    {
      id: 158,
      category: "operators",
      level: "Q20 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q20",
      code: `const arr = [null, "1", 1];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"01"`,
      explanation: `Check output for details.`,
    },
    {
      id: 159,
      category: "operators",
      level: "Q21 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q21",
      code: `const arr = [undefined, 1, "2"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `NaN`,
      explanation: `Check output for details.`,
    },
    {
      id: 160,
      category: "operators",
      level: "Q22 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q22",
      code: `const arr = ["", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"012"`,
      explanation: `Check output for details.`,
    },
    {
      id: 161,
      category: "operators",
      level: "Q23 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q23",
      code: `const arr = [" ", 1, 2];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"0 12"`,
      explanation: `Check output for details.`,
    },
    {
      id: 162,
      category: "operators",
      level: "Q24 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q24",
      code: `const arr = ["10px", 20];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"010px20"`,
      explanation: `Check output for details.`,
    },
    {
      id: 163,
      category: "operators",
      level: "Q25 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q25",
      code: `const arr = ["10px", 20];
let sum = 0;
for (let v of arr) sum += parseInt(v);
console.log(sum);`,
      output: `30`,
      explanation: `Check output for details.`,
    },
    {
      id: 164,
      category: "operators",
      level: "Q26 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q26",
      code: `const arr = ["10.5", 1.5];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"10.51.5"`,
      explanation: `Check output for details.`,
    },
    {
      id: 165,
      category: "operators",
      level: "Q27 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q27",
      code: `const arr = ["10.5", 1.5];
console.log(arr.reduce((a,b)=>Number(a)+Number(b)));`,
      output: `12`,
      explanation: `Check output for details.`,
    },
    {
      id: 166,
      category: "operators",
      level: "Q28 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q28",
      code: `const arr = [1, "2", true, "3"];
let sum = 0;
for (let v of arr) sum += v;
console.log(sum);`,
      output: `"12true3"`,
      explanation: `Check output for details.`,
    },
    {
      id: 167,
      category: "operators",
      level: "Q29 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q29",
      code: `const arr = [1, "2", true, "3"];
let sum = 0;
for (let v of arr) sum += Number(v);
console.log(sum);`,
      output: `NaN`,
      explanation: `Check output for details.`,
    },
    {
      id: 168,
      category: "operators",
      level: "Q30 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q30",
      code: `const arr = ["5", 5, null];
console.log(arr.reduce((a,b)=>a+b));`,
      output: `"550"`,
      explanation: `+ with string → concatenation
Any string in chain → result string ban jata hai
Number("abc") → NaN
true → 1, false → 0
null → 0, undefined → NaN
reduce ka first value type decide karta hai output
I have number inside like 12+"23+34"+64+234+34 like that kind of senario based 20 and operator based give me some questions 20 more question with reasons`,
    },
    {
      id: 169,
      category: "operators",
      level: "Q1 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q1",
      code: `console.log(12 + "23" + 34);`,
      output: `"122334"`,
      explanation: `12 + "23" → "1223" (string), then +"34" → "122334"`,
    },
    {
      id: 170,
      category: "operators",
      level: "Q2 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q2",
      code: `console.log("12" + 23 + 34);`,
      output: `"122334"`,
      explanation: `Starts with string → all concatenation`,
    },
    {
      id: 171,
      category: "operators",
      level: "Q3 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q3",
      code: `console.log(12 + 23 + "34");`,
      output: `"3534"`,
      explanation: `12+23=35, then "35"+"34"`,
    },
    {
      id: 172,
      category: "operators",
      level: "Q4 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q4",
      code: `console.log(12 + "23" + 34 + 5);`,
      output: `"122345"`,
      explanation: `Once string starts, all after concat`,
    },
    {
      id: 173,
      category: "operators",
      level: "Q5 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q5",
      code: `console.log(12 + ("23" + 34));`,
      output: `"122334"`,
      explanation: `Brackets first: "23"+34="2334", then 12+"2334"`,
    },
    {
      id: 174,
      category: "operators",
      level: "Q6 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q6",
      code: `console.log((12 + "23") + 34);`,
      output: `"122334"`,
      explanation: `Check output for details.`,
    },
    {
      id: 175,
      category: "operators",
      level: "Q7 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q7",
      code: `console.log("12" + (23 + 34));`,
      output: `"1257"`,
      explanation: `Brackets: 23+34=57, then "12"+"57"`,
    },
    {
      id: 176,
      category: "operators",
      level: "Q8 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q8",
      code: `console.log(12 + "23+34" + 64);`,
      output: `"1223+3464"`,
      explanation: `"23+34" is string literal, not math`,
    },
    {
      id: 177,
      category: "operators",
      level: "Q9 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q9",
      code: `console.log(12 + +"23" + 34);`,
      output: `69`,
      explanation: `+"23" → 23, so 12+23+34`,
    },
    {
      id: 178,
      category: "operators",
      level: "Q10 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q10",
      code: `console.log(12 + -"23" + 34);`,
      output: `23`,
      explanation: `-"23" → -23, so 12-23+34`,
    },
    {
      id: 179,
      category: "operators",
      level: "Q11 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q11",
      code: `console.log(12 + "23" - 5);`,
      output: `1218`,
      explanation: `12+"23"="1223", then "1223"-5 → number`,
    },
    {
      id: 180,
      category: "operators",
      level: "Q12 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q12",
      code: `console.log("12" - 2 + 3);`,
      output: `13`,
      explanation: `"12"-2=10, then 10+3`,
    },
    {
      id: 181,
      category: "operators",
      level: "Q13 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q13",
      code: `console.log("12" + 2 - 3);`,
      output: `119`,
      explanation: `"12"+2="122", then "122"-3=119`,
    },
    {
      id: 182,
      category: "operators",
      level: "Q14 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q14",
      code: `console.log(12 + true + "3");`,
      output: `"133"`,
      explanation: `true →1, 12+1=13, then "13"+"3"`,
    },
    {
      id: 183,
      category: "operators",
      level: "Q15 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q15",
      code: `console.log(12 + false + "3");`,
      output: `"123"`,
      explanation: `false →0`,
    },
    {
      id: 184,
      category: "operators",
      level: "Q16 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q16",
      code: `console.log("12" + true + 3);`,
      output: `"12true3"`,
      explanation: `string starts → concat only`,
    },
    {
      id: 185,
      category: "operators",
      level: "Q17 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q17",
      code: `console.log(12 + null + "3");`,
      output: `"123"`,
      explanation: `null →0`,
    },
    {
      id: 186,
      category: "operators",
      level: "Q18 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q18",
      code: `console.log(12 + undefined + "3");`,
      output: `"NaN3"`,
      explanation: `12+undefined = NaN`,
    },
    {
      id: 187,
      category: "operators",
      level: "Q19 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q19",
      code: `console.log("12" + null + 3);`,
      output: `"12null3"`,
      explanation: `Check output for details.`,
    },
    {
      id: 188,
      category: "operators",
      level: "Q20 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q20",
      code: `console.log(12 + "23" + +"34");`,
      output: `"122334"`,
      explanation: `+"34" →34 but string already started
Golden Rule
+ with string → concat
Once string comes → chain becomes string
- * / → always numeric conversion
+"23" → convert to number
true=1, false=0, null=0, undefined=NaN
more 20 question with resons`,
    },
    {
      id: 189,
      category: "operators",
      level: "Q1 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q1",
      code: `console.log(5 + "5" + 5);`,
      output: `"555"`,
      explanation: `5+"5" → "55", then +"5" → "555"`,
    },
    {
      id: 190,
      category: "operators",
      level: "Q2 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q2",
      code: `console.log(5 + 5 + "5");`,
      output: `"105"`,
      explanation: `5+5=10, then "10"+"5"`,
    },
    {
      id: 191,
      category: "operators",
      level: "Q3 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q3",
      code: `console.log("5" + 5 + 5);`,
      output: `"555"`,
      explanation: `Starts with string → all concat`,
    },
    {
      id: 192,
      category: "operators",
      level: "Q4 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q4",
      code: `console.log(5 + ("5" + 5));`,
      output: `"555"`,
      explanation: `Brackets first: "5"+5="55", then 5+"55"`,
    },
    {
      id: 193,
      category: "operators",
      level: "Q5 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q5",
      code: `console.log((5 + "5") + 5);`,
      output: `"555"`,
      explanation: `Check output for details.`,
    },
    {
      id: 194,
      category: "operators",
      level: "Q6 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q6",
      code: `console.log("5" + (5 + 5));`,
      output: `"510"`,
      explanation: `Brackets: 5+5=10, then "5"+"10"`,
    },
    {
      id: 195,
      category: "operators",
      level: "Q7 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q7",
      code: `console.log(5 + +"5" + 5);`,
      output: `15`,
      explanation: `+"5" →5, so 5+5+5`,
    },
    {
      id: 196,
      category: "operators",
      level: "Q8 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q8",
      code: `console.log(5 + -"5" + 5);`,
      output: `5`,
      explanation: `-"5" → -5, so 5-5+5`,
    },
    {
      id: 197,
      category: "operators",
      level: "Q9 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q9",
      code: `console.log("5" - 2 + 3);`,
      output: `6`,
      explanation: `"5"-2=3, then 3+3`,
    },
    {
      id: 198,
      category: "operators",
      level: "Q10 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q10",
      code: `console.log("5" + 2 - 3);`,
      output: `49`,
      explanation: `"5"+2="52", then 52-3`,
    },
    {
      id: 199,
      category: "operators",
      level: "Q11 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q11",
      code: `console.log(5 + true + "5");`,
      output: `"115"`,
      explanation: `true→1, 5+1=6, "6"+"5"`,
    },
    {
      id: 200,
      category: "operators",
      level: "Q12 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q12",
      code: `console.log(5 + false + "5");`,
      output: `"55"`,
      explanation: `false→0`,
    },
    {
      id: 201,
      category: "operators",
      level: "Q13 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q13",
      code: `console.log("5" + true + 5);`,
      output: `"5true5"`,
      explanation: `Check output for details.`,
    },
    {
      id: 202,
      category: "operators",
      level: "Q14 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q14",
      code: `console.log(5 + null + "5");`,
      output: `"55"`,
      explanation: `null→0`,
    },
    {
      id: 203,
      category: "operators",
      level: "Q15 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q15",
      code: `console.log(5 + undefined + "5");`,
      output: `"NaN5"`,
      explanation: `5+undefined=NaN`,
    },
    {
      id: 204,
      category: "operators",
      level: "Q16 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q16",
      code: `console.log("5" + null + 5);`,
      output: `"5null5"`,
      explanation: `Check output for details.`,
    },
    {
      id: 205,
      category: "operators",
      level: "Q17 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q17",
      code: `console.log("5" + undefined + 5);`,
      output: `"5undefined5"`,
      explanation: `Check output for details.`,
    },
    {
      id: 206,
      category: "operators",
      level: "Q18 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q18",
      code: `console.log(5 + "5" - 2);`,
      output: `53`,
      explanation: `5+"5"="55", then 55-2`,
    },
    {
      id: 207,
      category: "operators",
      level: "Q19 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q19",
      code: `console.log("5" + 5 - "2");`,
      output: `53`,
      explanation: `"5"+5="55", then 55-"2"`,
    },
    {
      id: 208,
      category: "operators",
      level: "Q20 (Coercion)",
      difficulty: "Medium",
      question: "Operator Output Q20",
      code: `console.log(5 + "5" + +"5");`,
      output: `"555"`,
      explanation: `+"5" →5 but string already started`,
    },
