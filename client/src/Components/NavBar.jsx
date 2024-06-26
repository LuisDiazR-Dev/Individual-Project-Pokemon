// ? Hooks
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

// ? components
import NavBarSearch from './NavBarSearch'
import { useDispatch } from 'react-redux'
import { clearSearch } from '../Redux/Action'

// *
const NavBar = () => {
	// * Login Out
	const navigate = useNavigate()
	const logOut = (event) => {
		if (event) navigate('/')
	}

	// * reiniciar Home
	const dispatch = useDispatch()

	const clearSearchHandler = async () => {
		await dispatch(clearSearch())
	}

	return (
		<NavBarSection>
			<div>
				<Link to={'/pokemons'} onClick={clearSearchHandler}>
					<h1>PokeApp</h1>
				</Link>
			</div>

			<div className="nav">
				<NavBarSearch />

				<Link to={'/agregar'}>
					<button>Agregar</button>
				</Link>

				<button onClick={logOut}>LogOut</button>
			</div>
		</NavBarSection>
	)
}

export default NavBar

// ? Styles
const NavBarSection = styled.section`
	border: 1px solid #fafafa48;
	border-radius: 20px;
	padding: 0 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 50px;
	a > h1 {
		color: white;
		/* text-decoration: none; */
	}

	.nav {
		display: flex;
		align-items: center;
		height: 100%;

		div {
			padding: 0 0.5em;
		}
	}
`
