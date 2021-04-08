/**
 * Subject class is the top level entity
 * 
 */
class Subject {  
   constructor(name){
   
    this.name = name;
  } 
  
  getName(){
   
   return this.name;
    
 }
}

/**
 * Student has a subject
 */

class Student{
 constructor(){
   const studSub1 = new Subject('Eng');
   studSub1.getName();
   const studSub2 = new Subject('Hind');
 }
 
}

let stud = new Student();

