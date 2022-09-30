import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavbarMenu() {
	return (
		<>
			<Navbar key={false} expand={false} className='d-inline-block'>
				<Container fluid>
					<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
					<Navbar.Offcanvas
						id={`offcanvasNavbar-expand-${false}`}
						aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
						placement='start'
					>
						<Offcanvas.Header closeButton>
							<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
								Menu
							</Offcanvas.Title>
						</Offcanvas.Header>
						<Offcanvas.Body>
							<Nav className='justify-content-end flex-grow-1 pe-3'>
								<Link
									to='/user/home'
									className='text-decoration-none text-dark nav-link-item'
								>
									Home
								</Link>
								<Link
									to='/user/shop'
									className='text-decoration-none text-dark nav-link-item'
								>
									Shop
								</Link>
							</Nav>
						</Offcanvas.Body>
					</Navbar.Offcanvas>
				</Container>
			</Navbar>
		</>
	);
}

export default NavbarMenu;
