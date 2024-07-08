# JavaScript Trivia
1. What is a potential pitfall with using `typeof bar === "object"` to determine if `bar` is an object? How can this pitfall be avoided?
* since `typeof` checks the type of the value in `bar`, bar could be null, an array, or any other data structure inheriting from Object, and still return true. One way to avoid this is with added validation to check if `bar` is null, or using `instanceof` to at least avoid returning true if bar contained `null`.

2. What will the code below output to the console and why?

```js
(function(){
  var a = b = 3;
})();

console.log("a defined? " + (typeof a !== 'undefined'));
console.log("b defined? " + (typeof b !== 'undefined'));
```
*  I think it will output `a defined? true` and `b defined? true`, because JS interprets the right side of the equal sign first.
    * Turns out that the output would actually indicate a as undefined and be as defined (b=3). I think JS still interprets the right side of the equal sign first, but that means it would first interpret `b = 3` followed by `var a = b`. Also, because `var` variables are hoisted, this means that a is declared before it is initialized. Since it is assigned a value in the function, `a` is scoped to the function but it's declaration is technically hoisted, and so outside of the function it is undefined.

3. What will the code below output to the console and why?
```js
var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func:  this.foo = " + this.foo);
        console.log("outer func:  self.foo = " + self.foo);
        (function() {
            console.log("inner func:  this.foo = " + this.foo);
            console.log("inner func:  self.foo = " + self.foo);
        }());
    }
};
myObject.func();
```
* I think it will output "bar" in either case (outer and inner func).
    * The real answer is that everything except `this.foo` in the inner function will return "bar". 
    * This is because in the outer function, the `this` context points to the `myObject` object, but in the inner function `this` loses no longer refers to the `this` of `myObject` while `self`, previously assigned to `this` in the outer scope, retains its assignment to the **myObject** `this`.

4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?
* I actually don't know why, but after reading the answer my understanding is that doing this utilizes closure behavior of JS functions in order to create a private namespace for the JS source file and help avoid names clashing. Additionally it makes the module or library easily referentiable through aliasing, like with jQuery.

5. What is the significance, and what are the benefits, of including `use strict` at the beginning of a JavaScript source file?
*  This tells JS to actively throw errors that would normally be silent.
    * It also prevents `this` coercion, disallows duplicate parameters in functions, prevents accidental globals, makes `eval()` safer, and throws errors when misusing `delete()`.

6. Consider the two functions below. Will they both return the same thing? Why or why not?
```js
function foo1()
{
  return {
      bar: "hello"
  };
}

function foo2()
{
  return
  {
      bar: "hello"
  };
}
```
* Due to JS's Automatic Semicolon Injection, JS implicitly inserts a semicolon before a new line. Thus `foo1()` will return an object with `bar: "hello"`, and `foo2()` will return undefined. Essentially, foo2 looks like:
    ```js
    //...
    return;
    {
        bar: "hello"
    };
    ```
\
7. What will the code below output? Explain your answer.
```js
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 == 0.3);
```
* I think it will output `0.3` and then `false`. The first one is straightforward, but the reason I think the second `console.log` will be false is because JS will interpret the equality check first, and then adding a number to a boolean I think returns a boolean.

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
```js
(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
})();
```

* I think the numbers will be logged in the following order: 1, 3, 4, 2
    * the real answer is: 1, 4, 3, 2. So I was right on the first and last number. The reason for this is that JS executes the "simpler" functions first. In this case, the `setTimeout` functions put 2 and 3 on an event queue, which although 3 has a delay of 0ms, this still gives it a very *slight* delay and allows 4 to log first.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.
```js
const isPalindrome = (string) => {
    return string == string.split('').reverse().join('') ? true : false;
}
```

10. Write a `sum` method which will work properly when invoked using either syntax below.
```js
console.log(sum(2,3));   // Outputs 5
console.log(sum(2)(3));  // Outputs 5
```
ans: 
```js
const sum = (a, b) => {
    if(b) return a + b;
    return function(b) {return a + b};
}
```

11. Consider the following code snippet:
```js
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```
(a) What gets logged to the console when the user clicks on “Button 4” and why?
* 5 will be logged

