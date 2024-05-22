const router = require('express').Router()

// * Controllers imports
const allPokemons = require ('../handlers/allPokemons.js')
const addPokemon = require ('../handlers/createPokemon.js')

// * Rutas

//------------------Get
router.get('/pokemons', allPokemons )



//------------------Post
router.post('/agregar', addPokemon  )




module.exports = router;
