// const { Router } = require('express');
// const router = Router();

const router = require('express').Router()

// * Controllers imports
const allPokemons = require ('../handlers/allPokemons.js')

// * Rutas

//------------------Get
router.get('/pokemons', allPokemons )


//------------------Post
// router.post('/addDog', postDogsDB  )

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
