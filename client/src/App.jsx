import React from "react";
<<<<<<< HEAD
import "./App.css";
// import { Navbar } from "./components/Header/Navbar";
=======
// import "./App.css";
>>>>>>> 95a65a2670d3277153f27f499c674c53c1422fd5
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

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
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
<<<<<<< HEAD

=======
>>>>>>> 95a65a2670d3277153f27f499c674c53c1422fd5
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
