import {View, Text, Pressable, Alert, TextInput} from 'react-native';
import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <View className="p-3">
      <Signup />
      <Login />
    </View>
  );
};

export default App;
