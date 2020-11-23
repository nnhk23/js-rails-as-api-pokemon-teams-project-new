const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    getAllTrainers()
})

function getAllTrainers() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        generateAllTrainers(json)
    })   
}

function generateAllTrainers(trainers) {
    trainers.forEach(trainer => {
        
        const main = document.querySelector('main')
        const div = document.createElement('div')
        const p = document.createElement('p')
        const btn = document.createElement('button')
        const ul = document.createElement('ul')
        
        div.className = 'card'
        div.dataset.id = trainer.id
        
        p.innerText = trainer.name
        
        btn.innerText = "Add Pokemon"
        btn.dataset.trainer_id = trainer.id   
        btn.addEventListener('click', (e) => addPokemon(e, trainer))
        
        trainer.pokemons.forEach(pokemon => {
            // const pokeItem = 
            generateEachPokemon(ul, pokemon)
            // ul.appendChild(pokeItem)
        })

        div.append(p, btn, ul)
        main.appendChild(div)
    })
}

function generateEachPokemon(ul, pokemon, e) {
    const li = document.createElement('li')
    const pokeBtn = document.createElement('button')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    pokeBtn.innerText = "Release"
    pokeBtn.className = 'release'
    pokeBtn.dataset.pokemonID = pokemon.id
    pokeBtn.addEventListener('click', (event) => deletePoke(event, pokemon))
    // console.dir(pokeBtn)

    li.appendChild(pokeBtn)
    // return li  
    if(!ul) {
        ul = e.target.parentNode.lastElementChild
    }
    return ul.appendChild(li)
}

function deletePoke (e, pokemon) {
    let poke = e.target.parentNode
    const id = pokemon.id
    // console.log(e.target.parentNode)
    e.target.parentNode.remove()

    const pokeObj = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify(poke)
    }

    fetch(POKEMONS_URL + `/${id}`, pokeObj)
}

function addPokemon(event, trainer) {
    // debugger
    let pokeObj = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            trainer_id: trainer.id
        })
    }

    fetch(POKEMONS_URL, pokeObj)
    .then(r => r.json())
    .then(pokemon => {
        generateEachPokemon(undefined, pokemon, event)
        const list = document.querySelector('ul')
        ul.innerHTML += ` <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    })                                         
}

// function addPokemonToDom(pokemon, e) {
//   if(pokemon.message){
//     alert(pokemon.message)
//   } else {
//   }
// }