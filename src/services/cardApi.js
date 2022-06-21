import api from "./api.js";

export const getAllCards = async () => {
  return await api
    .get(`items/card`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const findCard = async (id) => {
  return await api
    .get(`items/card/${id}`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const shuffle = (arr) => {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};
