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
			<small className='fw-bold brand-center'>WSTUDIO</small>
			<Carousel>
				<Carousel.Item interval={3500}>
					<img className='d-block w-100' src={carousel1} alt='First slide' />
					<Carousel.Caption className='carousel-option'>
						<h3 className='carousel-option-text'>New Arrival</h3>
						<p className='carousel-option-text'>Black Nylon Shorts</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item interval={3500}>
					<img className='d-block w-100' src={carousel2} alt='Second slide' />
					<Carousel.Caption className='carousel-option'>
						<h3 className='carousel-option-text'>New Arrival</h3>
						<p className='carousel-option-text'>Leather Shoes</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item interval={3500}>
					<img className='d-block w-100' src={carousel3} alt='Third slide' />
					<Carousel.Caption className='carousel-option'>
						<h3 className='carousel-option-text'>Meet Us</h3>
						<p className='carousel-option-text'>Siam Square One 3rd Floor</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			<Bottom />
		</>
	);
}

export default HomePage;
