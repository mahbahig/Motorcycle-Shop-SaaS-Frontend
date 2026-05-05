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

export const userApiEndpoints = {
  createUser: `${environment.baseUrl}users`,
  getProfile: `${environment.baseUrl}users/profile`,
  getAllUsers: `${environment.baseUrl}users/all`,
  getUserById: (id: string) => `${environment.baseUrl}users/${id}`,
  deleteUser: (id: string) => `${environment.baseUrl}users/${id}`,
  lockProfile: (id: string) => `${environment.baseUrl}users/${id}/lock`,
  unlockProfile: (id: string) => `${environment.baseUrl}users/${id}/unlock`,
};

export const productApiEndpoints = {
  createProduct: `${environment.baseUrl}products`,
  getAllProducts: `${environment.baseUrl}products`,
  getSupplierProducts: (supplierId: string) => `${environment.baseUrl}products/supplier/${supplierId}`,
  getProductById: (id: string) => `${environment.baseUrl}products/${id}`,
  updateProduct: (id: string) => `${environment.baseUrl}products/${id}`,
  deleteProduct: (id: string) => `${environment.baseUrl}products/${id}`,
};

export const supplierApiEndpoints = {
  createSupplier: `${environment.baseUrl}suppliers`,
  getAllSuppliers: `${environment.baseUrl}suppliers`,
  deleteSupplier: (id: string) => `${environment.baseUrl}suppliers/${id}`,
};
