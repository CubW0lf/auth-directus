import api from "./api.js";

export const getAllItemsOnBoard = async (gameId) => {
  return await api
    .get(`items/board_item?fields=*,card.*,player.pseudo&filter[game][_eq]=${gameId}`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const createBoard = async (gameId) => {
  return await api
    .post(`items/board`, { game_id: gameId })
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

// export const findItem = async (id) => {
//   return await axios.get(`${api}items/board_item/${id}`).then(({ data }) => data.data);
// };
