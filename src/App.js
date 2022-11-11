import React from 'react';
import './App.scss';
import Header from './components/header/index.js';
import Footer from './components/footer';
import { ChakraProvider } from '@chakra-ui/react'
import Layout from './components/layout';
import { store } from './app/store';
import { getAll } from '../src/features/counter/counterSlice'

store.dispatch(getAll());

function App() {

  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <Layout />
        <Footer />
      </div>
    </ChakraProvider>

  );
}

export default App;
