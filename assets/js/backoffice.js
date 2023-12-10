const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDRhNTBkOGEyMDAwMThhNDhhNWEiLCJpYXQiOjE3MDIxMTM1ODgsImV4cCI6MTcwMzMyMzE4OH0.3NjM7-olQcqxFzsnldwHmNYRoVx_eLZDGZwJDB_doHM";

let productId = new URLSearchParams(window.location.search).get("eventId");
console.log("productId", productId);

if (productId) {
  fetch(URL + productId, {
    method: "GET",
    headers: {
      Authorization: APIKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error!");
      }
      return response.json();
    })
    .then((productData) => {
      console.log(productData);
      document.getElementById("name").value = productData.name;
      document.getElementById("description").value = productData.description;
      document.getElementById("brand").value = productData.brand;
      document.getElementById("img").value = productData.imageUrl;
      document.getElementById("price").value = productData.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

const saveProduct = function (newProduct) {
  let url = productId ? URL + productId : URL;

  fetch(url, {
    method: productId ? "PUT" : "POST",
    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization: APIKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("PRODOTTO SALVATO CORRETTAMENTE");
        window.location.href = "index.html";
      } else {
        alert("PROBLEMA NELLA CREAZIONE DEL PRODOTTO");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

let formReference = document.getElementsByTagName("form")[0];
formReference.addEventListener("submit", (e) => {
  e.preventDefault();
  let newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("img").value,
    price: document.getElementById("price").value,
  };
  console.log(newProduct);
  saveProduct(newProduct);
});

let deleteButtonReference = document.getElementById("delete");
deleteButtonReference.addEventListener("click", () => {
  let confirmation = confirm("Premi ok per eliminare il prodotto!");
  if (confirmation) {
    fetch(URL + productId, {
      method: "DELETE",
      headers: {
        Authorization: APIKey,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("PRODOTTO ELIMINATO CORRETTAMENTE");
          window.location.href = "index.html";
        } else {
          alert("PROBLEMA NELL'ELIMINAZIONE DEL PRODOTTO");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    console.log("Eliminazione del prodotto annullata dall'utente");
  }
});

let resetFormButtonReference = document.getElementById("reset");
resetFormButtonReference.addEventListener("click", () => {
  confirm("Premi ok per cancellare il contenuto del form");
  formReference.reset();
});
