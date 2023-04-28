const { urlencoded } = require('body-parser')
const {JSDOM} = require('jsdom')
const  axios = require('axios')


const crawlWebsite = async (baseURL, currentURL, pages) => {


    const baseURLOBJ = new URL(baseURL)
    const currentURLOBJ = new URL(currentURL)

    if(baseURLOBJ.hostname !== currentURLOBJ.hostname){
        return pages
    }
    
    const normalizedUrl = normalizeURL(currentURL)
    
    if(pages[normalizedUrl] > 0){
        pages[normalizedUrl]++;
        return pages
    }

    pages[normalizedUrl] = 1
    
    console.log(`actively crawling ${normalizedUrl}`)

    try{
        const response = await axios({
            method: 'get',
            url: currentURL
        })
        console.log(response.headers)
        if(!response.headers['content-type'].includes('text/html')){
            console.log(`Error, header ${response.headers} does not include text/html`)
            return pages
        }

        const pageURLS =  getURLsFromHTML(response.data, currentURL)

        for(const pageURL of pageURLS){
            pages = await crawlWebsite(baseURL, pageURL, pages)
        }


    }catch(e){
        console.log(e.message)
    }
    return pages
    
}

const getURLsFromHTML = (htmlBody, baseURL)=> {
    const urls = []
    
    const dom = new JSDOM(htmlBody)
   
    const links = dom.window.document.querySelectorAll('a')
    
    links.forEach((link)=>{
        
       if(link.href.slice(0,1) === '/'){
           //relative url
           try{
            const urlObj = new URL(`${baseURL}${link.href}`)
            return urls.push(urlObj.href)

           }catch(e){
               console.log(e.message)
           }
           
       }else{
        //absolute url
        try{
            const urlObj = new URL(link.href)
            urls.push(urlObj.href)

        }catch(e){
            console.log(e.message)
        }
          
       }
       
           
    })

    return urls
}

const normalizeURL = (urlString) => {

    const url = new URL(urlString)

    const hostPath = `${url.hostname}${url.pathname}`

    if(hostPath.length > 0 && hostPath.slice(-1) == '/'){
        return hostPath.slice(0,-1)
    }

    return hostPath
}


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlWebsite
}