import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carousel1 from '../assets/images/carousel1.jpg';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.jpg';
import NavbarMenu from '../components/NavbarMenu';
import Bottom from '../layouts/bottoms/Bottom';

function HomePage() {
	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenu />
				<small className='fw-bold'>WSTUDIO</small>
				<div className='d-flex gap-4 margin-r'>
					<Link
						to='/user/signup'
						className='text-decoration-none text-dark link-font-size'
					>
						SignUp
					</Link>
					<Link
						to='/user/login'
						className='text-decoration-none text-dark link-font-size'
					>
						Login
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

export default HomePage;
