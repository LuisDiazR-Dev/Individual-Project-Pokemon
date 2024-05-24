import { CardDiv } from './Card'

const DetailCard = ({ pokeDetail }) => {
	const {
		src = false,
		id = '',
		name = 'Unknown',
		image = '',
		hp = 0,
		attack = 0,
		defense = 0,
		speed = 0,
		height = 0,
		weight = 0,
		types = [],
	} = pokeDetail || {} // Desestructuramos con un valor predeterminado si pokeDetail es null

	return (
		<CardDiv className="card">
			<div className="header">
				<h2>{name}</h2>
				<span className="src">{src === false ? 'API' : 'BD'}</span>
			</div>

			<div className="image">
				<img src={image} alt={name} />

				<div className="stats">
					<div>
						<span>HP: {hp}</span>
						<span>Attack: {attack}</span>
						<span>Defense: {defense}</span>
					</div>
					<div>
						<span>Speed: {speed}</span>
						<span>Height: {height}</span>
						<span>Weight: {weight}</span>
					</div>
				</div>
			</div>

			<div className="footer">
				<h3>Tipo</h3>

				{Array.isArray(types) && types.length > 0 ? (
					types.map((type, index) => <span key={index}>{type}</span>)
				) : (
					<span>No types available</span>
				)}
			</div>
		</CardDiv>
	)
}

export default DetailCard
