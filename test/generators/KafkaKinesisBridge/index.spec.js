var logger = require('../../../generators/KinesisIngestion')
var expect    = require("chai").expect;


describe('Sample unit test', () => {
    it('Should return person\'s name', () => {
        const result = logger("test")
        expect(result).contains("test", 'Passed in name exists')
    })
})
