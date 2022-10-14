async function fetchData() {
  try {
    let data = await fetch("https://dummyjson.com/users");
    let mainContainer = document.getElementsByClassName("main-conatiner")[0];
    let result = await data.json();
    result.users.forEach((ele) => {
      mainContainer.appendChild(maketemplate(ele));
    });
  } catch (ex) {
    console.log(ex);
  }
}


let nameFormatter = (user)=> `${user.firstName} ${user.lastName}`;
let companyNameFormatter = (user)=> `${user.company.name}`;
let positionFormatter = (user)=> `${user.company.title}`;


let config = [
    {key : "name", label : "Name", formatter: nameFormatter},
    {key : "age", label : "Age"},
    {key : "phone", label: "Phone no: "},
    {key: "bloodGroup",label: "Blood Group"},
    {key: "companyName", label: "Company", formatter: companyNameFormatter},
    {key: "position", label: "Position", formatter: positionFormatter},
    {key: "weight", label: "Weight"}
]

function maketemplate(user){
  // console.log(user.company);
  let conatiner = document.createElement("div");
  conatiner.setAttribute("class", "card");

  let imageContainer = document.createElement("div");
  imageContainer.setAttribute("class", "imgCont");
  let image = document.createElement("img");
  image.setAttribute("class", "img");
  image.setAttribute("src", user.image);
  let details = document.createElement("table");
  details.setAttribute("class", "details-table");

  config.forEach((ele) => {
    let { key, formatter, label } = ele;
    // console.log(key, formatter, value);
    if (formatter) {
      // console.log(key);
      value = formatter(user);
    } else {
      // console.log(value,user);
      value = user[key];
    }
    details.appendChild(createDetails(label, value));
  });
  imageContainer.appendChild(image);
  conatiner.appendChild(imageContainer);
  // conatiner.appendChild(image);
  conatiner.appendChild(details);
  return conatiner;
}
  function createDetails(label, value){
      let row = document.createElement("tr");
      row.setAttribute("class", "details");
      let lab = document.createElement("th");
      let val = document.createElement("td");
      lab.innerText = label;
      val.textContent = value;
      row.appendChild(lab);
      row.appendChild(val);
      // console.log(row);
      return row;
  }
  fetchData();

{/* <div>
  <img src="" alt="" weidth="", height="">
  <table>
    <tr>
      <td>value</td>
      <td>data</td>
    </tr>
  </table>
</div> */}