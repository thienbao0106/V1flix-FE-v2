import gql from "graphql-tag";

export const getEpisodes = (currentPage: number, limit: number) => gql`
  query getEpisodes {
    episodes(${`pageNumber: ${currentPage}, limitPerPage: ${limit}`}) {
      totalPage
      episodes {
        title
        view
        _id
        epNum
        created_at
        thumbnail
        series {
          _id
          title {
            main_title
          }
          images {
            _id
            source
            type
          }
        }
      }
    }
  }
`;

export const addCommentMutation = () => gql`
  mutation ($episodeId: String!, $userId: String!, $content: String!) {
    addComments(episodeId: $episodeId, userId: $userId, content: $content) {
      user {
        username
        avatar
      }
      content
      updated_at
      created_at
    }
  }
`;
