// const { Router } = require('express');
// const router = Router();

const router = require('express').Router()

// * Controllers imports
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const apiGetAllPokemon = require('../controllers/ApiGetAllPokemon')

// * Rutas
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use()
//------------------Get
router.get('/home', apiGetAllPokemon )


//------------------Post
// router.post('/addDog', postDogsDB  )

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
