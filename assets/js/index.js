const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDRhNTBkOGEyMDAwMThhNDhhNWEiLCJpYXQiOjE3MDIxMTM1ODgsImV4cCI6MTcwMzMyMzE4OH0.3NjM7-olQcqxFzsnldwHmNYRoVx_eLZDGZwJDB_doHM";
displayProducts = function (data) {
  let rowReference = document.getElementById("item");
  data.forEach((data) => {
    let newCol = document.createElement("div");
    newCol.classList.add("col-md-6");
    newCol.classList.add("col-lg-4");
    newCol.innerHTML = `
        <div id="cardsIndex" class="card mt-3">
        <img src="${data.imageUrl}" class="card-img-top img-fluid" alt="${data.name}  style="width:300px">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.price} €</p>
          <a href="./details.html?eventId=${data._id}" class="btn btn-primary">Scopri di più</a>
          <a href="./backoffice.html?eventId=${data._id}" class="btn btn-warning">Modifica</a>
        </div>
      </div>
        `;
    rowReference.appendChild(newCol);
  });
};

const hideSpinner = function () {
  let spinnerReference = document.getElementsByClassName("spinner-border")[0];
  spinnerReference.classList.add("d-none");
};

const getProducts = function () {
  fetch(URL, {
    method: "GET",
    headers: {
      Authorization: APIKey,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        return new Error("Errore dati non trovati");
      }
    })
    .then((products) => {
      console.log("PRODOTTI", products);
      hideSpinner();
      displayProducts(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

getProducts();
