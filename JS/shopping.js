import { handlekurv, finnPris } from "./utils.js";

const handlekurvContainer = document.querySelector(".handlekurv-container");
const prisHandlekurv = document.querySelector(".pris-handlekurv");
const kasseBtn = document.querySelector(".kasse-button");



function visHandlekurvPåNettsted(gameById) {
    handlekurvContainer.innerHTML = "";
    let container = "";
    for (let kurvSpill of gameById) {
        container += `
            <a href="#">
                <div>
                    <button class="fjern" id=${kurvSpill.id}>Fjern</button>
                    <img src="${kurvSpill.image.url}" alt="${kurvSpill.image.alt}">
                    <p>${kurvSpill.title}</p>
                    <p>${kurvSpill.price} $</p>
                </div>
            </a>`;
    }
    handlekurvContainer.innerHTML = container;

    gameById.forEach((item) => {
        leggTilHendelseslytterHandlekurv(item.id);
    });
}

let gamehubData = [];
async function hentSpillInfoMedHandlekurvId() {
    try {
        const api = `https://v2.api.noroff.dev/gamehub`;
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }

        const data = await response.json();
        gamehubData = data.data;

        const filtrert = gamehubData.filter((obj) => {
            return handlekurv.includes(obj.id);
        });

        visHandlekurvPåNettsted(filtrert);
        finnPris(filtrert, prisHandlekurv);

    } catch (error) {
        console.error("Feilmelding: " + error);
        handlekurvContainer.innerHTML = `<p>Kan ikke finne handlekurven</p>`;
    }
}

hentSpillInfoMedHandlekurvId();

function oppdaterHandlekurv(id) {
    let oppdatertHandlekurv = JSON.parse(localStorage.getItem("handlekurven"));
    oppdatertHandlekurv = oppdatertHandlekurv.filter((item) => item !== id);
    return oppdatertHandlekurv;
}

function leggTilHendelseslytterHandlekurv(id) {
    let fjernKnapp = document.getElementById(id);
    fjernKnapp.addEventListener("click", () => {
        let nyHandlekurv = oppdaterHandlekurv(id);
        localStorage.setItem("handlekurven", JSON.stringify(nyHandlekurv));
        window.location.reload();
    });
}
