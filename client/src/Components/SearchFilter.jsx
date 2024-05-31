import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const SearchFilter = () => {
	const types = useSelector((state) => state.types)

	const [selectedCheckbox, setSelectedCheckbox] = useState({
		all: false,
		API: false,
		DB: false,
		type: false,
	})

	const [selectedType, setSelectedType] = useState('')

	const handleCheckboxChange = (event) => {
		const { id, checked } = event.target

		if (id === 'all' && checked) {
			setSelectedCheckbox({
				all: true,
				API: false,
				DB: false,
				type: false,
			})
		} else {
			setSelectedCheckbox((prevState) => ({
				...prevState,
				[id]: checked,
				all: false, // Deselecciona "Todos" si se selecciona otro checkbox
			}))
		}
	}

	const handleSelectChange = (event) => {
		setSelectedType(event.target.value)
	}

	useEffect(() => {
		console.log('Checkbox seleccionado:', selectedCheckbox)
	}, [selectedCheckbox])

	useEffect(() => {
		console.log('Tipo seleccionado:', selectedType)
	}, [selectedType])

	return (
		<DivStyled className="filters">
			<div className="selectSource">
				<span>Filtro por:</span>
				<div>
					<span>
						<label>
							Todos:
							<input
								type="checkbox"
								id="all"
								checked={selectedCheckbox.all}
								onChange={handleCheckboxChange}
							/>
						</label>
					</span>

					<span>
						<label htmlFor="API">
							API:
							<input
								type="checkbox"
								id="API"
								checked={selectedCheckbox.API}
								onChange={handleCheckboxChange}
							/>
						</label>
					</span>

					<span>
						<label htmlFor="DB">
							DB:
							<input
								type="checkbox"
								id="DB"
								checked={selectedCheckbox.DB}
								onChange={handleCheckboxChange}
							/>
						</label>
					</span>

					<span>
						<label htmlFor="type">
							Tipo:
							<input
								type="checkbox"
								id="type"
								checked={selectedCheckbox.type}
								onChange={handleCheckboxChange}
							/>
						</label>
						{selectedCheckbox.type && (
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
		</DivStyled>
	)
}

export { SearchFilter }

// ? styled
const DivStyled = styled.div`
	/* display: flex; */
	align-items: center;
	border: none;
	border-bottom: 1px solid #fafafa48;
	border-radius: 20px;
	margin: 12px auto;
	height: 58px;
	max-width: 600px;

	span {
		padding: 0 12px;
	}

	.type-list {
		margin-top: 10px;
	}
`
