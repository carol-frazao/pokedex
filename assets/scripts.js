const pokemon_number = document.querySelector(".pokemon_number");
const pokemon_name = document.querySelector(".pokemon_name");
const pokemon_image = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input_search = document.querySelector(".pokemon_search");
const prev_btn = document.querySelector(".prev_btn");
const next_btn = document.querySelector(".next_btn");

let contador = 1;

async function fetchPokemon(pokemon) {
  const pokemonAPI = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (pokemonAPI.status == 200) {
    const respostaAPI = await pokemonAPI.json();
    return respostaAPI;
  }
}

async function renderPokemon(pokemon) {
  pokemon_number.innerHTML = "";
  pokemon_name.innerHTML = "Carregando...";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemon_number.innerHTML = data.id + " -";
    pokemon_name.innerHTML = data.name;
    pokemon_image.style.display = "block";
    pokemon_image.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    input_search.value = "";
    contador = data.id;
  } else {
    input_search.value = "";
    pokemon_image.style.display = "none";
    pokemon_number.innerHTML = "";
    pokemon_name.innerHTML = "Não encontrado";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  renderPokemon(input_search.value.toLowerCase());
});

next_btn.addEventListener("click", (e) => {
  if (contador >= 1) {
    contador += 1;
    renderPokemon(contador);
  }
});

prev_btn.addEventListener("click", (e) => {
  if (contador > 1) {
    contador -= 1;
    renderPokemon(contador);
  }
});

renderPokemon(contador);
