import gql from "graphql-tag";

export const userLogin = (email: string, password: string) => {
  console.log(email);
  return gql`
    query getLogin {
      login(email: "${email}", password: "${password}") {
        token
        tokenExpiration
        username
      }
    }
  `;
};

export const getUser = (username: string) => {
  return gql`
    query findUserById {
      findUserById(username: "${username}") {
        username
      }
    }
  `;
};
