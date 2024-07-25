const $ = (selector) => document.querySelector(selector);
const newE = (tag) => document.createElement(tag);
const countries = $("#countries");
const modal = $("#Modal");


const newCard = (obj) => {
  const div = newE("div");
  div.className = "col carta mb-4 countryCard";
  div.id = obj.name.common;

  const { flags, name, population, capital, region } = obj;
  const flagImgSrc = flags ? flags.png : 'placeholder.png';
  const countryName = name ? name.common : 'Unknown Country';

  div.innerHTML = `
    <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="card-img-modified card-img shadow rounded-3 pb-3">
      <img class="d-flex flex-wrap rounded-top-3 rounded-bottom-0 mb-3 card w-100 h-100 imagen" src="${flagImgSrc}" alt="Flag of ${countryName}" />
      <div class="d-flex flex-column elem">
        <h5 class="mb-4 ps-3">${countryName}</h5>
        <p><span class="fw-semibold ps-3">Population:</span> ${population.toLocaleString()}</p>
        <p><span class="fw-semibold ps-3">Capital:</span> ${capital || 'N/A'}</p>
        <p><span class="fw-semibold ps-3">Region:</span> ${region || 'N/A'}</p>
      </div>
    </div>
  `;
  return div;
};

const showCards = (arr) => {
  countries.innerHTML = "";
  arr.forEach(element => {
    const card = newCard(element);
    countries.appendChild(card);
  });
};


const newModal = (obj) => {
  const div = newE("div");
  div.className = "d-flex flex-row justify-content-center align-content-center align-items-center mt-5 text-center gap-4 mb-5 flex-wrap";

  const { flags, name, population, region, subregion, capital, currencies, languages, borders } = obj;
  const flagImgSrc = flags ? flags.png : 'placeholder.png';
  const countryName = name ? name.common : 'Unknown Country';

  let html = `
    <div>
      <img class="d-flex flex-wrap rounded-3 imagen2" src="${flagImgSrc}" alt="Flag of ${countryName}" />
    </div>
    <div class="d-flex flex-column text-center mb-5 ps-2">
      <h4 class="pb-3">${countryName}</h4>
  `;

  if (name.nativeName) {
    for (let key in name.nativeName) {
      html += `<p><span class="fw-semibold">Native Name:</span> ${name.nativeName[key].common}</p>`;
      break;
    }
  }

  html += `
      <p><span class="fw-semibold">Population:</span> ${population.toLocaleString()}</p>
      <p><span class="fw-semibold">Region:</span> ${region || 'N/A'}</p>
      <p><span class="fw-semibold">Subregion:</span> ${subregion || 'N/A'}</p>
      <p><span class="fw-semibold">Capital:</span> ${capital || 'N/A'}</p>
  `;

  if (currencies) {
    for (let key in currencies) {
      html += `<p><span class="fw-semibold">Currency:</span> ${currencies[key].name}</p>`;
      break;
    }
  }

  if (languages) {
    const languagesList = Object.values(languages).join(", ");
    html += `<p><span class="fw-semibold">Language:</span> ${languagesList}</p>`;
  }

  if (borders && borders.length > 0) {
    html += `<p><span class="fw-semibold">Border Countries:</span> ${borders.join(", ")}</p>`;
  }

  html += `</div>`;
  div.innerHTML = html;
  return div;
};


const showModal = (arr) => {
  modal.innerHTML = "";
  arr.forEach(element => {
    const modalContent = newModal(element);
    modal.appendChild(modalContent);
  });
};

export default {
  $,
  showCards,
  showModal
};
