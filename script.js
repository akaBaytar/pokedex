// dom variables
const container = document.querySelector(".container");
const searchDOM = document.querySelector("input");
const button = document.querySelector("button");

//variables
const count = 1011;
const colors = {
  Fire: "#FDDFDF",
  Grass: "#DEFDE0",
  Electric: "#FCF7DE",
  Water: "#DEF3FD",
  Ground: "#f4e7da",
  Rock: "#d5d5d4",
  Dark: "#aaa",
  Fairy: "#fceaff",
  Poison: "#98d7a5",
  Bug: "#f8d5a3",
  Dragon: "#97b3e6",
  Steel: "#b0b3b7",
  Psychic: "#eaeda1",
  Ghost: "#eee",
  Flying: "#F5F5F5",
  Fighting: "#E6E0D4",
  Normal: "#F5F5F5",
  Ice: "#c2e0f9",
};

//fetch api
async function fetchPokemon() {
  for (i = 1; i < count; i++) {
    await getPokemon(i);
  }
}

async function getPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createCard(data);
}

//function
function createCard(data) {
  let name = data.name[0].toUpperCase() + data.name.slice(1);
  let id = data.id.toString().padStart(3, "0");

  let type =
    data.types[0].type.name[0].toUpperCase() + data.types[0].type.name.slice(1);

  let abilities =
    data.abilities[0].ability.name[0].toUpperCase() +
    data.abilities[0].ability.name.slice(1);

  let abilities2 = data.abilities[1]
    ? data.abilities[1].ability.name[0].toUpperCase() +
      data.abilities[1].ability.name.slice(1)
    : "";

  let color = colors[type];

  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = `${color}`;

  const cardInnerHTML = `
    <div class="img-container">
        <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          data.id
        }.png"
        alt="${name}"
        />
    </div>
    <div class="info">
        <span class="id">#${id}</span>
        <h2 class="name">${name}</h2>
        <strong class="type"><span>${type}</span></strong>
        <p class="abilities"><span>${abilities + ", " + abilities2}</span></p>
        <div class="meta">
          <small class="weight"><span>${data.weight}</span> lbs</small>|
          <small class="stat"><span>${data.stats[0].base_stat}</span> HP</small>
        </div>
    </div>
    `;
  card.innerHTML = cardInnerHTML;
  container.appendChild(card);
}
fetchPokemon();
//event listeners
searchDOM.addEventListener("input", () => {
  const names = document.querySelectorAll(".name");
  const search = searchDOM.value.toLowerCase();
  names.forEach((name) => {
    const card = name.parentNode.parentNode;
    card.style.display = "flex";
    if (!name.innerHTML.toLowerCase().includes(search)) {
      card.style.display = "none";
    }
  });
});

button.addEventListener("click", (e) => {
  e.preventDefault();
});
