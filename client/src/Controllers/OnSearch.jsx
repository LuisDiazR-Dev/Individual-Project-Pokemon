import axios from 'axios'

const onSearch = async (id) => {
	try {
		const response = await axios.get(`http://localhost:3001/pokemons`)
		console.log(response.data)

		console.log(id)
		// todo el id hace un cambio en el estado y lo muestra. ok, con un dispatch

		return id

		// setCharacters((oldChars) => [...oldChars, endpoint.data])
	} catch (error) {
		console.log(`ha ocurrido el siguiente error: ${error.message}`)
	}
}

export default onSearch

// const onSearch2 = async () => {
// 	//aquí el id que entra es String
// 	// if (characters.find((char) => char.id == id)) {
// 	// 	return window.alert('Ya Tienes esta Carta')
// 	// }
// 	// if (id > 826) {
// 	// 	return window.alert('¡No hay personajes con este ID!')}
// 	// *el return evita le ejecución del axios

// 	try {
// 		const response = await axios.get(`http://localhost:3001/home`)
// 		console.log(response.data)
// 		return response.data

// 		// setCharacters((oldChars) => [...oldChars, endpoint.data])
// 	} catch (error) {
// 		console.log(`ha ocurrido el siguiente error: ${error.message}`)
// 	}
// }

// export { onSearch2 }
