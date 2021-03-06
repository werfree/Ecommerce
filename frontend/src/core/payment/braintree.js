import { API } from "../../backend";

export const getToken = (userId, token) => {
  return fetch(`${API}/payment/braintree/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const processPayment = (userId, token, paymenntInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(paymenntInfo)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
