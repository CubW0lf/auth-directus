import api from "./api.js";

export const getAllGames = async () => {
  return await api
    .get(`items/game`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const findGame = async (id) => {
  return await api
    .get(`items/game/${id}?fields=*.*.*`)
    .then(({ data }) => data.data)
    .catch((err) => console.log(err.response));
};

export const createGame = async () => {
  return await api
    .post(`items/game`)
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

export const modifyGame = async (gameId, game) => {
  return await api
    .patch(`items/game/${gameId}`, game)
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const deleteGame = async (id) => {
  return await api
    .delete(`items/game/${id}`)
    .then((response) => response)
    .catch((err) => console.log(err.response));
};

export const addPlayer = async (credentials) => {
  return await api
    .post(`items/junction_directus_users_game`, credentials)
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

export const deletePlayer = async (id) => {
  return await api
    .delete(`items/junction_directus_users_game/${id}`)
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

export const findGamePlayer = async (gameId, playerId) => {
  return await api
    .get(`items/junction_directus_users_game?filter[game_id][_eq]=${gameId}&filter[directus_users_id][_eq]=${playerId}`)
    .then((data) => data)
    .catch((err) => console.log(err.response));
};

export const findAllPlayersFromGame = async (gameId) => {
  return await api
    .get(`items/junction_directus_users_game?fields=*,directus_users_id.*,family.*&filter[game_id][_eq]=${gameId}`)
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};
