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

export const getEpisode = (episodeId: any) => gql`
  query {
    findEpisode(episodeId: "${episodeId}") {
      title
        view
        _id
        epNum
        thumbnail
        description
        subtitles {
          lang
          source {
            _id
            kind
            value
          }
          label
        }
        source {
          _id
          kind
          value
        }
        series {
          _id
          title {
            main_title
          }
        }
    }
  }
`;

export const addCommentMutation = () => gql`
  mutation ($episodeId: String!, $userId: String!, $content: String!) {
    addComments(episodeId: $episodeId, userId: $userId, content: $content) {
      _id
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

export const deleteCommentMutation = () => gql`
  mutation ($episodeId: String!, $commentId: String!) {
    deleteComment(episodeId: $episodeId, commentId: $commentId)
  }
`;

export const updateCommentMutation = () => gql`
  mutation ($episodeId: String!, $commentId: String!, $content: String!) {
    editComment(episodeId: $episodeId, commentId: $commentId, content: $content)
  }
`;
