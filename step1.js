const fs = require('fs')

function cat(path){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error) {
            console.log('There is an error ---->', error)
            process.kill(1)
        }
    
        console.log('Here is the file content ---->\n', data)
    })
}
cat('one.txt')
