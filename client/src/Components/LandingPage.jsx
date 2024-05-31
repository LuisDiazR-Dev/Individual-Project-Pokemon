import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LandingPage = () => {
	return (
		<SectionStyled>
			<div className="container">
				<div className="access">
					<h2>¡Bienvenido a mi PokeApp!</h2>
					<Link to={`/pokemons`}>
						<button>Acceder</button>
					</Link>
				</div>
			</div>
		</SectionStyled>
	)
}

export default LandingPage

// ? styles

const SectionStyled = styled.section`
	/* margin: 0; */
	display: flex;
	place-items: center;
	/* min-width: 320px; */
	min-height: 100vh;

	.container {
		display: flex;
		place-items: center;
		/* align-items: baseline; */

		width: 100%;
		/* Ajusta la altura según tus necesidades */
		height: 500px;
		background-image: url('https://i.blogs.es/4762d0/pokemon-blue-red/1024_2000.webp'); /* Ruta de la imagen */
		background-size: cover; /* Asegura que la imagen cubra todo el área del div */
		background-position: center; /* Centra la imagen en el div */
		background-repeat: no-repeat; /* Evita que la imagen se repita */
		border-radius: 20px;

		/* background-color: #f0f0f0; Color de fondo de reserva */
	}

	div.access {
		text-align: center;
		color: black;

		min-width: 320px;
		/* max-width: 1280px; */

		margin: 0 auto;
		padding: 2rem;

		border-radius: 20px;
		border: 1px solid #fafafa48;
		background-color: #fafafacf;
	}
`
