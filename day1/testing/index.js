console.log("Hello World");
setTimeout(() => {
  console.log("I am Set Timeout......");
}, 100);
console.log("I am Sync Code");
queueMicrotask(() => {
  for (let i = 0; i < 10; i++) {
    console.log("I am Microtaskqueue i have high priority.....");
  }
});
console.log("Let's End this Program....");
