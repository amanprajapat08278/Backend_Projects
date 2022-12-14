

let data = [];
let size = data.length;
let max = 5;

function push(value){
    if(size >=max){
        return console.log("I am full");
    };
    data[size] = value;
    size+=1                     //[1,2,3,4,5,6]
}

function pop(){
    if(size <= 0){
        return console.log("I am alredy empty")
    }
    size-=1
    data.length = size
}

function display(){
    console.log(data)
}
 push(30)
 push(30)
 push(90)
 push(50)
 push(60)
 
 pop()
 pop()
 
 display()