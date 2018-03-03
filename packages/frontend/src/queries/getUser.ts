import gql from 'graphql-tag';

const query = gql`
  query getUser($id: String!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;

export default query;