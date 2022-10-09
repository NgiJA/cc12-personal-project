import { createContext, useContext, useEffect, useState } from 'react';
import * as authService from '../api/authApi';
import {
	addUserAccessToken,
	getUserAccessToken,
	removeUserAccessToken,
	addAdminAccessToken,
	getAdminAccessToken,
	removeAdminAccessToken
} from '../utils/localStorage';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(false);
	const [admin, setAdmin] = useState(false);

	const register = async (input) => {
		await authService.register(input);
	};

	const getUser = async () => {
		const token = getUserAccessToken();
		const res = await authService.getUser(token);
		setUser(res.data.user);
	};

	const userLogin = async (input) => {
		const res = await authService.login(input); // login แล้วได้ token มา
		addUserAccessToken(res.data.token); // เอา token ไปเก็บไว้ใน local starage
		getUser();
	};

	const adminLogin = async (input) => {
		const res = await authService.adminLogin(input); // login แล้วได้ token มา
		addAdminAccessToken(res.data.token); // เอา token ไปเก็บไว้ใน local starage
		setAdmin(true);
	};

	const userLogout = () => {
		setUser(false);
		removeUserAccessToken();
	};

	const adminLogout = () => {
		setAdmin(false);
		removeAdminAccessToken();
	};

	useEffect(() => {
		if (getUserAccessToken()) {
			getUser();
		}
		if (getAdminAccessToken()) {
			setAdmin(true);
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
				getUser: getUser,
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
