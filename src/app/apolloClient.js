import { ApolloClient, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const isServer = typeof window === "undefined";

const client = new ApolloClient({
    uri: isServer?'http://localhost:3000/api/graphql':'/api/graphql',
    cache: new InMemoryCache({
        typePolicies:{
            Query:{
                fields:{
                    leituras:offsetLimitPagination()
                }
            }
        }
    }),
});

export default client;