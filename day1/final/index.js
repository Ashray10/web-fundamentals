// Steps
/**
 * 1. Call an Api for fetching the records.
 * 2. Create An Template of single card.
 * 3. Now make the listing Dynamic.
 */
const nameFormatter = (user) => `${user.firstName} ${user.lastName}`;
const companyPositionFormatter = (user) => `${user.company.title}`;
const companyNameFormatter = (user) => `${user.company.name}`;
let fields = [
  {
    label: "Name ",
    value: "name",
    formatter: nameFormatter,
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Phone ",
    value: "phone",
  },
  {
    label: "Blood Group",
    value: "bloodGroup",
  },
  {
    label: "Company",
    value: "name",
    formatter: companyNameFormatter,
  },
  {
    label: "Position",
    value: "name",
    formatter: companyPositionFormatter,
  },
  {
    label: "weight ",
    value: "weight",
  },
];
function setUpListingPage() {
  fetchData();
}

async function fetchData() {
  try {
    let data = await fetch("https://dummyjson.com/users");
    let mainContainer = document.getElementsByClassName("main-conatiner")[0];
    let result = await data.json();
    result.users.forEach((ele) => {
      mainContainer.appendChild(renderCard(ele));
    });
  } catch (ex) {
    console.log(ex);
  }
}

function renderCard(user) {
  let cardContainer = document.createElement("div");
  cardContainer.setAttribute("class", "card");
  let img = document.createElement("img");
  img.setAttribute("class", "card-img");
  img.setAttribute("src", user.image);
  let detailsContainer = document.createElement("div");
  detailsContainer.setAttribute("class", "details-container");
  fields.forEach((ele) => {
    let { label, formatter, value } = ele;
    if (formatter) {
      value = formatter(user);
    } else {
      value = user[value];
    }
    detailsContainer.appendChild(createDetailsAttribute(label, value));
  });
  cardContainer.appendChild(img);
  cardContainer.appendChild(detailsContainer);
  return cardContainer;
}

function createDetailsAttribute(label, value) {
  let details = document.createElement("div");
  details.setAttribute("class", "details");
  let h4 = document.createElement("h4");
  h4.setAttribute("class", "details-header");
  h4.innerText = label;
  let span = document.createElement("span");
  span.textContent = value;
  details.appendChild(h4);
  details.appendChild(span);
  return details;
}
setUpListingPage();
