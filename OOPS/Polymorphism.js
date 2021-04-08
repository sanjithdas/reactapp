class Parent 
  {  
     display()  
    {  
      console.log("Parent is invoked<br>");  
    }  
  }  
class Child extends Parent
  {  
    display()  
    {  
      console.log("Child is invoked");   
    }  
  }  
  
var a=[new Parent(), new Child()]  
a.forEach(function(msg)  
{  
msg.display();  
});  