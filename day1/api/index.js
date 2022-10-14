// How to fetch Data from server.

function fetchDataFromServer() {
  fetch("https://dummyjson.com/users")
    .then((response) => response.json())
    .then((json) => printData(json));
}

function printData(data) {
  console.log(data);
  let {limit, skip, total, users} = data;
  console.log(users);
  console.log("hello");

  let target = users.filter((ele)=>{return ele.age<50});
  let names = target.map((ele)=>{
    return{name:{firstName : ele.firstName, lastName : ele.lastName}};
  });

  let cummelative = target.reduce((a,b)=>{
    a+=b.weight;
    return a;
  },0);
  console.log(cummelative/target.length);

  // let ele = document.getElementById("code");
  // let tempData = data.filter((a) => a.id < 50);
  // ele.innerHTML = JSON.stringify(tempData, null, 4);

}

fetchDataFromServer();
