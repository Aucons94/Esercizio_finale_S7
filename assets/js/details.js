const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDRhNTBkOGEyMDAwMThhNDhhNWEiLCJpYXQiOjE3MDIxMTM1ODgsImV4cCI6MTcwMzMyMzE4OH0.3NjM7-olQcqxFzsnldwHmNYRoVx_eLZDGZwJDB_doHM";

let productId = new URLSearchParams(window.location.search).get("eventId");
console.log("productId", productId);

const getSingleProduct = function () {
  fetch(URL + productId, {
    method: "GET",
    headers: {
      Authorization: APIKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Problema nel recuperare i dettagli del prodotto");
      }
      return response.json();
    })
    .then((productData) => {
      console.log(productData);

      let containerDivReference = document.getElementById("details-container");
      containerDivReference.innerHTML = `
        <div class="row">
          <div id="imgDettagli" class="col col-12 col-md-3 py-5">
            <img src="${productData.imageUrl}" alt="${productData.name}" class="img-fluid"> 
          </div>
          <div class="col col-12 col-md-3 d-flex flex-column justify-content-center">
            <h2>${productData.name}</h2>
            <h6>${productData.brand}</h6>
            <h3>${productData.price} €</h3>
            <p>${productData.description}</p>
            <div class="col col-md-4">
              <button type="button" class="btn btn-primary">Acquista</button>
            </div>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      console.log(error);
    });
};

getSingleProduct();
