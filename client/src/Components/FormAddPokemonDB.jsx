import axios from 'axios'
import styled from 'styled-components'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTypes, getAllPokemons } from '../Redux/Action'

const AddPokemonForm = () => {
	const dispatch = useDispatch()
	const allTypes = useSelector((state) => state.types)

	useEffect(() => {
		dispatch(getTypes())
	}, [dispatch])

	const [formData, setFormData] = useState({
		name: '',
		image: '',
		hp: '',
		attack: '',
		defense: '',
		speed: 5,
		height: 5,
		weight: 5,
		types: [],
		newType: '',
	})

	const [selectedTypes, setSelectedTypes] = useState([])
	const [isOtherType, setIsOtherType] = useState(false)

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		})
	}

	const handleRandomValue = (field, min, max) => {
		const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
		setFormData({
			...formData,
			[field]: randomValue,
		})
	}

	const handleSelectType = (event) => {
		const { value } = event.target
		if (value === 'other') {
			setIsOtherType(true)
		} else {
			setIsOtherType(false)
			if (!selectedTypes.includes(value)) {
				setSelectedTypes([...selectedTypes, value])
			}
		}
	}

	const handleRemoveType = (type) => {
		setSelectedTypes(selectedTypes.filter((value) => value !== type))
	}

	// const handleImageUpload = (event) => {
	// 	const file = event.target.files[0]
	// 	if (file) {
	// 		const reader = new FileReader()
	// 		reader.onloadend = () => {
	// 			setFormData({ ...formData, image: reader.result })
	// 		}
	// 		reader.readAsDataURL(file)
	// 	}
	// }

	const validateForm = () => {
		const urlPattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocolo
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // dominio
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // dirección IP
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // puerto y ruta
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // cadena de consulta
				'(\\#[-a-z\\d_]*)?$',
			'i'
		)

		if (!formData.name || /\d/.test(formData.name)) {
			alert('El nombre no puede contener números y es obligatorio.')
			return false
		}

		if (formData.image && !urlPattern.test(formData.image)) {
			alert('Por favor ingresa una URL válida para la imagen.')
			return false
		}

		if (isNaN(formData.hp) || formData.hp <= 0) {
			alert('Por favor ingresa un valor válido para HP.')
			return false
		}

		if (isNaN(formData.attack) || formData.attack <= 0) {
			alert('Por favor ingresa un valor válido para Ataque.')
			return false
		}

		if (isNaN(formData.defense) || formData.defense <= 0) {
			alert('Por favor ingresa un valor válido para Defensa.')
			return false
		}

		if (formData.defense > 100) {
			alert('La defensa no puede exceder 100.')
			return false
		}

		return true
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(getAllPokemons())
		const isValid = validateForm()
		if (!isValid) return

		const dataToSubmit = {
			...formData,
			types: selectedTypes,
		}
		// Verificar los datos antes de enviar
		console.log('Data to submit:', dataToSubmit)

		axios
			.post('http://localhost:3001/agregar', dataToSubmit)
			.then((response) => {
				console.log('Pokemon added:', response.data)
				window.alert(`${formData.name} agregado a la Base de Datos`)

				// axios
				// 	.post('http://localhost:3001/agregar', dataToSubmit, {
				// 		headers: {
				// 			'Content-Type': 'application/json',
				// 		},
				// 	})
				// 	.then((response) => {
				// 		console.log('Pokemon added:', response.data)
				// 		window.alert(`${formData.name} agregado a la Base de Datos`)

				// Reset form
				setFormData({
					name: '',
					image: '',
					hp: '',
					attack: '',
					defense: '',
					speed: 5,
					height: 5,
					weight: 5,
					types: [],
					newType: '',
				})
				setSelectedTypes([])
				setIsOtherType(false)
			})
			.catch((error) => console.error('Error adding Pokemon:', error))
	}

	return (
		<FormStyled onSubmit={handleSubmit}>
			<div>
				<h2>Agrega Nuevo Pokemon</h2>
			</div>
			<div>
				<label>Nombre</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>URL de la imagen</label>
				<input
					type="text"
					name="image"
					value={formData.image}
					onChange={handleChange}
				/>
				{/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
			</div>
			<div>
				<label>Vida</label>
				<input
					type="number"
					name="hp"
					value={formData.hp}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleRandomValue('hp', 20, 100)}>
					Random
				</button>
			</div>
			<div>
				<label>Ataque</label>
				<input
					type="number"
					name="attack"
					value={formData.attack}
					onChange={handleChange}
				/>
				<button
					type="button"
					onClick={() => handleRandomValue('attack', 20, 100)}
				>
					Random
				</button>
			</div>
			<div>
				<label>Defensa</label>
				<input
					type="number"
					name="defense"
					value={formData.defense}
					onChange={handleChange}
				/>
				<button
					type="button"
					onClick={() => handleRandomValue('defense', 20, 100)}
				>
					Random
				</button>
			</div>
			<div>
				<label>Velocidad</label>
				<input
					type="number"
					name="speed"
					placeholder="Velocidad"
					value={formData.speed}
					onChange={handleChange}
				/>
				<button type="button" onClick={() => handleRandomValue('speed', 1, 10)}>
					Random
				</button>
			</div>
			<div>
				<label>Altura</label>
				<input
					type="number"
					name="height"
					placeholder="Altura"
					value={formData.height}
					onChange={handleChange}
				/>
				<button
					type="button"
					onClick={() => handleRandomValue('height', 1, 10)}
				>
					Random
				</button>
			</div>
			<div>
				<label>Peso</label>
				<input
					type="number"
					name="weight"
					placeholder="Peso"
					value={formData.weight}
					onChange={handleChange}
				/>
				<button
					type="button"
					onClick={() => handleRandomValue('weight', 1, 10)}
				>
					Random
				</button>
			</div>
			<div className="tipos">
				<label>Tipos</label>
				<select name="types" onChange={handleSelectType}>
					<option value="">Seleccione un tipo</option>
					{allTypes.map((type) => (
						<option key={type.id} value={type.name}>
							{type.name}
						</option>
					))}
					<option value="other">Otro</option>
				</select>
				{isOtherType && (
					<div className="newType">
						<label>Nuevo Tipo</label>
						<input
							type="text"
							name="newType"
							placeholder="Nuevo Tipo"
							value={formData.newType}
							onChange={handleChange}
						/>
						<button
							type="button"
							onClick={() => {
								if (formData.newType && !allTypes.includes(formData.newType)) {
									setSelectedTypes([...selectedTypes, formData.newType])
									setFormData({ ...formData, newType: '' })
								}
							}}
						>
							Agregar Tipo
						</button>
					</div>
				)}
				{selectedTypes.map((type) => (
					<div key={type}>
						<span className="itemType">{type}</span>
						<button
							className="remove"
							type="button"
							onClick={() => handleRemoveType(type)}
						>
							❌
						</button>
					</div>
				))}
			</div>
			<button className="submit" type="submit">
				Crear Pokémon
			</button>
		</FormStyled>
	)
}

