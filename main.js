const {crawlWebsite} = require('./crawl')

function main() {

    if(process.argv.length < 3){
        console.log('no argument provided')
        process.exit(1)
    }
    if(process.argv.length > 3){

        console.log('to many arguments')
        process.exit(1)
    }
    
    const path = process.argv[2]
    console.log(`crawling website ${process.argv[2]}`)

    crawlWebsite(path)

    
}



main()