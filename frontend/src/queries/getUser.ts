import gql from 'graphql-tag';

export default gql`
  query getUser($id: Int!) {
    user(id: $id) {
      firstName
      lastName
    }
  }
`;
