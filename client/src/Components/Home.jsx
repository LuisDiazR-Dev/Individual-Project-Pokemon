// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

// ? Components
import Cards from './Cards'

// ? Actions
import { getAllPokemons, getTypes } from '../Redux/Action'

const Home = () => {
	const dispatch = useDispatch()
	const allPokemon = useSelector((state) => state.pokemonList)
	const searchedPokemon = useSelector((state) => state.searchedPokemon)
	const types = useSelector((state) => state.types)

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				if (!allPokemon.length) {
					await dispatch(getAllPokemons())
				}
				if (!types.length) {
					// Verifica si los tipos ya están cargados
					await dispatch(getTypes())
				}
			} catch (err) {
				setError('Error fetching Pokémon or types')
			} finally {
				setLoading(false)
			}
		}

		fetchInitialData()
	}, [dispatch, allPokemon.length, types.length])

	const displayPokemons = searchedPokemon.length ? searchedPokemon : allPokemon

	if (error) return <div>{error}</div>
	if (loading)
		return (
			<div>
				<h2>Cargando PequeDex...</h2>
			</div>
		)

	return (
		<div>
			<h2>Esto es Home y están todos los pokemons</h2>
			<div>
				<Cards allPokemon={displayPokemons} />
			</div>
		</div>
	)
}

export { Home }
