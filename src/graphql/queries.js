import gql from "graphql-tag";

export const FETCH_CHARITIES = gql`
  {
    getActiveCharities {
      id
      charityName
    }
  }
`;
