import { API } from "../../backend";

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .catch(err => console.log(err));
};

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(res => console.log("Sign Out"))
      .catch(err => console.log("err"));
  }
};

export const authenticate = (user, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(user));
    next();
  }
};

export const isAuthenticate = () => {
  // TODO: this if not working .

  /*if (typeof window !== "undefined") {
    console.log(typeof window);
    return false;
  }*/
  if (localStorage.getItem("jwt")) {
    //return the user
    return JSON.parse(localStorage.getItem("jwt"));
  }
  return false;
};
