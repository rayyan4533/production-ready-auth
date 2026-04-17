import fs from 'node:fs'


// fs.writeFileSync("test.txt","hello from rayyan")



/*  2)Read 
const data=fs.readFileSync("test.txt","utf-8")
console.log(data)
*/

/*3)Append*/
// fs.appendFileSync("test.txt","\n appending data")



/* 4)creating directories recurs
fs.mkdirSync("myfolder/innerfolder",{recursive:true})
*/


/* 5)deletion*/
// fs.unlinkSync("test.txt")


fs.cpSync("test.txt","finaltest.txt")

//async shit is not like this there is obviously a callback 
//jo batata hai ke kya return hora


// fs.writeFile("asynctext.txt","ssup bruh",(err)=>{
//     if(err){
//         console.log(err.message)
//     }
//     console.log(`file written successfully`)
// })
