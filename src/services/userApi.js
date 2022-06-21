import api from "./api.js";

export const login = async (email, password) => {
  return await api
    .post("auth/login", { email: email, password: password })
    .then((data) => data)
    .catch((err) => console.error("Erreur de connexion", err.response.data.errors[0].message));
};

export const refresh = async (refresh_token) => {
  return await api
    .post("auth/refresh", { refresh_token: refresh_token })
    .then((response) => response)
    .catch((err) => console.log(err.response));
};

export const disconnect = async (refresh_token) => {
  return await api
    .post("auth/logout", { refresh_token: refresh_token })
    .then((response) => response)
    .catch((err) => console.log(err.response));
};

export const me = async () => {
  return await api
    .get("users/me?fields=*.*")
    .then((data) => data)
    .catch((err) => console.log("erreur d'authentification", err.response));
};

export const newUser = async (player) => {
  return await api
    .post("users", player)
    .then((response) => response)
    .catch((err) => console.log(err.response));
};
