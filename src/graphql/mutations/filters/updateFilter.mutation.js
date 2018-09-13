import gql from 'graphql-tag';


export default gql`mutation createFilter($userId: ID!, $name: String!, $filter:String!) {
    createFilter(userId:$userId, name: $name, filter:$filter) {
        id,
		name,
		filter
    }
}`
