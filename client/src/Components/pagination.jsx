import styled from 'styled-components'

const Pagination = ({ totalPokemons, pokemonsPerPage, currentPage, setCurrentPage }) => {
	const numPages = []

	for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
		numPages.push(i)
	}

	const onPreviousPage = () => {
		setCurrentPage(currentPage - 1)
	}
	const onNextPage = () => {
		setCurrentPage(currentPage + 1)
	}
	// const onPreviousPage = () => {
	// 	if (currentPage > 1) setCurrentPage(currentPage - 1)
	// }
	// const onNextPage = () => {
	// 	if (currentPage < numPages.length) setCurrentPage(currentPage + 1)
	// }
	const onSpecificPage = (n) => {
		setCurrentPage(n)
	}

	return (
		<div>
			<NavPagination>
				<a className={`previous ${currentPage === 1 ? 'disable' : ''}`} onClick={onPreviousPage}>
					Anterior
				</a>

				<ul className="list-pages">
					{numPages.map((numPage) => (
						<li key={numPage}>
							<a
								className={`page-link ${numPage === currentPage ? 'active' : ''}`}
								onClick={() => onSpecificPage(numPage)}
							>
								{numPage}
							</a>
						</li>
					))}
				</ul>

				<a
					className={`next ${currentPage >= numPages.length ? 'disable' : ''}`}
					onClick={onNextPage}
				>
					Siguiente
				</a>
			</NavPagination>
		</div>
	)
}

export default Pagination

const NavPagination = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 2rem;

	.list-pages {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	li {
		margin: 0 4px;
	}

	a {
		color: #727272;
		font-size: 1.1rem;
		font-weight: 600;
		text-decoration: none;

		padding: 4px 12px;
		border-radius: 25px;

		background-color: #ffffffbd;
		border: 1px solid #80808055;
		/* color: #565656; */
		cursor: pointer;

		&:hover {
			color: orange;
			color: #d02020;
		}
		&.active {
			background-color: #6b6b6b;
			color: white;
			font-weight: 700;
		}
		&.disable {
			pointer-events: none;
			opacity: 0.5;
		}
	}
`
