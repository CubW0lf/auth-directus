import api from "./api.js";

export const getAllCardInHand = async (handId) => {
  return await api
    .get(`items/hand_item?fields=*.*&filter[hand][_eq]=${handId}`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const createHand = async (id) => {
  return await api
    .post(`items/hand`, { game_id: id })
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

export const connectHand = async (player, handId) => {
  return await api
    .patch(`items/junction_directus_users_game/${player}`, { hand: handId })
    .catch((err) => console.log(err.response));
};

export const drawCards = async (hand, card, player) => {
  return await api
    .post(`items/hand_item`, { hand: hand, card: card, player: player })
    .then((data) => data)
    .catch((err) => console.log(err.response));
};
