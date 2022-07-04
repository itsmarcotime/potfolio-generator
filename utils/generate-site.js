const fs = require('fs');
const { resolve } = require('path');

const writeFile = fileContent => {

    fs.writeFile('./dist/index.html', fileContent, err => {
        return new Promise((resolve, reject) => {
            //if theres no error, reject the Promise and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);

                //return out of the function here to make sure the Promise doesnt accidentally execute the resolve() function as well
                return;

            }

            //if everthing went well, resolve the Promise and send the sussceessful data to the `.then()` method 
            resolve({
                ok: true,
                message: 'file created!'
            });
        });
    });
};

const copyFile = () => {

    return new Promise (() => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {

            if (err) {
                reject(err);
    
                return;
            }
    
            resolve({
                ok: true,
                message: 'Success!!'
            });
            
        });
        
    });
};

module.exports = {writeFile, copyFile};