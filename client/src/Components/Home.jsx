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
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				await dispatch(getAllPokemons())
			} catch (err) {
				setError('Error fetching Pokémon')
			} finally {
				setLoading(false)
			}
		}

		fetchPokemons()
	}, [dispatch])

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
				<Cards allPokemon={allPokemon} />
			</div>
		</div>
	)
}

export { Home }
