import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const AddPokemonForm = () => {
	const dispatch = useDispatch()
	const allTypes = useSelector((state) => state.types)

	// * para saber que datos se están recopilando
	const [formData, setFormData] = useState({
		name: '',
		image:
			'https://raw.githubusercontent.com/LuisDiazR-Dev/Individual-Project-Pokemon/main/pokemon.png',
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

	useEffect(() => {
		// Fetch all types from the backend and dispatch them to the Redux store
		axios
			.get('http://localhost:3001/types')
			.then((response) => {
				dispatch({ type: 'SET_TYPES', payload: response.data })
			})
			.catch((error) => console.error('Error fetching types:', error))
	}, [dispatch])

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

	const handleImageUpload = (event) => {
		const file = event.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData({ ...formData, image: reader.result })
			}
			reader.readAsDataURL(file)
		}
	}

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

		if (!urlPattern.test(formData.image)) {
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
		const isValid = validateForm()
		if (!isValid) return

		const dataToSubmit = {
			...formData,
			types: selectedTypes,
		}

		axios
			.post('http://localhost:3001/pokemons', dataToSubmit)
			.then((response) => {
				console.log('Pokemon added:', response.data)
				// Reset form
				setFormData({
					name: '',
					image:
						'https://raw.githubusercontent.com/LuisDiazR-Dev/Individual-Project-Pokemon/main/pokemon.png',
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
		<form onSubmit={handleSubmit}>
			<div>
				<label>Nombre</label>
				<input
					type="text"
					name="name"
					placeholder="Nombre"
					value={formData.name}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label>Imagen (URL o Cargar)</label>
				<input
					type="text"
					name="image"
					placeholder="URL de la imagen"
					value={formData.image}
					onChange={handleChange}
				/>
				<input type="file" accept="image/*" onChange={handleImageUpload} />
			</div>
			<div>
				<label>Vida</label>
				<input
					type="number"
					name="hp"
					placeholder="Vida"
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
					placeholder="Ataque"
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
					placeholder="Defensa"
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
			<div>
				<label>Tipos</label>
				<select name="types" onChange={handleSelectType}>
					<option value="">Seleccione un tipo</option>
					{allTypes.map((type) => (
						<option key={type} value={type}>
							{type}
						</option>
					))}
					<option value="other">Otro</option>
				</select>
				{isOtherType && (
					<div>
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
						<span>{type}</span>
						<button type="button" onClick={() => handleRemoveType(type)}>
							X
						</button>
					</div>
				))}
			</div>
			<button type="submit">Crear Pokémon</button>
		</form>
	)
}

export default AddPokemonForm