(b) Provide one or more alternate implementations that will work as expected.
* Because each `i` is declared as `var`, each instance of btn has a eventListener linked to a global `i`. To fix this, refactor `var` to `let` for `i`'s, and then `const` for each `btn`. This will block scope each btn's i.
```js
for (let i = 0; i < 5; i++) {
  const btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

12. Assuming d is an “empty” object in scope, say:
```js
var d = {};
```
…what is accomplished using the following code?
```js
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```
\
* I think that will instantiate properties in `d` for each element in the array, so something like:
```js
d = {
    zebra: undefined,
    horse: undefined
}
```
\
13. What will the code below output to the console and why?
```js
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```
\
* "array 1: length=4 last=n" and "array 2: length=6 last = ['n','h','o','j']"
    * Turns out, they will both return "array n: length=5 last = ['j','o','n','e','s']". This is because the `reverse()` array method reverses the array it's called on **in place**, while returning a *reference* to that array. Thus by assigning `arr2 = arr1.reverse()` we link the two arrays. Technically `arr2` is know pointing to `arr1`.

14. What will the code below output to the console and why?
```js
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```
* '122', '32', '2', '122', NaN, NaN
    * the real answer is '122', '32', '02', 'NaN2', NaN. JS implicitly does type conversion since it is loosely typed.

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
```js
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```
* refactor the if statement to pass `nextListItem()` as a callback to `setTimeout()` with 0 as the delay. This moves the execution of the recursive element from the call stack to the event queue, alleviating the load on the call stack while maintaining a recursive element. I definitely had to look at the answer for this one

16. What is a “closure” in JavaScript? Provide an example.
* Closure is the ability for a function to return another function that has access to variables scoped to the outer function but that are not accessible outside that function (i.e., "global"). This allows us to make variable "private". 
example:
```js
function outer() {
    let a = 1;
    return function inner() {
        a += 5;
        console.log("a is now", a);
    }
}

console.log("a is", a) //undefined
let inside = outer();
inside(); // "a is now 6"
```

17. What would the following lines of code output to the console?
```js
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```
* "0 || 1 = 1", "1 || 2 = 1", "0 && 1 = 0", "1 && 2 = 1";
    * These are all correct except the last, which is technically 2 (and technically still "true"). the OR (||) operator will test both expressions first and if either returns true, it will return true (1). && on the other hand will only return true (1) if BOTH are true, and for some quirky reason if the expression itself evaluates as true then that expression is returned (hence why "2" is returned in the last case). Confusing.

18. What will be the output when the following code is executed? Explain.
```js
console.log(false == '0')
console.log(false === '0')
```
* I think we will get "true" and then "false". I think the first equality check will convert the string "0" to the boolean value which I think is false. The second equality check is a deep check however which I think will check the type as well as the value. 

19. What is the output out of the following code? Explain your answer.
```js
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```
* I assume 123 will be logged to the console.
    * This is really weird, so according to the answer, JS will implicitly stringify parameter values. Since b and c are being assigned as parameters to object a, and both are objects as well, they get stringified to the value "[object Object]". Thus, a[b] and a[c] will point to the same "parameter", and assigning values to either is the same as assigning a value to `a["[object Object]"]`.

20. What will the following code output to the console: 
```js
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```
* The function is immediately invoked and runs (n * f(n-1)) recursively until n reaches 0. Hence it will run `(10*9*8*7*6*5*4*3*2*1)`, or the factorial `10!`

21. Consider the code snippet below. What will the console output be and why?
```js
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```
* this code should log `1` to the console

22. What will the following code output to the console and why:
```js
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
* The code will log the hero's secret identity in both cases, because `var stolenSecretIdentity` is a function that references the `getSecretIdentity` method of **hero**. 

Additionally, what is the issue with this code and how can we fix it?
* The issue is that the `_name` property of **hero** is syntactically a private variable, but JS doesn't trully have private variables, hence it can easily be accessed. To fix this, we could abstract it away in a closure. 
    * Turns out my understanding of this is backwards, and rather than displaying the stolen secret identity, the first console.log will return `undefined` because although it references the hero method `getSecretIdentity`, there is no binding the `this` context to hero. Instead, `this` as it pertains to `stoleSecretIdentity` will be global and reference `window`. To fix this, simply add `bind(hero)` to the previous var instantiation -> `var stolesecretIdentity = hero.getSecretIdentity.bind(hero)`.

23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

* a DOM element
* a callback function (that takes a DOM element as its argument)
```js
function visitAll(visit, element){
    visit(element);
    let list = element.children;
    for(let i = 0; i < list.length; i++){
        visitAll(visit, list[i]);
    }
}
```

24. Testing your `this` knowledge in JavaScript: What is the output of the following code?
```js
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```
* I think it will output 5 twice.
    * Oof. This is getting rough. The answer is actually 10 and 2, because `obj.method` runs `fn()` first and then `arguments[0]();`. The former I guess since it is passed as an argument retains the `this` context from when it is initially declared, which is the global `this` with the global `length` variable. when `arguments[0]()` runs it runs with the `this` context of `arguments`.

