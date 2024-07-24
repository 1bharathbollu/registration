// src/authService.js
const mockApi = {
    users: [],
  };
  
  const register = (fullName, email, password) => {
    const userExists = mockApi.users.some(user => user.email === email);
    if (userExists) {
      return Promise.reject(new Error('User already exists'));
    }
    const newUser = { fullName, email, password };
    mockApi.users.push(newUser);
    return Promise.resolve({ token: 'mock-jwt-token', user: newUser });
  };
  
  const login = (email, password) => {
    const user = mockApi.users.find(user => user.email === email && user.password === password);
    if (!user) {
      return Promise.reject(new Error('Invalid email or password'));
    }
    return Promise.resolve({ token: 'mock-jwt-token', user });
  };
  
  const authService = {
    register,
    login,
  };
  
  export default authService;
  