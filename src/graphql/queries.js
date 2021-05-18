import gql from "graphql-tag";

export const FETCH_CHARITIES = gql`
  {
    getAllCharities {
      id
      charityName
      Status
    }
  }
`;
