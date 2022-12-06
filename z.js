

// Input:

// 3

// 10 20 30

// 60 100 120

// 5

function run(a1, a2, n){
    let sum = 0;
    let total = 0;
    for(let i=0; i<a1.length; i++){
        for(let j=i+1; j<a2.length; j++){
            
        }
    }
    return sum
}
//console.log(run([10,20,30],[60,100,120],50))

function koi(n){
      let x = n/2
      return Math.floor(x)
}
//console.log(koi(5))


var findComplement = function(num) {

    var bin = num.toString(2);
  
    bin = bin.split('');

    var answer = [];
  
    for (var i = 0; i < bin.length; i++) {
      if (bin[i] == '0') {
        answer.push(1);
      } else {
        answer.push(0)
      }
    }
    
    return parseInt(answer.join(''),2);
  
  };
  
  console.log(findComplement(5));