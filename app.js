const http = require('http') ;
const fs = require('fs')


// const EventEmitter = require('events') ;

// const myEvent = new EventEmitter() ;

// console.log(myEvent)

// myEvent.on("sale", (productname, price)=>{
//     console.log(`sale is made ${productname} : ${price} `)
// })

// setTimeout(()=>{
// myEvent.emit('sale' ,'laptop',3000)
// },5000)


//NOTE pattern eventEmiiter pattern observable pattern 




// const server = http.createServer((req,res)=>{
//     const countriesData = fs.readFileSync('./countries.txt' , 'utf-8') ;
//     console.log(req.url)
//    res.statusCode = 200
//     // res.writeHead(201)
//     res.end(countriesData)
// })

const homeData = fs.readFileSync('./home.html','utf-8')
console.log(homeData)
const server = http.createServer((req,res)=>{
    console.log(req.url)

    if(req.url === '/home'){
        res.writeHead(200,{
            'Content-Type': "text/html"
        })
        res.end(homeData)
    }else{
        res.end("my website")
    }
})


server.listen(5000,()=>{
    console.log('server is running')
})



server.on('request',()=>{
    console.log('req made')
})