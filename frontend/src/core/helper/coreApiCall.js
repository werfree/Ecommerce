import { API } from "../../backend";

export const getHomeProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
