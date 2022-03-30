const fs = require('fs')
const axios = require('axios')
const process = require('process')


function handleOutPut(text, out){
    if (out){
        fs.writeFile(out, text, 'utf8', (error)=> {
            if (error){
                console.log('Could not write to file')
                process.kill(1)
            }
        })
    } else{
        console.log('failed to write to file!')

    }

}



function cat(path, out){
    fs.readFile(path, 'utf8', (error, data) =>{
        if (error){
            console.log('Error occured!', error)
            process.kill(1)
        }
        handleOutPut(data, out)
    })
}


async function webCat(path, out){
    try{
    let res = await axios.get(path)
    // console.log('Here is your data --->', res.data)
    handleOutPut(res.data, out)
    }
    catch(err){
        console.log('Error occured!', err)
        process.exit(1)
    }
}


let path;
let out;

if (process.argv[2] === '--out'){
    out = process.argv[3]
    path = process.argv[4]
} else{
    path = process.argv[2]
}

if (path.startsWith('http')){
    webCat(path, out)
}else{
    cat(path, out)
}


