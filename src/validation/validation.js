const IsAlive = require("is-alive")
const isAlive = new IsAlive();

const isValidUrl = (url) => {
  try {
    console.log(url)
    var regexpression = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    let x = regexpression.test(url)
    if (x) {
      isAlive.add(url, 301, (err, noErr) => {
        // if(err){console.log(`error in ${err}`)}
        // else{
          console.log(`error in ${err}`)
          console.log(noErr)
        //}
        
      })
    }
    console.log(isAlive.isAlive(url))
    return x
  } catch (err) {
    console.log(err.message)
  }
  
}

// var IsAlive = require('is-alive');
// var isAlive = new IsAlive();
// isAlive.add("http://google.com", 301, function (err) {
//     "use strict";

//     if (err) {
//         console.log(err);
//     }
// });

// setInterval(function () {
//     console.log(isAlive.isAlive("http://google.com"));
// }, 2000);

// console.log(isAlive.isAlive("http://google.com"));

module.exports = { isValidUrl }