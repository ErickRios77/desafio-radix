import { ApolloClient, InMemoryCache } from "@apollo/client";

const isServer = typeof window === "undefined";

const client = new ApolloClient({
    uri: isServer?'http://localhost:3000/api/graphql':'/api/graphql',
    cache: new InMemoryCache(),
});

export default client;