import styled from 'styled-components'

import { Link } from 'react-router-dom'

const Card = ({
	src = 'API',
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
}) => {
	return (
		<CardDiv className="card">
			<div className="header">
				<h2>{name}</h2>

				<span className="src">{src === 'API' ? 'API' : 'BD'}</span>
			</div>
			{/* <Link to={`/detail/${id}`}> <img src={image} alt={name} /> </Link> */}
			<Link to={`/`}>
				<img src={image} alt={name} />{' '}
			</Link>
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

export default Card

// ? styled
const CardDiv = styled.div`
	border: 1px solid #fafafa48;
	border-radius: 20px;
	margin: 4px auto;

	h3,
	h2 {
		margin: 0;
		padding: 0;
	}

	img {
		width: 256px;
		height: 200px;
		padding: 12px 0;
	}
	span {
		padding: 0 12px;
	}

	&:hover {
		cursor: pointer;
		background-color: #042e53;
	}

	div.header {
		display: flex;
		justify-content: space-around;
		align-items: center;

		h2 {
			width: 80%;
		}
	}

	span.src {
		border-left: 1px solid #fafafa48;
		border-bottom: 1px solid #fafafa48;
		border-radius: 0 20px 0 0;
		width: 20%;
		padding: 6px 0;
	}

	div.footer {
		border-top: 1px solid #fafafa48;
		padding-bottom: 4px;

		span {
			padding: 0 12px;
		}
	}
`
