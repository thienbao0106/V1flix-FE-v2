import gql from "graphql-tag";

export const findTags = (tagId: any) => gql`
  query getTags {
    findTagsById(tagId:  "${tagId}") {
      _id
      name 
      description
      series {
        _id
        images {
          _id
          name
          type 
          source
        }
        title {
          main_title
          alt_title
        }
        total_episodes
        created_at
        status
      }
    }
  }
`;
