// Article for better info https://richardartoul.github.io/jekyll/update/2015/04/26/hidden-classes.html
function Animal(name, type) {
  this.name = name;
  this.type = type;
}

let obj1 = new Animal("dodo", "dog");
let obj2 = new Animal("sam", "cat");

//Hidden Classes maintained for accessing hash tables
obj1.x = 10;
obj1.y = 20;

// In this case two separate hidden class will made as order is different.
obj2.y = 30;
obj2.x = 40;

console.table({ obj1, obj2 });
