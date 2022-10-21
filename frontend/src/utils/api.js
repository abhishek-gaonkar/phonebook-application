import axios from "axios";
import { ENDPOINTS } from "../config/api";

/**
 * ACCOUNT-AUTH RELATED API CALLS
 */

export const postLoginAccount = (data) => {
  return axios.post(ENDPOINTS.POST_LOGIN_ACCOUNT, data).then((res) => res.data);
};

export const postCreateAccount = (data) => {
  return axios
    .post(ENDPOINTS.POST_CREATE_ACCOUNT, data)
    .then((res) => res.data);
};

export const getVerifyAccount = (token) => {
  return axios
    .get(ENDPOINTS.GET_VERIFY_ACCOUNT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

/**
 * PHONEBOOK RELATED API CALLS
 */

export const postCreateContact = (data, token) => {
  return axios
    .post(ENDPOINTS.POST_CREATE_CONTACT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getSingleContact = (contactId, token) => {
  return axios
    .get(ENDPOINTS.GET_SINGLE_CONTACT(contactId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const getAllContacts = (token) => {
  return axios
    .get(ENDPOINTS.GET_ALL_CONTACTS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const patchEditContact = (data, token) => {
  return axios
    .patch(ENDPOINTS.PATCH_EDIT_CONTACT, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const deleteSingleContact = (contactId, token) => {
  return axios
    .delete(ENDPOINTS.DELETE_SINGLE_CONTACT(contactId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
