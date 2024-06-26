const router = require('express').Router()

// * Controllers imports
const allPokemons = require ('../handlers/allPokemons.js')
const addPokemon = require ('../handlers/createPokemon.js')
const getPokemonById = require ('../controllers/ApiGetPokemonById.js') 
const SearchPokemonByName = require('../handlers/searchPokemonByName.js')
const getTypes = require('../handlers/getTypesApiDb.js')
const checkPokemonName = require('../handlers/checkPokemonName.js')

// * Rutas

//------------------Get
router.get('/pokemons', allPokemons )
router.get('/pokemons/name', SearchPokemonByName)
router.get('/pokemons/:id', getPokemonById)
router.get('/types', getTypes)
router.get('/check/:name', checkPokemonName);


//------------------Post
router.post('/agregar', addPokemon  )




module.exports = router;
