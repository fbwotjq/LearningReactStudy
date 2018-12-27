import mustReturnTrue from "../src/mustReturnTrue";

describe('MustReturnTrue', () => {

    test('default', () => {
        expect(mustReturnTrue()).toBe(true)
    })

})