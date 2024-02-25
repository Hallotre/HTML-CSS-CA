export function listGamesCard(api, output) {
    output.innerHTML = "";
    let gameContainer = "";
    
    for (let product of api) {
        gameContainer += `
            <a class="link-spill-container" href="./gameinfo.html?id=${product.id}">
                <div class="spill-container">
                    <img src="${product.image.url}" alt="${product.image.alt}">
                    <p>${product.title}</p>
                    <p class="pris">${product.price} $</p>
                </div>
            </a>`;
    }
    
    output.innerHTML = gameContainer;
}

export let handlekurv;

export const lagringHandlekurv = localStorage.getItem("handlekurven");
if (!lagringHandlekurv) {
    handlekurv = [];
    localStorage.setItem("handlekurven", JSON.stringify(handlekurv));
} else {
    handlekurv = JSON.parse(lagringHandlekurv);
}

export function listHandlekurv(id) {
    let added = handlekurv.includes(id);

    if (added) {
        handlekurv = handlekurv.filter((item) => item !== id);
    } else {
        handlekurv.push(id);
    }

    localStorage.setItem("handlekurven", JSON.stringify(handlekurv));
}

export function finnPris(arr, container) {
    let prisContainer = arr.reduce((total, array) => total + array.price, 0);

    prisContainer = prisContainer === 0 ? "Handlekurven er tom" : `Total pris: ${prisContainer} $`;

    container.innerHTML = prisContainer; 
}

let gamehubData = [];

export async function getFiltered(containerProduct, containerPris) {
    try {
        const api = `https://v2.api.noroff.dev/gamehub`;
        const response = await fetch(api);

        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }

        const data = await response.json();
        gamehubData = data.data;

        const filtered = gamehubData.filter((obj) => handlekurv.includes(obj.id));

        listSummary(filtered, containerProduct);
        finnPris(filtered, containerPris);

    } catch (error) {
        console.error("Error message: " + error);
    }
}

function listSummary(array, container) {
    let output = "";
    
    for (let arr of array) {
        output += `<li>${arr.title} ${arr.price}</li>`;
    }

    container.innerHTML = output;
}
