import { listGamesCard } from "./utils.js";

const populareSpill = document.querySelector("div.populære-spill");
let gamehubApi = [];

async function fetchGamehubApi() {
    const api = "https://v2.api.noroff.dev/gamehub";

    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        const data = await response.json();
        gamehubApi = data.data;
    } catch (error) {
        console.error("Error message: " + error);
    }
}

function filterFavoriteGames() {
    return gamehubApi.filter((obj) => obj.favorite === true);
}

function displayGames(container, games) {
    if (games.length > 0) {
        listGamesCard(games, container);
    } else {
        container.innerHTML = `<p>Kan ikke finne noen spill</p>`;
    }
}

async function init() {
    await fetchGamehubApi();
    const favoriteGames = filterFavoriteGames();
    displayGames(populareSpill, favoriteGames);
}

init();
