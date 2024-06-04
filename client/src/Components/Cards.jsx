import styled from 'styled-components'

// ? components
import Card from './Card'

const Cards = ({ allPokemon }) => {
	return (
		<CardsDiv>
			{allPokemon.map((pokemon) => (
				<Card
					src={pokemon.src}
					key={pokemon.id}
					id={pokemon.id}
					name={pokemon.name}
					image={pokemon.image}
					hp={pokemon.hp}
					attack={pokemon.attack}
					defense={pokemon.defense}
					speed={pokemon.speed}
					height={pokemon.height}
					weight={pokemon.weight}
					types={pokemon.types}
				/>
			))}
		</CardsDiv>
	)
}

export default Cards

// ? Styles
const CardsDiv = styled.section`
	display: flex;
	justify-content: center;
	align-items: start;
	flex-wrap: wrap;
`

// {searchedPokemon ? (
// 	<div key={searchedPokemon.id}>
// 		<h3>{searchedPokemon.name}</h3>
// 		<img src={searchedPokemon.image} alt={searchedPokemon.name} />
// 	</div>
// ) : (
// 	allPokemon.map((pokemon) => (
// 		<div key={pokemon.id}>
// 			<h3>{pokemon.name}</h3>
// 			<img src={pokemon.image} alt={pokemon.name} />
// 		</div>
// 	))
// )}
