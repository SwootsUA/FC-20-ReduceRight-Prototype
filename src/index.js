'use strict';

function MyArray(...args) {
    this.length = 0;

    for (let i = 0; i < args.length; i++) {
        this.push(args[i]);
    }
}

MyArray.isMyArray = function (obj) {
    return obj instanceof MyArray;
};

MyArray.prototype = new MyArrayPrototype();

function MyArrayPrototype() {
    this.push = function () {
        if (arguments) {
            for (let i = 0; i < arguments.length; i++) {
                this[this.length++] = arguments[i];
            }
        }
        return this.length;
    };

    this.myReduce = function (callback, initialValue) {
        let accumulator;
        let startingIndex;

        if (arguments.length >= 2) {
            accumulator = initialValue;
            startingIndex = 0;
        } else {
            if (this.length === 0) {
                throw new TypeError(
                    'Reduce of empty array with no initial value'
                );
            }
            accumulator = this[0];
            startingIndex = 1;
        }

        for (let i = startingIndex; i < this.length; i++) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    };

    this.myReduceRight = function (callback, initialValue) {
        let accumulator;
        let startingIndex;

        if (arguments.length >= 2) {
            accumulator = initialValue;
            startingIndex = this.length - 1;
        } else {
            if (this.length === 0) {
                throw new TypeError(
                    'Reduce of empty array with no initial value'
                );
            }
            accumulator = this[this.length - 1];
            startingIndex = this.length - 2;
        }

        for (let i = startingIndex; i >= 0; i--) {
            accumulator = callback(accumulator, this[i], i, this);
        }
        return accumulator;
    };
}

const myArrayObj = new MyArray(1, 2, 3, 4, 5);

const rightSum = myArrayObj.myReduceRight((accumulator, item) => {
    console.log(`accumulator: ${accumulator}, item: ${item}`);
    return accumulator + item;
});

console.log(`Final sum: ${rightSum}`);
