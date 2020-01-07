// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
export default class Aboutscreen extends React.Component {
  constructor(props){
    super(props);
      this.state = {
            email: "",
            password: "",
            userInfo:""
        }
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    getEmail = (e) =>{
        //console.log(e);
        this.setState({
            email: e
        })
    }
    getPassword = (e) => {
      //console.log(e);
        this.setState({
            password:  e
        })
    }

  
  signOut = (e) =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("sign out successful");
      this.props.navigation.navigate("Home");
    }).catch(function(error) {
      // An error happened.
      console.log("sign out failed" + error);
    });
  }

  signIn = (e) =>{
    let user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log("already signed in");
      this.props.navigation.navigate("Home");
    } else {
      // No user is signed in.
      console.log("not signed in");

      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        this.props.navigation.navigate("Home"),
        console.log("going home sign un")
      }).catch(function(error) {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    }
  }

  signUp = (e) =>{
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(() => {
        
      this.props.navigation.navigate("Home"),
      console.log("going home from signup")
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
    });

  }

  render() {
    let user = firebase.auth().currentUser;

    if (user != null) {
        console.log("user not null");
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Screen</Text>
            <View>
                <Text>User Info:</Text>
                <View>
                  <Text>
                    User Name : {user.displayName}
                  </Text>
                  
                  <Text>
                    Email : {user.email}
                  </Text>
                  
                  <Text>
                    User ID : {user.uid}
                  </Text>
                  
                </View>
            </View>
            <Button onPress = {() => {this.signOut()}} title = "Sign Out!"/>
          </View>
        )
    }
    else{
        console.log("user is null");
    
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About Screen</Text>
            <View>
                <TextInput value = {this.state.email} onChangeText = {(e) => this.getEmail(e)} placeholder="Enter your email"/>
                <TextInput value = {this.state.password} onChangeText = {(e) => this.getPassword(e)} placeholder="Enter your password"/>
                <Button onPress = {() => {this.signIn()}} title = "LogIn"/>
                <Button onPress = {() => {this.signUp()}} title = "SignUp"/>
            </View>
          </View>
        )
    }
  }
}