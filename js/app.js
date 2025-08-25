import data from "./data.js";
import dom from "./dom.js";

const URL = "https://restcountries.com/v3.1/all?fields=name,flags,population,capital,region,subregion,currencies,languages,borders";

let datos = [];

// Función para obtener y mostrar los datos iniciales
const fetchData = async () => {
  datos = await data.getData(URL);
  dom.showCards(datos);
  addEventCards();
};

fetchData();

// Filtro por nombre de país
const countryInput = dom.$("#filter");

countryInput.addEventListener("keyup", () => {
  const filtro = countryInput.value.trim().toLowerCase();
  const filtered = filtro === "" ? datos : data.filterByCountry(datos, filtro);
  dom.showCards(filtered);
  addEventCards(); // Reasigna eventos después de filtrar
});

// Filtro por región
const regionSelect = dom.$("#region-select");

regionSelect.addEventListener("change", () => {
  const region = regionSelect.value.toLowerCase();
  const filtered = region === "" ? datos : datos.filter(country => country.region.toLowerCase() === region);
  dom.showCards(filtered);
  addEventCards(); // Reasigna eventos después de filtrar
});

// Filtro en el modal
const modalCountry = dom.$("#filter2");

modalCountry.addEventListener("keyup", () => {
  const filtro = modalCountry.value.trim().toLowerCase();
  const filtered = filtro === "" ? datos : data.filterByCountry(datos, filtro);
  dom.showModal(filtered);
});

// Modo oscuro
const html = document.querySelector("html");

const btn = dom.$("#switch");

btn.addEventListener("click", () => {
  html.dataset.bsTheme = html.dataset.bsTheme == "light" ? "dark" : "light";
});

// Asignar eventos a las tarjetas de países
function addEventCards() {
  const countryCards = [...document.getElementsByClassName("countryCard")];

  countryCards.forEach(card => {
    card.addEventListener("click", () => {
      const countryName = card.id;
      const selectedCountry = datos.find(country => country.name.common === countryName);
      if (selectedCountry) {
        dom.showModal([selectedCountry]);
      }
    });
  });
}
