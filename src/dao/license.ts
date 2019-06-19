import dao, { DAOInstance } from 'dao';

const licenseDAO: DAOInstance = dao.create({

  view: {
    url: '/license-manager/v1/license',
  },
  text: {
    url: '/license-manager/v1/license/protocol',
  },
  agree: {
    url: '/license-manager/v1/license/protocol/grant',
    method: 'PUT',
  },
});

export default licenseDAO;
