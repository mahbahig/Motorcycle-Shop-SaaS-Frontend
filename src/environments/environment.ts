export const environment = {
  baseUrl: 'http://localhost:3000/api/',
};


export const authApiEndpoints = {
  login: `${environment.baseUrl}auth/login`,
  updatePassword: `${environment.baseUrl}auth/update-password`,
  resetPassword: `${environment.baseUrl}auth/reset-password`,
}
