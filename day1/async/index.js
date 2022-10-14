function asyncPriority() {
  setTimeout(() => {
    console.log("I am set Timeout");
  }, 0);
  console.log("Hey i am just a console.log");
  let a = new Promise((resolve, reject) => {
    resolve(console.log("I am Resolved..."));
  });
  console.time("For");
  for (let i = 0; i < 10000; i++) {}
  console.timeLog("For");
  console.time("For");
}

asyncPriority();
