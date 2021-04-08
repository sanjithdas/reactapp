/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-25 10:29:58
 * @modify date 2021-03-26 10:20:22
 * @desc [description]
 */
/**
 * 
 */
 class Student{
  name; // private member , which cannot be access from outside
  age;
  address;
  phone;
/**
 * 
 * @param {*} name 
 * @param {*} age 
 * @param {*} address 
 * @param {*} phone 
 */
 constructor(name, age, address , phone){
   this.name = name;
   this.age = age;
   this.address = address;
   this.phone = phone
 } 
 /**
  * 
  * @returns name
  */
 display(){
    console.log(`I am ${this.name}, my contact number is ${this.phone}`);
   return this.name;
  }
}

// Creating object using 'new' keyword

const stud = new Student("San","41", "Bright Street", 12345);

// Create an object using 'create' method
//const newObj = Object.create(stud, {name: { score: "A"}});

console.log(newObj);

// Create an object using 'assign' method
const Obj = Object.assign({}, stud);
console.log(Obj);

// create an object instatnces using Object() constructor.

let student1 = new Object();
student1.name = 'Chris',
student1['age'] = 40,
student1.greeting = function() {
  console.log(`Hi ${this.name} , welcome`);
}

// OR


let student1 = new Object({
  name: 'Chris',
  age: 40,
  greeting: function() {
  console.log(`Hi ${this.name} , welcome`);
}
});

student1.greeting(); // will print "Hi Chris, welcome"

let student2 = Object.create(student1);
console.log(student2.name); // print Chris



 