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
        // btn.addEventListener('click', )
        
        trainer.pokemons.forEach(pokemon => {
            const pokeItem = generateEachPokemon(pokemon)
            ul.appendChild(pokeItem)
        })

        // debugger

        div.append(p, btn, ul)
        main.appendChild(div)
    })
}

function generateEachPokemon(pokemon) {
    const li = document.createElement('li')
    const pokeBtn = document.createElement('button')
    
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    
    pokeBtn.innerText = "Release"
    pokeBtn.className = 'release'
    pokeBtn.dataset.pokemonID = pokemon.id
    pokeBtn.addEventListener('click', (e) => deletePoke(e, pokemon))
    // console.dir(pokeBtn)

    li.appendChild(pokeBtn)
    return li  
}

function deletePoke (e, pokemon) {
    e.target.parentNode.remove()
    const id = pokemon.id

    const pokeObj = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            "id": id,
            "nickname": pokemon.nickname,
            "species": pokemon.species,
            "trainer_id": pokemon.trainer_id
        })
    }

    fetch(POKEMONS_URL + `/${id}`, pokeObj)
    .then(resp => resp.json())
    .then(console.log)
}