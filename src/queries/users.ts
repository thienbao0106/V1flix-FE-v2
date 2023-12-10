import gql from "graphql-tag";

export const userLogin = (email: string, password: string) => {
  console.log(email);
  return gql`
    query getLogin {
      login(email: "${email}", password: "${password}") {
        token
        username
      }
    }
  `;
};

export const getUser = (userFields: string[], username: string) => {
  return gql`
    query findUserByName {
      findUserByName(username: "${username}") {
        ${[...userFields].join("\n")}
      }
    }
  `;
};

export const addSeriesMutation = () => {
  return gql`
    mutation addSeriesToList(
      $seriesId: String!
      $note: String!
      $currentEp: Int!
      $status: String!
      $userId: String!
    ) {
      addSeriesToList(
        seriesId: $seriesId
        note: $note
        currentEp: $currentEp
        status: $status
        userId: $userId
      ) {
        _id
      }
    }
  `;
};
