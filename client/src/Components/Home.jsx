// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// ? Components
import Cards from './Cards'

// ? Actions
import { getAllPokemons } from '../Redux/Action'

const Home = () => {
	const dispatch = useDispatch()
	const allPokemon = useSelector((state) => state.pokemonList)
	const searchedPokemon = useSelector((state) => state.searchedPokemon)

	useEffect(() => {
		dispatch(getAllPokemons())
	}, [dispatch])

	console.log(allPokemon)
	// ejecutar la función que me genera el dispatch que me trae el estado del store/reducer

	return (
		<div>
			<h2>Esto es Home y están todos los pokemons</h2>
			<div>
				<Cards allPokemon={allPokemon} searchedPokemon={searchedPokemon} />
			</div>
		</div>
	)
}

export { Home }
