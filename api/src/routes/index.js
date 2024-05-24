const router = require('express').Router()

// * Controllers imports
const allPokemons = require ('../handlers/allPokemons.js')
const addPokemon = require ('../handlers/createPokemon.js')
const getPokemonById = require ('../controllers/ApiGetPokemonById.js') 

// * Rutas

//------------------Get
router.get('/pokemons', allPokemons )
router.get('/pokemons/:id', getPokemonById)



//------------------Post
router.post('/agregar', addPokemon  )




module.exports = router;
