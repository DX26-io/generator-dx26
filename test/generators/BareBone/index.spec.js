const expect = require('chai').expect;

describe('Sample unit test', () => {
    it("Should return person's name", () => {
        expect('test').contains('test', 'Passed in name exists');
    });
});
