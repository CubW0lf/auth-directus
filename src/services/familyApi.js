import api from "./api.js";

export const getAllFamilies = async (token) => {
  return await api
    .get(`items/family`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const findFamily = async (id) => {
  return await api
    .get(`items/family/${id}`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};
