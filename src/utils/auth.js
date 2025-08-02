const getToken = () => localStorage.getItem('token');
const clearToken = () => localStorage.removeItem('token');
const setToken = (token) => localStorage.setItem('token', token);

export {
    getToken,
    clearToken,
    setToken
}