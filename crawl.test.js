const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test,expect} = require('@jest/globals')

test('normalizeURL strip protocol',()=>{

    const input = 'https://adebola.com/thenodenovice'
    const actual = normalizeURL(input)
    const expected = 'adebola.com/thenodenovice'

    expect(actual).toEqual(expected)

})

test('normalizeURL strip trailing slash',()=>{

    const input = 'https://adebola.com/thenodenovice'
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

test('getURLsFromHTML absolute path',()=>{

    const inputHTML = `
    <html>
        <body>
            <a href="https://adebola.com/thenodenovice"> Adebola</a>
        </body>
    </html>
    `
    const inputURL = 'https://adebola.com/thenodenovice'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ['https://adebola.com/thenodenovice']

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML relative path',()=>{

    const inputHTML = `
    <html>
        <body>
            <a href="/thenodenovice"> Adebola</a>
        </body>
    </html>
    `
    const inputURL = 'https://adebola.com'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ['https://adebola.com/thenodenovice']

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML multiple path',()=>{

    const inputHTML = `
    <html>
        <body>
            <a href="/thenodenovice"> Adebola</a>
            <a href="/theShadu"> Adebola</a>
        </body>
    </html>
    `
    const inputURL = 'https://adebola.com'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ['https://adebola.com/thenodenovice','https://adebola.com/theShadu']

    expect(actual).toEqual(expected)

})

test('getURLsFromHTML bad url',()=>{

    const inputHTML = `
    <html>
        <body>
            <a href="https://adebola.com/thenodenovice///">invalid</a>

        </body>
    </html>
    `
    const inputURL = 'https://adebola.com'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = []

    expect(actual).toEqual(expected)

})


