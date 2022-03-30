const fs = require('fs')
const axios = require('axios')
const process = require('process')

function cat(path){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log('There is an error ---->', error)
            process.kill(1)
        }
        console.log('Here is the file content ---->\n', data)
    })
}

async function webCat(url){
    try{
        const res = await axios.get(url)
        console.log('Here is the content ---->\n', res.data)
    } catch(error){
        console.log('There is an error ---->', error)
        process.kill(1)
    }
}


const argument = process.argv[2]

if (argument.startsWith('http')){
    webCat(argument)
} else{
    cat(argument)
}