import api from "./api.js";

export const myGameData = async (gameId, playerId) => {
  return await api
    .get(
      `items/junction_directus_users_game?fields=*,directus_users_id.*,family.*&filter[game_id][_eq]=${gameId}&filter[directus_users_id][_eq]=${playerId}`
    )
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};

export const allMyGames = async (playerId) => {
  return await api
    .get(
      `items/junction_directus_users_game?fields=*,directus_users_id.*,family.*&filter[directus_users_id][_eq]=${playerId}`
    )
    .then(({ data }) => data)
    .catch((err) => console.log(err.response));
};

export const chooseFamily = async (playerId, familyId) => {
  return await api
    .patch(`items/junction_directus_users_game/${playerId}`, { family: familyId })
    .then((response) => response)
    .catch((err) => console.log(err.response));
};
