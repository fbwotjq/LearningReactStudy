import queryString from "../src/queryString";

const EMPTY_STRING = ''

describe('queryString', () => {

    test('array test', () => {
        expect(queryString({sort: ["a","b"]})).toBe("sort=a&sort=b")
    })

    test('null test', () => {
        expect(queryString({sort: null})).toBe(EMPTY_STRING)
    })

    test('null undefined', () => {
        expect(queryString({sort: undefined})).toBe(EMPTY_STRING)
    })

    test('"" test', () => {
        expect(queryString({sort: EMPTY_STRING})).toBe(EMPTY_STRING)
    })

    test('"  " test', () => {
        expect(queryString({sort: "  "})).toBe(EMPTY_STRING)
    })

    test('[] test', () => {
        expect(queryString({ a: [] })).toBe(EMPTY_STRING)
    })

    test('queryString 만들기가 잘 만들어지는지 확인', () => {
        const actualValue = { A: 'a', B: 'b', C: 'abc' };
        const expectValue = 'A=a&B=b&C=abc';
        const result = queryString(actualValue);
        expect(result).toEqual(expectValue);
    })

    test('null이 포함된 상태에서도 잘 제거되는지 확인', () => {
        const actualValue = {
            A: '',
            B: [],
            C: null,
            D: 'abc'
        };
        const expectValue = 'D=abc';
        const result = queryString(actualValue);
        expect(result).toEqual(expectValue);
    });

})