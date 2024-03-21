const teams = [
  {
    name: "Design Team",
    logo: "fa-pen-nib",
  },
  {
    name: "Marketing Team",
    logo: "fa-people-group",
  },
  {
    name: "Development Team",
    logo: "fa-code",
  },
];

const folders = [
  {
    name: "Products",
    options: ["Roadmap", "Performance", "Teammap", "Analytics"],
  },
  {
    name: "Sales",
    options: ["Performance", "Teammap", "Analytics"],
  },
  {
    name: "Design",
    options: ["Teammap", "Analytics"],
  },
  {
    name: "Office",
    options: ["Analytics"],
  },
  {
    name: "Legal",
    options: ["Roadmap", "Performance", "Teammap", "Analytics"],
  },
];

let products = [];

let teamsSection = document.getElementById("team");
let foldersSerction = teamsSection.nextElementSibling;
let createTeamButton = document.getElementById("createButton");
let tableBody = document.querySelector("tbody");
let input = document.querySelector("#searchInput");

// function to add teams dynamically

function addTeam() {
  teams.forEach((team) => {
    let individualTeam = document.createElement("div");
    individualTeam.className = "singleTeam";

    individualTeam.innerHTML = `<i class="fa ${team.logo}"></i><p>${team.name}</p>`;

    teamsSection.insertBefore(individualTeam, createTeamButton);
  });
}

//function to add folders dynamically

function addFolder() {
  folders.forEach((folder, index) => {
    console.log(index);
    let individualFolder = document.createElement("div");
    individualFolder.className = "singleFolder";
    individualFolder.addEventListener('click',() =>{
      console.log("hey");
      individualFolder.classList.toggle("activeCell");
    })

    // creating dropdown division

    let dropDownDiv = document.createElement("div");
    dropDownDiv.id = index;
    dropDownDiv.className = "drop-down-div";

    // Creating options for the dropdown
    let optionsList = document.createElement("ul");
    optionsList.style.listStyleType = "none";
    folder.options.forEach((option) => {
      let optionItem = document.createElement("li");
      optionItem.textContent = option;
      optionsList.appendChild(optionItem);
    });

    // Appending options to the dropdown
    dropDownDiv.appendChild(optionsList);

    individualFolder.innerHTML = `
      <div class="leftSingleFolder">
      <i class="fa-regular fa-folder"></i>
      <p>${folder.name}</p>
  </div>
  <div class="rightSingleFolder" onClick="toggleDropDown(this)">
      <i class="fa-solid fa-caret-down"></i>
  </div>

  
      `;

    foldersSerction.append(individualFolder);
    foldersSerction.appendChild(dropDownDiv);
  });
}

// Function to toggle dropdown visibility

function toggleDropDown(icon) {
  let dropDown = icon.parentElement.nextElementSibling;
  let dropDownIcon = icon.parentElement.children[1].children[0];

  if (dropDownIcon.classList.contains("fa-caret-down")) {
    dropDownIcon.classList.remove("fa-caret-down");
    dropDownIcon.classList.add("fa-caret-up");
  } else {
    dropDownIcon.classList.remove("fa-caret-up");
    dropDownIcon.classList.add("fa-caret-down");
  }
  dropDown.classList.toggle("active-drop-down");
}

//function to toggle description

function toggleDescription(id, full, truncated) {
  const descriptiobContainer = document.getElementById(`description-${id}`);
  console.log(descriptiobContainer);
  const spanContainer = descriptiobContainer.querySelector("span");
  const toggleDescButton = descriptiobContainer.querySelector("button");

  if (spanContainer.innerText == truncated) {
    spanContainer.innerText = full;
    toggleDescButton.innerText = "Show Less";
  } else {
    spanContainer.innerText = truncated;
    toggleDescButton.innerText = "Show More";
  }

  console.log("ik");
}

// fetching data from products API

const fetchData = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    products = [...data.products];
    console.log(products);
    displayData(products);
  } catch (error) {
    console.log(error);
  }
};

// display fetched data in tabulat format

function displayData(items) {
  tableBody.innerHTML = "";

  items.forEach((item) => {
    const tableRow = tableBody.insertRow();

    const cell0 = tableRow.insertCell(0);
    const cell1 = tableRow.insertCell(1);
    const cell2 = tableRow.insertCell(2);
    const cell3 = tableRow.insertCell(3);
    const cell4 = tableRow.insertCell(4);
    // const cell5 = tableRow.insertCell(5);

    cell0.innerHTML = `
    <div class="brandName">
    <img src="${item.images[0]}" width=25px> <p>${item.brand}</p>
    </div>
    `;

    // showing truncated description

    const turcatedDescriotion = item.description.substring(0, 30) + "...";
    const fullDescription = item.description;
    const isTruncated = true;

    cell1.className = "cell1Style";
    cell1.innerHTML = `
    <div id="description-${item.id}">
    <span>${turcatedDescriotion}</span>
    <button class="cell1Button" onclick="toggleDescription(${
      item.id
    },'${fullDescription}','${turcatedDescriotion}')">
    Show ${isTruncated ? "More" : "Lesss"}
    </button>
    </div>
    `;

    cell2.className = "cell2Style";

    for (let i = 0; i < item.images.length; i++) {
      let modelImage = document.createElement("img");
      modelImage.src = item.images[i];
      modelImage.className = "membersImage";
      modelImage.style.transform = `translateX(${i * -35}%)`;
      cell2.append(modelImage);
    }

    cell3.innerText = item.category;
    cell4.innerText = item.rating;
  });
}

// search products with brand name

function filterProducts() {
  console.log("filter");
  console.log(input.value);

  const newList = products.filter((product) =>
    product.brand.toLowerCase().includes(input.value.toLowerCase())
  );
  console.log(newList);

  displayData(newList);
}

// sorting products with brand name

function sortProducts(sortIcon){

  console.log(sortIcon)

  sortIcon.classList.toggle("activeCell");

  let sortedProducts = products.sort((a,b) => a.brand.localeCompare(b.brand));
  displayData(sortedProducts);
}

// on loading window adding teams and folder dynamically

window.addEventListener("load", addTeam);

window.addEventListener("load", addFolder);
window.addEventListener("load", fetchData);
