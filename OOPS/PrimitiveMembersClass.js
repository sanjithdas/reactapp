/**
 * @author [Sanjith]
 * @email [sanjith.das@gmail.com]
 * @create date 2021-03-25 10:29:58
 * @modify date 2021-03-26 09:43:09
 * @desc [description]
 */
/**
 * 
 */
class Student{
  #name; // private member , which cannot be access from outside
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
   this.#name = name;
   this.age = age;
   this.address = address;
   this.phone = phone
 } 
 /**
  * 
  * @returns name
  */
 display(){
    console.log(`I am ${this.#name}, my contact number is ${this.phone}`);
   return this.name;
  }
}

const stud = new Student("San","41", "Bright Street", 12345);
// below line (line 41) will get error 
//console.log(stud.#name);
const det = stud.display();
 