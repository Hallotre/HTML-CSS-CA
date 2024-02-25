import { listGamesCard } from "./utils.js";

const allGamesContainer = document.querySelector("div.games");
let gamehubApi = [];

async function fetchAndDisplayGames(container) {
    try {
        const api = "https://v2.api.noroff.dev/gamehub";
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }

        const data = await response.json();
        gamehubApi = data.data;
        listGamesCard(gamehubApi, container);
    } catch (error) {
        console.error("Error message: " + error);
        container.innerHTML = "<p>Kan ikke finne spill</p>";
    }
}

fetchAndDisplayGames(allGamesContainer);

const chooseSort = document.querySelector("#chooseBtn");

chooseSort.addEventListener("change", sortGames);

async function sortGames() {
    const choosenSorting = chooseSort.value;
    let unsortedApi = [];

    try {
        const api2 = "https://v2.api.noroff.dev/gamehub";
        const response2 = await fetch(api2);

        if (!response2.ok) {
            throw new Error(`HTTP error! ${response2.status}`);
        }

        const data2 = await response2.json();
        unsortedApi = data2.data;

        if (choosenSorting === "hoyLav") {
            const hoyLavApi = unsortedApi.sort((a, b) => b.price - a.price);
            console.log(hoyLavApi);
            listGamesCard(hoyLavApi, allGamesContainer);
        } else if (choosenSorting === "lavHoy") {
            const lavHoyApi = unsortedApi.sort((a, b) => a.price - b.price);
            listGamesCard(lavHoyApi, allGamesContainer);
        } else if (choosenSorting === "release") {
            const releaseApi = unsortedApi.sort((a, b) => b.released - a.released);
            listGamesCard(releaseApi, allGamesContainer);
        } else if (choosenSorting === "none") {
            fetchAndDisplayGames(allGamesContainer);
        }
    } catch (error) {
        console.error("Error message: " + error);
        allGamesContainer.innerHTML = "<p>Kan ikke finne spill</p>";
    }
}
