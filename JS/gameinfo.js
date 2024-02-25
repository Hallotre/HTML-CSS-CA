import { listHandlekurv, handlekurv } from "./utils.js";

const mainSpillSide = document.querySelector("main.gameHolder");
let spillApiById = [];
console.log(handlekurv);

const params = new URL(document.location).searchParams;
const id = params.get("id");
const ref = document.referrer;

async function fetchApiById() {
  try {
    const api = `https://v2.api.noroff.dev/gamehub/${id}`;
    const response = await fetch(api);
    const data = await response.json();

    spillApiById = data.data;
    createSpillSide(spillApiById, mainSpillSide);
    addClickListener(id);
  } catch (error) {
    mainSpillSide.innerHTML = `<p>Kan ikke finne spillet du ser etter</p>`;
  }
}
fetchApiById();

function createSpillSide(api, output) {
  output.innerHTML = `
  <div class="spillside-left">
    <p><a class="tilbake-knapp" href="${ref}">Tilbake</a></p>
    <h1>${api.title}</h1>
    <img src="${api.image.url}" alt="${api.image.alt}">
  </div>

  <div class="spillside-right">
    <div class="pris-div">
      <p class="nå-pris">${api.price} $</p>
    </div>
    <a class="legg-i-handlekurv" id=${api.id} href="./shopping.html">
      ${handlekurv.includes(api.id) ? 'Fjern fra handlekurven' : 'Legg til i handlekurv'}
    </a>
    <section class="produkt-beskrivelse">
      <h2>Produktbeskrivelse</h2>
      <p>${api.description}</p>
      <h2>Spesifikasjoner</h2>
      <ul>
        <li>Aldersgrense: ${api.ageRating}</li>
        <li>Sjanger: ${api.genre}</li>
        <li>Gitt ut i ${api.released}</li>
      </ul>
    </section>
  </div>`;
}

function addClickListener(id) {
  const handleKurvKnapp = document.querySelector(".legg-i-handlekurv");
  handleKurvKnapp.addEventListener("click", (e) => {
    listHandlekurv(id);
  });
}
