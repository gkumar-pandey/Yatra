import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  let adventureId;
  for (var value of param.values()) {
    adventureId = value;
  }

  // Place holder for functionality to work in the Stubs
  return adventureId;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    const data = await result.json();
    return data;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerText = adventure.name;
  document.getElementById("adventure-subtitle").innerText = adventure.subtitle;
  const photogallery = document.getElementById("photo-gallery");
  const imgarr = adventure.images;
  imgarr.forEach((element) => {
    const imgdiv = document.createElement("div");
    imgdiv.classList.add("col-lg-12");
    imgdiv.innerHTML = `<img src=${element} class="activity-card-image img-fluid"  />`;
    photogallery.appendChild(imgdiv);
  });
  document.getElementById("adventure-content").innerText = adventure.content;
  document.getElementById("reservation-person-cost").innerText =
    adventure.costPerHead;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let gallery = document.querySelector("#photo-gallery");
  gallery.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
  </ol>
  <div class="carousel-inner">
      <div class="carousel-item active">
         <img class="activity-card-image d-block w-100" src=${images[0]} alt="First slide">
      </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;
  let inner = document.querySelector(".carousel-inner");
  let ol = document.querySelector(".carousel-indicators");
  for (let i = 1; i < images.length; i++) {
    let li = document.createElement("LI");
    li.setAttribute("data-target", "#carouselExampleIndicators");
    li.setAttribute("data-slide-to", `${i}`);
    ol.appendChild(li);

    let item = document.createElement("DIV");
    item.className = "carousel-item";
    let image = document.createElement("IMG");
    image.className = "activity-card-image d-block w-100";
    image.setAttribute("src", images[i]);
    item.appendChild(image);
    inner.appendChild(item);
  }
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML =  String(totalCost);
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  $("#myForm").submit((e) => {
    e.preventDefault();

    let reservation = $("#myForm").serialize();
    reservation += `&adventure=${adventure.id}`;
    $.ajax({
      type: "POST",
      url: config.backendEndpoint + "/reservations/new",
      data: reservation,
      success: function () {
        alert("Success!");
        location.reload();
      },
      error: function () {
        alert("Failed!");
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
