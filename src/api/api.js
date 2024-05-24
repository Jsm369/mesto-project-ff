const apiConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: 'c04a9e3b-08f0-4bc7-9223-e607980ddb51',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

export const updateAvatar = async (profileAvatar) => {
  return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(profileAvatar)
  }).then((res) => handleResponse(res));
};

export const likeCard = async (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: apiConfig.headers
  }).then((res) => handleResponse(res));
};

export const unlikeCard = async (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then((res) => handleResponse(res));
};

export const deleteCard = async (cardId) => {
  return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: apiConfig.headers
  }).then((res) => handleResponse(res));
};

export const updateProfile = async (userData) => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    body: JSON.stringify(userData)
  }).then((res) => handleResponse(res));
};

export const getProfileData = async () => {
  return fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then((res) => handleResponse(res));
};

export const addCard = async (cardData) => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: apiConfig.headers,
    body: JSON.stringify(cardData)
  }).then((res) => handleResponse(res));
};

export const getCards = async () => {
  return fetch(`${apiConfig.baseUrl}/cards`, {
    method: 'GET',
    headers: apiConfig.headers
  }).then((res) => handleResponse(res));
};
