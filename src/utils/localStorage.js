const USER_ACCESS_TOKEN = 'USER_ACCESS_TOKEN';
const ADMIN_ACCESS_TOKEN = 'ADMIN_ACCESS_TOKEN';

export const getUserAccessToken = () => localStorage.getItem(USER_ACCESS_TOKEN);
export const getAdminAccessToken = () =>
	localStorage.getItem(ADMIN_ACCESS_TOKEN);

export const addUserAccessToken = (token) =>
	localStorage.setItem(USER_ACCESS_TOKEN, token);
export const addAdminAccessToken = (token) =>
	localStorage.setItem(ADMIN_ACCESS_TOKEN, token);

export const removeUserAccessToken = () =>
	localStorage.removeItem(USER_ACCESS_TOKEN);
export const removeAdminAccessToken = () =>
	localStorage.removeItem(ADMIN_ACCESS_TOKEN);
