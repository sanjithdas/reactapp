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