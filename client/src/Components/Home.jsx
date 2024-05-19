// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

// ? Components

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
				{searchedPokemon ? (
					<div key={searchedPokemon.id}>
						<h3>{searchedPokemon.name}</h3>
						<img src={searchedPokemon.image} alt={searchedPokemon.name} />
					</div>
				) : (
					allPokemon.map((pokemon) => (
						<div key={pokemon.id}>
							<h3>{pokemon.name}</h3>
							<img src={pokemon.image} alt={pokemon.name} />
						</div>
					))
				)}
			</div>
		</div>
	)
}

export { Home }
