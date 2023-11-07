document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById("pokemon-container");
    const loadMoreButton = document.getElementById("load-more-button");
    const pokemonDetails = document.getElementById("pokemon-details");
    const closeIcon = document.createElement("span");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const filterSelect = document.getElementById("filter-select");
    const resetButton = document.getElementById("reset-button");

    let offset = 0;
    let allPokemonData = [];

    // Función para cargar Pokémon desde la API
    async function fetchPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);
        const data = await response.json();

        const pokemonPromises = data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            return response.json();
        });

        const pokemonData = await Promise.all(pokemonPromises);

        // Ordenar los Pokémon por ID
        pokemonData.sort((a, b) => a.id - b.id);

        allPokemonData = allPokemonData.concat(pokemonData);

        displayFilteredPokemon(allPokemonData);

        offset += 12;
    }

    // Función para crear una tarjeta de Pokémon
    function createPokemonCard(pokemon) {
        const card = document.createElement("div");
        card.classList.add("card", "pokemon-card"); // Agrega la clase "pokemon-card"

        card.innerHTML = `
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">${pokemon.name}</h5>
                <p>ID: ${pad(pokemon.id, 3)}</p>
                <p>Tipo: ${getPokemonTypes(pokemon.types)}</p>
                <button class="btn btn-primary" data-id="${pokemon.id}">Más información</button>
            </div>
        `;

        card.querySelector(".btn").addEventListener("click", () => {
            animatePokemon(pokemon, card); // Agrega la animación cuando se hace clic
            displayPokemonDetails(pokemon);
        });

        pokemonContainer.appendChild(card);
    }

    // Función para mostrar detalles de Pokémon en el panel lateral
    function displayPokemonDetails(pokemon) {
        closeDetailsPanel(); // Cerrar detalles anteriores (si los hay)
        closeIcon.innerHTML = "&times;";
        closeIcon.className = "close-button";
        closeIcon.addEventListener("click", () => {
            closeDetailsPanel();
        });

        const detailsContent = document.createElement("div");
        detailsContent.className = "pokemon-details-content";
        detailsContent.innerHTML = `
            <h2>${pokemon.name}</h2>
            <p>ID: ${pad(pokemon.id, 3)}</p>
            <p>Tipo: ${getPokemonTypes(pokemon.types)}</p>
            <p>Altura: ${pokemon.height} decímetros</p>
            <p>Peso: ${pokemon.weight} hectogramos</p>
            <h3>Estadísticas:</h3>
            <ul>
                ${getPokemonStats(pokemon.stats)}
            </ul>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        `;

        pokemonDetails.innerHTML = "";
        pokemonDetails.appendChild(closeIcon);
        pokemonDetails.appendChild(detailsContent);
        pokemonDetails.style.right = "0";
    }

    // Función para obtener tipos de Pokémon
    function getPokemonTypes(types) {
        return types.map(type => type.type.name).join(", ");
    }

    // Función para obtener estadísticas del Pokémon
    function getPokemonStats(stats) {
        return stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("");
    }

    // Función para cerrar el panel lateral
    function closeDetailsPanel() {
        pokemonDetails.style.right = "-300px";
    }

    // Función para rellenar un número con ceros (para IDs de 3 dígitos)
    function pad(num, size) {
        let s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    }

    // Función para mostrar Pokémon filtrados
    function displayFilteredPokemon(pokemonArray) {
        pokemonContainer.innerHTML = "";
        if (pokemonArray.length === 0) {
            pokemonContainer.innerHTML = "No se encontraron resultados.";
        } else {
            pokemonArray.forEach(pokemon => createPokemonCard(pokemon));
        }
    }

    // Función para filtrar Pokémon por tipo
    function filterPokemonByType() {
        const selectedType = filterSelect.value.toLowerCase();

        if (selectedType === "todos") {
            displayFilteredPokemon(allPokemonData);
            resetButton.style.display = "none";
        } else {
            const filteredPokemon = allPokemonData.filter(pokemon => {
                return pokemon.types.some(type => type.type.name === selectedType);
            });
            displayFilteredPokemon(filteredPokemon);
            resetButton.style.display = "block";
        }
    }

    // Función para restablecer la vista de Pokémon
    function resetPokemonView() {
        displayFilteredPokemon(allPokemonData);
        resetButton.style.display = "none";
        filterSelect.value = "todos";
    }

    // Función para buscar Pokémon por ID o nombre
    function searchPokemon() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const foundPokemon = allPokemonData.filter(pokemon => {
            return (
                pokemon.id.toString() === searchTerm ||
                pokemon.name.toLowerCase().includes(searchTerm)
            );
        });

        if (foundPokemon.length > 0) {
            resetButton.style.display = "block"; // Mostrar el botón de reinicio
            displayFilteredPokemon(foundPokemon); // Mostrar los Pokémon encontrados
        } else {
            resetPokemonView(); // Restablecer la vista de Pokémon
            resetButton.style.display = "none"; // Ocultar el botón de reinicio
            alert("No se encontró ningún Pokémon con ese ID o nombre.");
        }
    }

    // Función para animar el Pokémon
    function animatePokemon(pokemon, card) {
        card.classList.add("animated"); // Agrega una clase "animated" para activar la animación
        card.style.animation = "moveRight 1s linear"; // Define una animación CSS llamada "moveRight"
        card.style.animationFillMode = "forwards";

        // Elimina la animación después de un cierto período de tiempo (ajusta el valor según tus preferencias)
        setTimeout(() => {
            card.style.animation = "";
            card.classList.remove("animated");
        }, 1000); // 1000 ms (1 segundo) en este ejemplo
    }

    // Cargar más Pokémon al hacer clic en el botón
    loadMoreButton.addEventListener("click", () => {
        fetchPokemon();
    });

    // Filtrar Pokémon por tipo al cambiar la selección
    filterSelect.addEventListener("change", () => {
        filterPokemonByType();
    });

    // Restablecer la vista de Pokémon al hacer clic en "Restablecer"
    resetButton.addEventListener("click", () => {
        resetPokemonView();
    });

    // Agregar manejador de eventos para el botón de búsqueda
    searchButton.addEventListener("click", () => {
        searchPokemon();
    });

    // Cargar los primeros Pokémon al cargar la página
    fetchPokemon();
});
