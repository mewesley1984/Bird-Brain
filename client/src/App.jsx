import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from './components/Header/index'
import 'bootstrap/dist/css/bootstrap.min.css';

const APOLLO_URL = process.env.NODE_ENV === "production"
? "https://desolate-basin-48031-91eac769c520.herokuapp.com"
: "http://localhost:3001"

const httpLink = createHttpLink({
  uri: APOLLO_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
