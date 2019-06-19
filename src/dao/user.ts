import dao, { DAOInstance } from 'dao';

const userDAO: DAOInstance = dao.create({

  login: {
    url: 'http://gateway.360cdh.autoui.4pd.io/keystone/v1/sessions',
    method: 'POST',
  },

  workspaces: {
    url: '/keystone/v1/workspaces',
  },

  logout: {
    url: '/keystone/v1/sessions',
    method: 'DELETE',
  },

  getUser: {
    url: '/keystone/v1/user',
    method: 'GET',
  },

  addUser: {
    url: '/keystone/v1/users',
    method: 'POST',
  },

  getYarnList: {
    url: '/resource-manager/v1/resources/yarn',
  },

  getK8s: {
    url: '/resource-manager/v1/resources/k8s',
  },
  modules: {
    url: '/config-center/v1/versions',
  },
  moduleConfig: {
    url: '/config-center/v1/configs/:module/:key',
  },
  updateUser: {
    url: '/keystone/v1/users',
    method: 'PUT',
  },

  updateUserWithPw: {
    url: '/keystone/v1/users-with-pw',
    method: 'PUT',
  },

  updatePassword: {
    url: '/keystone/v1/users/password',
    method: 'PUT',
  },
  updatePasswordWithPw: {
    url: '/keystone/v1/users/password-double-check',
    method: 'PUT',
  },
  getPasswordComplex: {
    url: '/keystone/v1/setting',
    method: 'get',
  },
  getPictureVerification: {
    url: '/keystone/v1/captcha',
    method: 'GET',
  },
});

export default userDAO;
