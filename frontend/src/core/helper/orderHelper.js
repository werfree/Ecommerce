import { API } from "../../backend";

export const createrOrder = (userId, token, orderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: orderData })
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
export const order = () => {
  return fetch(`${API}/order`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
