var prompt = require('prompt')
    , res = "";

// function getAnother() {
//     prompt.get('num', function(err, result) {
//         if (arr > 0) done();
//         else {
//             arr.push(parseInt(result.number, 10));
//             getAnother();
//         }
//     })
// }

// function done() {
//     console.log(arr);
// }


// prompt.start();
// let input = async () => {
//     await prompt.get('seed', () => {
//         this.res = res;
//         console.log(this.res);
//     });
// }
    
// input();


// Take in arguments
process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
  });

  console.log("seed: ", process.argv[2]);
