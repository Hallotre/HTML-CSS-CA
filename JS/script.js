// script.js

// Eksempel på å hente produkter fra API-et
async function fetchProducts() {
    try {
        const response = await fetch('https://v2.api.noroff.dev/gamehub/');
        const products = await response.json();

        // Vis produkter på nettsiden
        displayProductList(products);
    } catch (error) {
        console.error('Feil ved henting av produkter:', error);
    }
}

// Eksempel på å vise produktlisten
function displayProductList(products) {
    const gamesContainer = document.getElementById('games');

    // Gå gjennom hvert produkt og legg til HTML
    products.forEach(product => {
        const gameBox = document.createElement('div');
        gameBox.classList.add('gamebox');

        const gameLink = document.createElement('a');
        gameLink.href = `gameinfo.html?id=${product.id}`;

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = 'Game Image';

        const title = document.createElement('p');
        title.textContent = product.title;

        const price = document.createElement('p');
        price.textContent = `€${product.price}`;

        gameLink.appendChild(img);
        gameLink.appendChild(title);
        gameLink.appendChild(price);
        gameBox.appendChild(gameLink);

        gamesContainer.appendChild(gameBox);
    });
}

// Hent produkter ved lasting av siden
fetchProducts();
