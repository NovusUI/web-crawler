const { urlencoded } = require('body-parser')
const {JSDOM} = require('jsdom')

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
    getURLsFromHTML
}