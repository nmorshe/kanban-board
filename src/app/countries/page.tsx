'use client'

// import { useGetCountriesQuery } from "@/_generated_/graphql"
// import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

// const Countries_Query_Page = () => {
    

//     const client = new ApolloClient({
//         uri: 'https://countries.trevorblades.com/',
//         cache: new InMemoryCache()
//     })

//     return (
//         <ApolloProvider client={client}>
//             <Country_Elements />
//         </ApolloProvider>
//     )
// }

// const Country_Elements = () => {

//     const {data, loading, error} = useGetCountriesQuery()

//     if (loading) {
//         return <div>Loading. Please wait</div>
//     }

//     if (error) {
//         return <div>Error: {error.message}</div>
//     }

//     const SpawnElements = (val) => {
//         return <li key={val.code}>{val.name}</li>
//     }

//     return (
//         <ul>
//                 {
//                     data?.countries.map(c => SpawnElements(c))
//                 }
//         </ul>
//     )
// }

// export default Countries_Query_Page;