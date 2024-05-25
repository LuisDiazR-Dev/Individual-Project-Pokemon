// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

// ? Components
import Cards from './Cards'

// ? Actions
import { getAllPokemons } from '../Redux/Action'

const Home = () => {
	const dispatch = useDispatch()
	const allPokemon = useSelector((state) => state.pokemonList)
	const searchedPokemon = useSelector((state) => state.searchedPokemon)

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPokemons = async () => {
			if (!allPokemon.length) {
				try {
					await dispatch(getAllPokemons())
				} catch (err) {
					setError('Error fetching Pokémon')
				} finally {
					setLoading(false)
				}
			} else {
				setLoading(false)
			}
		}

		fetchPokemons()
	}, [dispatch, allPokemon.length])

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
