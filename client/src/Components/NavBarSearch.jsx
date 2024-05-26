import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { searchPokemonByName } from '../Redux/Action'

const NavBarSearch = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [name, setName] = useState('')

	const handleChange = (event) => {
		setName(event.target.value.toLowerCase())
	}

	const handleOnClick = () => {
		if (name) {
			dispatch(searchPokemonByName(name))
			setName('')
		}
	}
	const searchedPokemon = (event) => {
		if (event) navigate('/pokemons')
	}

	return (
		<div>
			<input
				style={{ height: '1.5rem' }}
				type="search"
				value={name}
				onChange={handleChange}
				required
			/>
			<button onClick={(searchedPokemon, handleOnClick)}>Buscar</button>
		</div>
	)
}

export default NavBarSearch
