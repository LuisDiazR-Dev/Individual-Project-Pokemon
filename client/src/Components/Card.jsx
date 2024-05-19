import styled from 'styled-components'

import { Link } from 'react-router-dom'

const Card = ({
	src,
	id,
	name,
	image,
	hp,
	attack,
	defense,
	speed,
	heigth,
	weigth,
	types,
}) => {
	return (
		<CardDiv className="card">
			<div>
				<h2>{name}</h2>
			</div>
			{/* <Link to={`/detail/${id}`}> <img src={image} alt={name} /> </Link> */}
			<Link to={`/`}>
				<img src={image} alt={name} />{' '}
			</Link>
			<div>
				<h3>Tipo</h3>

				{types.map((type, index) => (
					// <button key={index}>{type}</button>
					<span key={index}>{type}</span>
				))}
			</div>
		</CardDiv>
	)
}

export default Card

// ? styled
const CardDiv = styled.div`
	border: 1px solid #fafafa48;
	border-radius: 20px;
	margin: 4px auto;

	img {
		width: 256px;
		height: 200px;
	}
	h3,
	h2 {
		margin: 0;
		padding: 0;
	}
	span {
		display: inline-flex;
		padding: 12px 12px;
	}

	&:hover {
		cursor: pointer;
		background-color: #042e53;
	}
`

// display: flex;
// 	flex-direction: column;
// 	justify-content: space-between;
// 	text-align: center;
// 	width: 256px;
// 	height: 256px;
// 	margin: 8px auto;
// 	overflow: hidden;
// 	border-radius: 10px;
// 	border: 8px #00abc2 ridge;

// 	div:nth-child(1) {
// 		display: flex;
// 		/* border: 1px red solid; */
// 		justify-content: space-between;

// 		button {
// 			width: 33%;
// 			font-size: 1.2em;
// 		}
// 	}
// 	img {
// 		max-width: 100%;
// 		height: auto;
// 	}
