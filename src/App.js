import Router from './route/Route';
import { ToastContainer } from 'react-toastify';
import { useLoading } from './contexts/LoadingContext';
import Spinner from './components/ui/Spinner';
import 'dayjs/locale/th';

function App() {
	const { loading } = useLoading();
	return (
		<>
			{loading && <Spinner />}
			<Router />
			<ToastContainer
				autoClose='2500'
				theme='colored'
				position='bottom-center'
			/>
		</>
	);
}

export default App;
