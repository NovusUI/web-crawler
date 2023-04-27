const {normalizeURL} = require('./crawl')
const {test,expect} = require('@jest/globals')

test('normalizeURL strip protocol',()=>{

    const input = 'https://adebola.com/thenodenovice'
    const actual = normalizeURL(input)
    const expected = 'adebola.com/thenodenovice'

    expect(actual).toEqual(expected)

})

test('normalizeURL strip trailing slash',()=>{

    const input = 'https://adebola.com/thenodenovice/'
    const actual = normalizeURL(input)
    const expected = 'adebola.com/thenodenovice'

    expect(actual).toEqual(expected)

})

test('normalizeURL remove capitalization',()=>{

    const input = 'https://ADEBOLA.com/thenodenovice'
    const actual = normalizeURL(input)
    const expected = 'adebola.com/thenodenovice'

    expect(actual).toEqual(expected)

})


