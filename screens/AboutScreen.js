// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import { createAppContainer } from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Login from './LoginScreen';
import SignUp from './SignupScreen';
import Box from '../components/Box';
export default class Aboutscreen extends React.Component {
  constructor(props){
    super(props);
      this.state = {
            userInfo:"",
            switchText:"Or Sign Up",
            login:true,
            list:[],
        }

        this.signOut = this.signOut.bind(this);
        this.switchScreens = this.switchScreens.bind(this);
        this.getStories = this.getStories.bind(this);

        
        this.getStories();
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

  getStories = (e) => {
    
    let user = firebase.auth().currentUser;
    if(user !== null){
    const dbh = firebase.firestore();
    let storiesRef = dbh.collection('stroies');//misspelled stories in firebase :/
    let myStories = storiesRef.where('author', '==', user.displayName).get()
    .then(snapshot => {
      console.log(snapshot);
      snapshot.forEach(doc => {
          this.setState({
            list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], body : doc.data()['body']} ],
            fetched: true,
          },
         // console.log("state saved"),
          
          //console.log(this.state.posts)
          ); 
      });
    })
  }
  }



  switchScreens = (e) =>{
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
          <View style={{ flex: 1, alignItems:'center', justifyContent: 'center' }}>
            <Text >About Screen</Text>
            <View style = {{backgroundColor:"pink",padding:32}}>
                <Text style = {{textDecorationLine:'underline', fontSize:18}}>User Info:</Text>
                <View>
                  <Text style = {{padding:16}}>
                    User Name : {user.displayName}
                  </Text>
                  
                  <Text style = {{padding:16}}>
                    Email : {user.email}
                  </Text>
                  
                  <Text style = {{padding:16}}>
                    User ID : {user.uid}
                  </Text>

                  <Text style = {{textDecorationLine:'underline', fontSize:18, padding:16}}>
                    Below is your stories:
                  </Text>
                  
                  <FlatList
                    refreshing = {true}
                    data={this.state.list}
                    renderItem={({item}) => <Box title = {item.title} author = {item.author} summary = {item.summary} body = {item.body} nav = {this.props} /> }
                  />
                  
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
            <KeyboardAvoidingView  style={{ flex: 1, alignItems:'center', justifyContent:'center'}} behavior="padding" enabled>
              {display}
              
              <TouchableOpacity onPress = {() => { this.switchScreens()}}>
                          <Text style = {{color:'blue', textDecorationLine:'underline', fontSize:16}}>
                            {this.state.switchText}
                          </Text>
              </TouchableOpacity>

          </KeyboardAvoidingView>
          
        )
    }
  }
}
