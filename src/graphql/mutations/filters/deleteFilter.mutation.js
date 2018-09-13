import gql from 'graphql-tag';


export default gql`mutation deleteFilter($id: ID!) {
    deleteFilter(id: $id) {
        id
    }
}`
