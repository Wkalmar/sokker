import gql from 'graphql-tag';


export default gql`mutation updateFilter($id: ID!, $name: String, $filter: String) {
    updateFilter(id: $id, name: $name, filter: $filter) {
        id
		name
		filter
    }
}`
