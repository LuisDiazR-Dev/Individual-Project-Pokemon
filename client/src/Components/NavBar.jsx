// ? Hooks
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

// ? components
import NavBarSearch from './NavBarSearch'

// *
const NavBar = () => {
	// * Login Out
	const navigate = useNavigate()
	const logOut = (event) => {
		if (event) navigate('/')
	}

	return (
		<NavBarSection>
			<div>
				<Link to={'/pokemons'}>
					{/* todo:  para que se reinicie home cuando de demos click, debe ejecutarse el dispatch */}
					<h1>PokeApp</h1>
				</Link>
			</div>

			<div className="nav">
				<NavBarSearch />

				<button>Agregar</button>
				<button onClick={logOut}>Log out</button>
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
