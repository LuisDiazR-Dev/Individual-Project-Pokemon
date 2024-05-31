// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

// ? Components
import Cards from './Cards'
import styled from 'styled-components'
// import { SearchFilter } from './SearchFilter'

// ? Actions
import { getAllPokemons, getTypes } from '../Redux/Action'

const Home = () => {
	const dispatch = useDispatch()
	const allPokemon = useSelector((state) => state.pokemonList)
	const searchedPokemon = useSelector((state) => state.searchedPokemon)
	const types = useSelector((state) => state.types)

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				if (!allPokemon.length) {
					await dispatch(getAllPokemons())
				}
				if (types.length) {
					// Verifica si los tipos ya están cargados
					await dispatch(getTypes())
				}
			} catch (err) {
				setError('Error fetching Pokémon or types')
			} finally {
				setLoading(false)
			}
		}

		fetchInitialData()
	}, [dispatch, allPokemon.length, types.length])

	// ? filtros y ordenamientos

	const [selectedFilter, setSelectedFilter] = useState('all')
	const [selectedType, setSelectedType] = useState('')
	const [typeCheckbox, setTypeCheckbox] = useState(false)

	const handleRadioChange = (event) => {
		setSelectedFilter(event.target.id)
	}

	const handleTypeCheckboxChange = (event) => {
		setTypeCheckbox(event.target.checked)
		if (!event.target.checked) {
			setSelectedType('')
		}
	}

	const handleSelectChange = (event) => {
		setSelectedType(event.target.value)
	}
	//? Auxiliares
	useEffect(() => {
		console.log('Checkbox seleccionado:', selectedFilter)
	}, [selectedFilter])

	useEffect(() => {
		console.log('Tipo seleccionado:', selectedType)
	}, [selectedType])

	// ? --------------------------------end filtros y ordenamientos

	const displayPokemons = searchedPokemon.length ? searchedPokemon : allPokemon
	console.log(displayPokemons)

	// ? filtros y ordenamientos ()

	const filteredPokemons = displayPokemons
		.filter((pokemon) => {
			if (selectedFilter === 'all') {
				return true
			}
			if (selectedFilter === 'API' && pokemon.src === false) {
				return true
			}
			if (selectedFilter === 'DB' && pokemon.src === true) {
				return true
			}
			return false
		})
		.filter((pokemon) => {
			if (typeCheckbox && selectedType) {
				return pokemon.types.includes(selectedType)
			}
			return true
		})

	if (error) return <div>{error}</div>
	if (loading)
		return (
			<div>
				<h2>Cargando PokeDex...</h2>
			</div>
		)

	return (
		<div>
			<DivStyled className="filters">
				<div className="selectSource">
					<span>Filtro por:</span>
					<div>
						<span>
							<label>
								Todos:
								<input
									type="radio"
									id="all"
									checked={selectedFilter === 'all'}
									onChange={handleRadioChange}
								/>
							</label>
						</span>

						<span>
							<label>
								API:
								<input
									type="radio"
									id="API"
									checked={selectedFilter === 'API'}
									onChange={handleRadioChange}
								/>
							</label>
						</span>

						<span>
							<label>
								DB:
								<input
									type="radio"
									id="DB"
									checked={selectedFilter === 'DB'}
									onChange={handleRadioChange}
								/>
							</label>
						</span>

						<span>
							<label>
								Tipo:
								<input
									type="checkbox"
									id="type"
									checked={typeCheckbox}
									onChange={handleTypeCheckboxChange}
								/>
							</label>
							{typeCheckbox && (
								<select
									name="types"
									value={selectedType}
									onChange={handleSelectChange}
								>
									<option value="">Seleccione un tipo</option>
									{types.map((type) => (
										<option key={type.id} value={type.name}>
											{type.name}
										</option>
									))}
								</select>
							)}
						</span>
					</div>
				</div>
				<div>
					<span>Ordenar:</span>
					<div>
						<span>
							<label>
								Asd
								<input type="radio" id="asd" checked={''} onChange={''} />
							</label>
						</span>
						<span>
							<label>
								Desc
								<input type="radio" id="desc" checked={''} onChange={''} />
							</label>
						</span>
					</div>
				</div>
			</DivStyled>

			<div>
				<Cards allPokemon={filteredPokemons} />
			</div>
		</div>
	)
}

export { Home }

// ? styled
const DivStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #fafafa48;
	border-radius: 20px;
	margin: 12px auto;
	height: 58px;
	font-weight: 600;
	span {
		padding: 0 12px;
	}

	.type-list {
		margin-top: 10px;
	}
`
