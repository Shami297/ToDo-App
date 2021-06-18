import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Route } from 'react-router-native';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Main from './components/Main';


export default function App() {
  return (
    <NativeRouter>
      <Route exact path="/" component={Login} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/main" component={Main} />
    </NativeRouter>
  );
}

