export const environment = {
  //baseUrl: 'https://motorcycle-shop.up.railway.app/api/',
  baseUrl: 'http://localhost:3000/api/',
  localUrl: 'http://localhost:3000/api/',
};

export const authApiEndpoints = {
  login: `${environment.baseUrl}auth/login`,
  updatePassword: `${environment.baseUrl}auth/update-password`,
  resetPassword: `${environment.baseUrl}auth/reset-password`,
};