export default AddPokemonForm

const FormStyled = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 600px;
	margin: auto;
	margin-top: 50px;
	border: 1px solid #fafafa48;
	border-radius: 20px;
	text-align: left;
	div h2 {
		text-align: center;
	}

	div {
		width: 360px;
	}
	label {
		display: block;
		margin-top: 24px;
	}
	input {
		display: inline-flex;
		background-color: transparent;
		padding: 5px;

		width: 70%;
		/* height: 16px; */

		border: none; /* Elimina todos los bordes */
		outline: none;
		border-bottom: 2px solid #fafafa48;

		&:focus {
			border-bottom-color: black; /* Mantiene el borde negro al enfocar el input */
		}
	}
	.tipos {
		display: flex;
		flex-direction: column;
		text-align: left;

		/* border: 1px solid black; */
		label {
			padding-bottom: 12px;
		}
		select {
			height: 2em;
			margin-bottom: 1em;
		}
	}
	.newType {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-bottom: 24px;
	}
	.remove {
		padding: 0;
		border-radius: 50%;
		margin-left: 12px;
		background-color: transparent;
		border: none;
		transition: transform 0.3s ease;

		&:hover {
			transform: scale(1.1);
			border: 1px solid #fafafa48;
		}
	}
	.submit {
		margin: 24px 0;
	}
	.itemType {
		padding: 24px 0;
		margin: 24px 0;
	}
`
