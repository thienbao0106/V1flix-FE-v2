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

export const getUser = (userFields: string[], username: any) => {
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

export const removeSeriesMutation = () => {
  return gql`
    mutation removeSeriesFromList($seriesId: String!, $userId: String!) {
      removeSeriesFromList(seriesId: $seriesId, userId: $userId)
    }
  `;
};

export const editSeriesMutation = () => {
  return gql`
    mutation updateSeriesInList(
      $seriesId: String!
      $note: String!
      $currentEp: Int!
      $status: String!
      $userId: String!
    ) {
      updateSeriesInList(
        seriesId: $seriesId
        note: $note
        currentEp: $currentEp
        status: $status
        userId: $userId
      )
    }
  `;
};
