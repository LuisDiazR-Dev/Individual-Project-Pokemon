// ? Hooks
import { useLocation, Routes, Route } from 'react-router-dom' //luego de instalar react-router-dom@6.3.0 para rutas

// ? components
import './App.css'
import NavBar from './Components/NavBar.jsx'
import { Home } from './Components/Home.jsx'
import FormAddPokemonDB from './Components/FormAddPokemonDB.jsx'

// *
function App() {
	const { pathname } = useLocation()

	return (
		<>
			<div>
				{/* si es diferente a barra, rendering NavBar */}
				{/* {pathname !== "/" && <NavBar onSearch={onSearch} />} */}
				{pathname !== '/' && <NavBar />}

				<Routes>
					<Route path="/pokemons" element={<Home />} />
					<Route path="/agregar" element={<FormAddPokemonDB />} />

					{/* <Route path="/" element={<FormLogin login={login} />} /> */}
					{/* <Route path="/favorites" element={<Favorites />} /> */}
					{/* <Route path="/about" element={<About />} /> */}
					{/* <Route path="/account" element={<Account />} /> */}
					{/* <Route path="/detail/:id" element={<Detail />} /> */}
				</Routes>
			</div>
		</>
	)
}

export default App
