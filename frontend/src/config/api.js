const ACCOUNT_DOMAIN = process.env.REACT_APP_ACCOUNT_SERVICE_BASE_URL;
const PHONEBOOK_DOMAIN = process.env.REACT_APP_PHONEBOOK_SERVICE_BASE_URL;

const ENDPOINTS = {
  /**
   * Account-Auth Related
   */
  POST_LOGIN_ACCOUNT: `${ACCOUNT_DOMAIN}/login`,
  POST_CREATE_ACCOUNT: `${ACCOUNT_DOMAIN}/user`,
  GET_VERIFY_ACCOUNT: `${ACCOUNT_DOMAIN}/user`,

  /**
   * PhoneBook Related
   */
  POST_CREATE_CONTACT: `${PHONEBOOK_DOMAIN}/contact`,
  GET_SINGLE_CONTACT: (contactId) => `${PHONEBOOK_DOMAIN}/contact/${contactId}`,
  GET_ALL_CONTACTS: `${PHONEBOOK_DOMAIN}/contacts`,
  PATCH_EDIT_CONTACT: `${PHONEBOOK_DOMAIN}/contact`,
  DELETE_SINGLE_CONTACT: (contactId) =>
    `${PHONEBOOK_DOMAIN}/contact/${contactId}`,
};

export { ENDPOINTS };
