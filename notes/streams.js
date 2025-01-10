const fs = require('fs') ;


//Stream => read , write 

const readStream = fs.createReadStream('./countries.txt', 'utf-8') ;

console.log(readStream)

readStream.on('data',(chunk)=>{
    console.log(chunk)
})

readStream.on('end' ,()=>{
    console.log('read stream ended')
})

const writeStream = fs.createWriteStream('./write.txt') ;


readStream.pipe(writeStream)