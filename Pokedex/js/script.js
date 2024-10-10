const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const backgroundType = document.querySelector('.background_type');

const form = document.querySelector('.form');
const input = document.querySelector('.input_busca');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');


let searchPokemon = 1;


const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
     const data = await APIResponse.json()
     return data;
    }
}

const typeColors = {
  normal: 'linear-gradient(270deg, #A8A878, #FFF)',
  fire: 'linear-gradient(270deg, #F08030, #FFF)',
  water: 'linear-gradient(270deg, #6890F0, #FFF)',
  grass: 'linear-gradient(270deg, #78C850, #FFF)',
  flying: 'linear-gradient(270deg, #A890F0, #FFF)',
  fighting: 'linear-gradient(270deg, #C03028, #FFF)',
  poison: 'linear-gradient(270deg, #A040A0, #FFF)',
  electric: 'linear-gradient(270deg, #F8D030, #FFF)',
  ground: 'linear-gradient(270deg, #E0C068, #FFF)',
  rock: 'linear-gradient(270deg, #B8A038, #FFF)',
  psychic: 'linear-gradient(270deg, #F85888, #FFF)',
  ice: 'linear-gradient(270deg, #98D8D8, #FFF)',
  bug: 'linear-gradient(270deg, #A8B820, #FFF)',
  ghost: 'linear-gradient(270deg, #705898, #FFF)',
  steel: 'linear-gradient(270deg, #B8B8D0, #FFF)',
  dragon: 'linear-gradient(270deg, #7038F8, #FFF)',
  dark: 'linear-gradient(270deg, #705848, #FFF)',
  fairy: 'linear-gradient(270deg, #EE99AC, #FFF)'
};

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    
    const data = await fetchPokemon(pokemon);

    if (data) {
      
      pokemonName.innerHTML = data.name;
      pokemonNumber.innerHTML = data.id;
      pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
      pokemonImg.style.display = 'block';
      input.value = ''; 
      searchPokemon = data.id;
      const pokemonType = data['types']['0']['type']['name'];
      backgroundType.style.background = typeColors[pokemonType];
    } else {
      pokemonName.innerHTML = 'Não encontrado :/';
      pokemonNumber;innerHTML = '';
      pokemonImg.style.display = 'none';
      backgroundType.style.background = '#555';
    }


}

form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);  
    }  
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);   
});
renderPokemon(searchPokemon);
