// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Alert } from 'react-native';
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Login from './LoginScreen';
import SignUp from './SignupScreen';
export default class Aboutscreen extends React.Component {
  constructor(props){
    super(props);
      this.state = {
            userInfo:"",
            switchText:"Or Sign Up",
            login:true,
        }
        this.signOut = this.signOut.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
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

  handleSwitch = (e) =>{
    console.log("switch");
    this.setState({
      switchText: (!this.state.login) ? "Or Sign Up" : "Or Log In",
      login:!this.state.login
    });
  }
  render() {
    let user = firebase.auth().currentUser;
    
    if (user != null) {
        console.log("user loged in");
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
        console.log("user not loged in");

        let display = <Login nav = {this.props.navigation} />
        if(!this.state.login)
          display = <SignUp nav = {this.props.navigation}/> 

        return (
          <View style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
              {display}
              
              <TouchableOpacity onPress = {() => { this.handleSwitch()}}>
                          <Text style = {{color:'blue', textDecorationLine:'underline', fontSize:16}}>
                            {this.state.switchText}
                          </Text>
              </TouchableOpacity>

          </View>
          
        )
    }
  }
}