25. Consider the following code. What will the output be, and why?
```js
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```

* I think it will be "1" and then "undefined" twice. The first time console.log is called in the `catch` statement, where I think it overwrites the error object it was caught and assigned as. After that it should be scoped to the catch statement, and so x and y would be undefined outside of it. 
    * Close, the output will be `1 undefined 2`. This is because var statements hoist the declaration to the top of the global or function scope, but aren't initialized until their physical position in the code. Confusingly, the `x` inside the catch statement doesn't refer to the hoisted `x` but rather the `x`variable name that initially takes the Error object, and is reassigned as 1. Thus when we encounter console.log(x) outside, this x refers to the hoisted x, which is undefined on the global scope. `y` on the other hand does not have a inner variable in the catch statement, and thus when it is initialized in the catch statement this is the global `y` being assigned a value of 2. 

26. What will be the output of this code?
```js
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
* I think the output will be 21, the global value, because by the time console.log(x) is called inside the girl function, this is before the redeclaration of `var x = 20`.
    * Turns out the answer is `undefined`, which is because `var` hoisting raises the declaration to the top of the scope, blocks not withstanding.

27. What will the code output?
```js
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
* I think it will output 0,1,2,3,4, at 0, 1, 2, 3, 4 second increasing intervals. This behaves as expected due to the proper use of the `let` keyword

28. What do the following lines output, and why?
```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
* I think it will output true and true
    * Partially correct, JS compares left to right, and technically `true false` is output. This is because `true` has a value of 1, and so in the second console.log `3 > 2` evaluates to `true`, and `true > 1` evaluates to `1 > 1` which is false. 

29. How do you add an element at the beginning of an array? How do you add one at the end?
* `arr.unshift()` appends an element to the beginning, and `arr.push()` appends an element to the end. 
    * To be clever, you can also do these things with the spread operator `...`.

\
30. Imagine you have this code:
```js
var a = [1, 2, 3];
```
Will this result crash? `a[10] = 99`
* I don't believe it will crash, JS will insert about 7 empty entries until the 10th element, and then add 99 as the 10th element. 

What will this output? `console.log(a[6])`
* I think it will output `undefined`. 

\
31. What is the value of `typeof undefined == typeof NULL`?
* The value will be true, because only shallow equality is being checked.

32. What would following code return?
```js
console.log(typeof typeof 1);
```
* I think it will return string.

33. What will be the output of the following code:
```js
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
Explain your answer. How could the use of closures help here?
* It will output 5, 5, 5, 5, 5 because the for loop will finish before the first console.log(i), causing the `var i` to be reassigned to 5 by then. 
    * I think we can fix this by reinitializing `var i` inside the function to have it scoped to the function. 
    * The answer's suggestion for refactoring is better:
    ```js
    for (var i = 0; i < 5; i++) {
        (function(x) {
            setTimeout(function() { console.log(x); }, x * 1000 );
        })(i);
        }
    ```
    * Wrap the logic in a IIF, passing i for each loop iteration as x.

\
34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?
* NaN is "not a number", it happens when you try to evaluate a non-numeric as a number, or you have an expression where one of the operands is non-numeric. It's type is NaN, and I guess you could test it with `instanceof`.
    * Half-right. It turns out, the type of NaN is `Number`, strangely (and confusingly) enough. There is a built-in method `isNaN()` that kind of works, but better is to try `value !== value` which apparently only works if you have `NaN`. Also, in ES6, there's a more reliable Number method `Number.isNaN()`. 

\
35. What will the following code output and why?
```js
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```
* I think it will console.log 3, because at the time that `console.log(b)` is executed, b has been redeclared as 3. From the answers: "When a variable is invoked closures will be checked in order from local to global until an instance is found"

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer
* I'd start by converting x to a number, with something like `+x`, and then checking with `x % 2 === 0`. If true, then it must be an integer.
    * according to the answers, this is the most elegant solution: `function isInteger(x) { return (x ^ 0) === x; } `. Yeah that's pretty cool

\
37. How do you clone an object?
* I would try using a spread operator to spread the contents of one object into a new one, although this will only be a shallow copy. For a deep copy, you'd have to implement a recursion.
    * Here's a solution according to the answers, which produces a shallow copy using `Object.assign()`
    ```js
    var obj = {a: 1 ,b: 2}
    var objclone = Object.assign({},obj);
    ```