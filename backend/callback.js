function greet(name, callback) {
    console.log(`Hello, ${name}`);
    callback(); // call the function passed in
  }
  
  function sayBye() {
    console.log("Goodbye!");
  }
  
  greet("Hamza", sayBye);
  