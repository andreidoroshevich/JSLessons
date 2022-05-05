console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9
function sum(value1: number) {
    return function (value2: number) {
        return value1 + value2;
    };
}

const sum1 = (value1: number) => (value2: number) => value1 + value2

console.log(sum(3)(6));

// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

function makeCounter() {
    let count = 0
    return function () {
        return ++count;
    };
}

// function makeCounter(count=0) {
//     return function () {
//         return ++count;
//     };
// }

let counter = makeCounter()
console.log(counter())       // should get result = 1
console.log(counter())       // should get result = 2

let counter2 = makeCounter()
console.log(counter2())      // should get result = 1
console.log(counter())       // should get result = 3


// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

function makeCounter2(startValue: number) {
    let currentCount = startValue;
    return {
        increase: function () {
            return ++currentCount;
        },

        decrease: function () {
            return --currentCount;
        },

        set: function (value: number) {
            currentCount = value;
        },

        reset: function () {
            currentCount = 0;
        }
    };
}

let counter3 = makeCounter2(5) // assign start value 5 to counter
console.log(counter3.increase())       // increased start value on 1, should get result = 6
console.log(counter3.increase())       // increased start value on 1, should get result = 7

let counter4 = makeCounter2(5) // assign start value 5 to counter
counter4.set(4)                   // set(change) start value to 4
console.log(counter4.decrease())       // decreased start value on 1, should get result = 3
console.log(counter4.decrease())       // decreased start value on 1, should get result = 2
counter4.reset()                       // reset(change) start value to 0
console.log(counter4.decrease())       // decreased start value on 1, should get result = -1

// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore


function superSum(num: number) {
    if (num = 0) return 0
    if (num = 1) return (num: number) => num
    let _arguments: number[] = []

    function helper(...args: number[]) {
        _arguments = [..._arguments, ...args]
        if (_arguments.length >= num) {
            _arguments.length = num
            return _arguments.reduce((acc, number) => acc + number)
        } else {
            return helper
        }
    }
    return helper
}


// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion

function sumTo(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function sumToRec(n: number): number {
    return n === 1 ? n : n + sumToRec(n - 1)
}

function sumToProgr(n: number): number {
    return n * (n + 1) / 2;
}

// function hvostovayaRecursion(n: number, acc: number) {
//     return n === 1 ? n + acc : hvostovayaRecursion(n - 1, acc + 1)
// }


console.log(sumTo(10));
console.log(sumToRec(10));
console.log(sumToProgr(10));


function factorial(n: number): number {
    return n === 1 ? n : n * factorial(n - 1)
}
console.log(factorial(5))


function fib(n: number): number {
    return n <= 1 ? n : fib(n - 1) + fib(n + 1)
}

function fib3(n: number): number {
    let n1 = 1
    let n2 = 1
    if (n===1) return n1
    if (n===2) return n2
    for (let i = 3; i <= n; i++) {
        let n3 = n1 + n2
        n1 = n2
        n2 = n3
    }
    return n2
}

console.log(fib3(7))


let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

function printList(list: any): any {
    let itemList = list

    while (itemList) {
        console.log(itemList.value)
        itemList = itemList.next
    }
}

printList(list)


function printListRecurs(list: any): any {
    console.log(list.value)
    if (list.next) {
        printListRecurs(list.next)
    }
}

printListRecurs(list)

// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.
// Метод flat(depth - возвращает новый массив,
// в котором все элементы вложенных подмассивов были рекурсивно "подняты" на указанный уровень depth.
//По умолчанию depth = 1, Infinity - убрать всювложенность. Метод flat удаляет пустые слоты из массива.
//
function customFlat(arr: Array<any>): Array<any> {
    return arr.reduce((acc, el) => {
        return Array.isArray(el) ? acc.concat(customFlat(el)) : [...acc, el]
    }, [])
}

let arr = [1, 2, 3, [4, 5, [6, 7]]]
console.log(customFlat(arr))        //should get result = [1,2,3,4,5,6,7]


// just a plug
export default () => {
};