import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carousel1 from '../assets/images/carousel1.jpg';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.jpg';
import NavbarMenu from '../components/NavbarMenu';
import { useAuth } from '../contexts/AuthContext';
import Bottom from '../layouts/bottoms/Bottom';

function HomePageLogin() {
	const { userLogout } = useAuth();
	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
				<small className='fw-bold'>WSTUDIO</small>
				<div className='d-flex gap-4 margin-r'>
					<p
						to='/user/signup'
						className='text-decoration-none text-white link-font-size mb-0'
					>
						SignUp
					</p>
					<Link
						to='/user/home'
						className='text-decoration-none text-dark link-font-size'
						onClick={userLogout}
					>
						Logout
					</Link>
				</div>
			</div>
			<Carousel>
				<Carousel.Item interval={1000}>
					<img className='d-block w-100' src={carousel1} alt='First slide' />
				</Carousel.Item>
				<Carousel.Item interval={500}>
					<img className='d-block w-100' src={carousel2} alt='Second slide' />
				</Carousel.Item>
				<Carousel.Item>
					<img className='d-block w-100' src={carousel3} alt='Third slide' />
				</Carousel.Item>
			</Carousel>
			<Bottom />
		</>
	);
}

export default HomePageLogin;
