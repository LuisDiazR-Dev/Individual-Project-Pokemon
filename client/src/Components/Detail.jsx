import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DetailCard from './DetailCard'

const Detail = () => {
	const { id } = useParams()
	const [pokeDetail, setPokeDetail] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchPokeDetail = async () => {
			try {
				const response = await axios.get(`http://localhost:3001/pokemons/${id}`)
				console.log('Response:', response.data) // Log the response data

				const data = response.data
				const formattedData = {
					src: data.src, // false indicating that it is from the API
					id: data.id,
					name: data.name,
					image: data.image,
					hp: data.hp,
					attack: data.attack,
					defense: data.defense,
					speed: data.speed,
					height: data.height,
					weight: data.weight,
					types: data.types,
				}

				setPokeDetail(formattedData)
			} catch (error) {
				console.error('Error fetching Pokémon details:', error)
				setError('Error fetching Pokémon details')
			} finally {
				setLoading(false)
			}
		}

		fetchPokeDetail()
	}, [id])

	if (error) return <div>{error}</div>
	if (loading)
		return (
			<div>
				<h2>Cargando Detalles...</h2>
			</div>
		)

	return (
		<div>
			<h1>Soy detalle</h1>
			<DetailCard pokeDetail={pokeDetail} />
		</div>
	)
}

export default Detail
