const math=require("./math");

// module mocking
jest.mock("./math");

test("multiplication of 2 and 3 is 6",()=>{
    math.multiply.mockReturnValueOnce(6);
    expect(math.multiply(2,3)).toBe(6);

})
test("subtraction of 5 and 2 is 3",()=>{
    math.sub.mockReturnValueOnce(3);
    expect(math.sub(5,2)).toBe(3);

})
test("modulo of 5 and 2 is 1", () => {
    math.modulo.mockReturnValueOnce(1);
    expect(math.modulo(5, 2)).toBe(1);
});
