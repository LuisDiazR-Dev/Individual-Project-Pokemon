// ? Hooks
import { useState } from 'react' //inicializando estado
import { useDispatch } from 'react-redux'

// ? components

import { searchPokemonById } from '../Redux/Action'

// *
const NavBarSearch = () => {
	const [id, setId] = useState('') //definiendo estado en relación a un id
	//id como referencia pero puede ser cualquier nombre

	const dispatch = useDispatch()

	const handleChange = (event) => {
		setId(event.target.value)
	}

	// * search Pokemon
	const handleOnClick = () => {
		if (id) {
			dispatch(searchPokemonById(id))
			setId('')
		}
	}

	return (
		<div>
			<input
				style={{ height: '1.5rem' }}
				type="search"
				value={id}
				onChange={handleChange}
				required
			/>
			<button onClick={handleOnClick}>Buscar</button>
		</div>
	)
}
export default NavBarSearch
