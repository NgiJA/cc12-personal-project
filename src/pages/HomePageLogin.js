import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import carousel1 from '../assets/images/carousel1.jpg';
import carousel2 from '../assets/images/carousel2.jpg';
import carousel3 from '../assets/images/carousel3.jpg';
import NavbarMenuLogin from '../components/NavbarMenuLogin';
import { useAuth } from '../contexts/AuthContext';
import Bottom from '../layouts/bottoms/Bottom';

function HomePageLogin() {
	const { userLogout, user } = useAuth();
	return (
		<>
			<div className='d-flex justify-content-between align-items-center'>
				<NavbarMenuLogin />
				<div className='d-flex align-items-center gap-3 link-font-size'>
					<p className='mb-0'>{user.username}</p>
					<Link
						to='/user/home'
						className='text-decoration-none text-dark link-font-size margin-r'
						onClick={userLogout}
					>
						Logout
					</Link>
				</div>
			</div>
			<small className='fw-bold brand-center'>WSTUDIO</small>
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
