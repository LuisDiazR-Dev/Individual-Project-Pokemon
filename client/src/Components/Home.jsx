// ? Hooks
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

// ? Components
import styled from 'styled-components'
import Cards from './Cards'
import Pagination from './pagination'

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
				if (!types.length) {
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
	}, [dispatch, allPokemon.length, types.length, allPokemon, types])

	// ? filtros y ordenamientos

	const [selectedFilter, setSelectedFilter] = useState('all')
	const [selectedType, setSelectedType] = useState('')
	const [typeCheckbox, setTypeCheckbox] = useState(false)
	const [sortOrder, setSortOrder] = useState('asc')

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
		//todo  volver a 1 cuando types tenga un valor seleccionado
		setCurrentPage(1)
	}

	const handleSortChange = (event) => {
		setSortOrder(event.target.id)
	}

	//? Auxiliares
	useEffect(() => {
		console.log('Checkbox seleccionado:', selectedFilter)
	}, [selectedFilter])

	useEffect(() => {
		console.log('Tipo seleccionado:', selectedType)
	}, [selectedType])

	useEffect(() => {
		console.log('Orden seleccionado:', sortOrder)
	}, [sortOrder])

	// ? --------------------------------end filtros y ordenamientos

	const displayPokemons = searchedPokemon.length ? searchedPokemon : allPokemon
	console.log(displayPokemons)

	// ? pagination
	const [pokemonsPerPage, setPokemonsPerPage] = useState(12)
	const [currentPage, setCurrentPage] = useState(1)
	const lastIndex = currentPage * pokemonsPerPage
	const firstIndex = lastIndex - pokemonsPerPage

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
		.sort((a, b) => {
			if (sortOrder === 'asc') {
				return a.name.localeCompare(b.name)
			} else if (sortOrder === 'desc') {
				return b.name.localeCompare(a.name)
			} else if (sortOrder === 'max-attack') {
				return b.attack - a.attack
			} else if (sortOrder === 'min-attack') {
				return a.attack - b.attack
			}
			return 0
		})

	// ? pagination
	const totalPokemons = filteredPokemons.length
	const pageOfPokemons = filteredPokemons.slice(firstIndex, lastIndex)

	// ? render
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
								<select name="types" value={selectedType} onChange={handleSelectChange}>
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
								<input
									type="radio"
									id="asc"
									checked={sortOrder === 'asc'}
									onChange={handleSortChange}
								/>
							</label>
						</span>
						<span>
							<label>
								Desc
								<input
									type="radio"
									id="desc"
									checked={sortOrder === 'desc'}
									onChange={handleSortChange}
								/>
							</label>
						</span>
						<span>
							<label>
								+Atc
								<input
									type="radio"
									id="max-attack"
									checked={sortOrder === 'max-attack'}
									onChange={handleSortChange}
								/>
							</label>
						</span>
						<span>
							<label>
								-Atc
								<input
									type="radio"
									id="min-attack"
									checked={sortOrder === 'min-attack'}
									onChange={handleSortChange}
								/>
							</label>
						</span>
					</div>
				</div>
			</DivStyled>

			<div>
				<Cards allPokemon={pageOfPokemons} />
			</div>

			{pageOfPokemons.length === 0 && (
				<DivAlert>
					<span>No hya Registros de pokemons del tipo seleccionado en la API o DB</span>
				</DivAlert>
			)}

			<div>
				<Pagination
					totalPokemons={totalPokemons}
					pokemonsPerPage={pokemonsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
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

const DivAlert = styled.div`
	display: flex;
	align-items: center;
	border: 1px solid #fafafa48;
	background-color: #00000047;
	border-radius: 20px;

	width: 50%;
	height: 50vh;

	margin: 12px auto;
	font-weight: 600;

	span {
		padding: 0 12px;
		/* margin: auto;
		width: 50%; */
	}
`
