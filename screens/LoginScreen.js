// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ProgressBar from 'react-native-progress/Bar';
export default class LoginScreen extends Component{
  constructor(props){
    super(props);
      this.state = {
          email: "",
          password: "",
          login:true,
          errorMessage:"",
          showProgress:false,
      }
      this.getEmail = this.getEmail.bind(this);
      this.getPassword = this.getPassword.bind(this);
      this.signIn = this.signIn.bind(this);
    }

    getEmail = (e) =>{
      this.setState({
          email: e
      })
    }
    getPassword = (e) => {
      this.setState({
          password:  e
      })
    }

    

    signIn = (e) =>{
      let user = firebase.auth().currentUser;
      this.setState({
        showProgress:true
      })
      if (user) {
        console.log("already signed in");
        this.props.nav.navigate("Home");
      } 
      else {
        console.log("not signed in");
  
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
          this.props.nav.navigate("Home");
        }).catch((error) => {
          this.setState({
            errorMessage: "Can't find a matching email and password.",
            showProgress:false
          })
        });
      }
    }

    render() {   
      let prog;
      if(this.state.showProgress){
          prog = <View>
                <ProgressBar width={300} indeterminate={true} />
                </View>
      }
      return (
        <View>
          <View style = {{alignItems:'center', justifyContent:'center', height:500, padding:32}} >
              <Text style = {{fontSize:24}}>Login:</Text>
              {prog}
              <View style ={{ flexDirection:'row'}}>
                <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.email} onChangeText = {(e) => this.getEmail(e)} placeholder="Enter your email"/>
              </View>

              <View style = {{flexDirection: 'row'}}>
                <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.password} onChangeText = {(e) => this.getPassword(e)} placeholder="Enter your password"/>
              </View>
              
              <View style = {{justifyContent:'space-between'}}>

                <View style ={{margin:12, width:250}}>
                  <Button onPress = {() => {this.signIn()}} title = "LogIn"/>
                  <Text style={{textAlign:'center', color:'red'}}>
                    {this.state.errorMessage}
                  </Text>
                </View>

              </View>
          </View>
        </View>
      )
      
    }
}