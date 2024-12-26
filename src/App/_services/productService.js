import axios from "axios";
import { API, axiosInstance } from "../lib";

export const getProductListData = (data = '') => {
  // return axiosInstance
  return axios.get(`https://fakestoreapi.com` + '/' + API.GET_ALL_PRODUCTS + '/' + data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      throw err;
    });
};

export const getCategoiesListData = (data = {}) => {
  return axios.get(`https://fakestoreapi.com` + '/' + API.GET_ALL_PRODUCTS + '/' + 'categories', data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      throw err;
    });
};

export const deleteProduct = (id) => {
  return axios.delete(`https://fakestoreapi.com` + '/' + API.GET_ALL_PRODUCTS + '/' + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      throw err;
    });
};

export const createProduct = (data) => {
  return axios.post(`https://fakestoreapi.com` + '/' + API.GET_ALL_PRODUCTS , data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      throw err;
    });
};

export const editProduct = (data) => {
  return axios.put(`https://fakestoreapi.com` + '/' + API.GET_ALL_PRODUCTS + '/' + data?.id , data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      if (err) {
        console.log(err);
      }
      throw err;
    });
};