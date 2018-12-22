import { observable, reaction, computed, autorun } from 'mobx';

const calculator = observable({
    a: 1,
    b: 2
});

reaction(
    () => calculator.a,
    (value, reaction) => {
        console.log(`a 값이 ${value} 로 바뀌었네요!`);
    }
);

reaction(
    () => calculator.b,
    value => {
        console.log(`b 값이 ${value} 로 바뀌었네요!`);
    }
);

calculator.a = 10;
calculator.b = 20;

// **** computed 로 특정 값 캐싱
const sum = computed(() => {
    console.log('계산중이예요!');
    return calculator.a + calculator.b;
});

/*
sum.observe(() => calculator.a); // a 값을 주시
sum.observe(() => calculator.b); // b 값을 주시

calculator.a = 10;
calculator.b = 20;

//!**** 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log("sum.value 을 호출한다.");
console.log(sum.value);
console.log(sum.value);


// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 20;
console.log(sum.value);
*/

// **** autorun 은 함수 내에서 조회하는 값을 자동으로 주시함
autorun(() => console.log(`a 값이 ${calculator.a} 로 바뀌었네요!!`));
autorun(() => console.log(`b 값이 ${calculator.b} 로 바뀌었네요!!`));
autorun(() => sum.get()); // su

console.log('값이 변경1')
calculator.a = 10;
calculator.b = 20;

// 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
console.log(sum.value);
console.log(sum.value);
console.log('값이 변경2')
calculator.a = 20;

// 내부의 값이 바뀌면 다시 호출 함
console.log('내부의 값이 바뀌면 다시 호출 함')
console.log(sum.value);
