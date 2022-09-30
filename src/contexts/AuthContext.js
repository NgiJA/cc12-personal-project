import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../api/authApi';
import {
	addAccessToken,
	getAccessToken,
	removeAccessToken
} from '../utils/localStorage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(false);
	const [admin, setAdmin] = useState(false);

	const register = async (input) => {
		await authService.register(input);
	};

	const userLogin = async (input) => {
		const res = await authService.login(input); // login แล้วได้ token มา
		addAccessToken(res.data.token); // เอา token ไปเก็บไว้ใน local starage
		setUser(true);
	};

	const adminLogin = async (input) => {
		const res = await authService.adminLogin(input); // login แล้วได้ token มา
		addAccessToken(res.data.token); // เอา token ไปเก็บไว้ใน local starage
		setAdmin(true);
	};

	const userLogout = () => {
		setUser(false);
		removeAccessToken();
	};

	const adminLogout = () => {
		setAdmin(false);
		removeAccessToken();
	};

	useEffect(() => {
		if (getAccessToken()) {
			setUser(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user: user,
				admin: admin,
				register: register,
				userLogin: userLogin,
				userLogout: userLogout,
				adminLogin: adminLogin,
				adminLogout: adminLogout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthContextProvider;
