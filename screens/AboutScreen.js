// Aboutscreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, KeyboardAvoidingView, FlatList } from 'react-native';
import * as firebase from 'firebase';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";

import Login from './LoginScreen';
import SignUp from './SignupScreen';
import StoryItem from '../components/StoryItem';
import ProgressBar from 'react-native-progress/Bar';
export default class Aboutscreen extends React.Component {
  constructor(props){
    super(props);
      this.state = {
            userInfo:"",
            switchText:"Or Sign Up",
            login:true,
            list:[],
            showButton:true,
            fetched:false,
            emailSent:false,
        }

        this.signOut = this.signOut.bind(this);
        this.switchScreens = this.switchScreens.bind(this);
        this.getStories = this.getStories.bind(this);
        this.resendEmail = this.resendEmail.bind(this);

        
    }

    resendEmail = (e) =>{
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email sent.
        console.log("re-sent")
        
      }).then(()=>{
        this.setState({
          emailSent:true
        })
      }).catch(function(error) {
        // An error happened.
        console.log(error);
      });
    }

    sendResetEmail = (e) =>{
      var auth = firebase.auth();
      var emailAddress = auth.currentUser.email

      auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        console.log("reset password");
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
    }

  signOut = (e) =>{
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("sign out successful");
      const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' } )],});
      this.props.navigation.dispatch(resetAction);
    }).catch(function(error) {
      // An error happened.
      console.log("sign out failed" + error);
    });
  }

  getStories = (e) => {
    if(!this.state.showButton){
      this.setState({
        showButton: true
      })
      return;
    }
    if(this.state.fetched){
      this.setState({
        showButton: false,
      })
      return;
    }

    
    let user = firebase.auth().currentUser;
    if(user !== null){
    const dbh = firebase.firestore();
    let storiesRef = dbh.collection('stories');
    let myStories = storiesRef.where('author', '==', user.displayName).get()
    .then(snapshot => {
      console.log(snapshot);
      snapshot.forEach(doc => {
          this.setState({
            list: [...this.state.list, {title : doc.data()['title'], author : doc.data()['author'], summary : doc.data()['summary'], body : doc.data()['body'], time: doc.data()['createdAt'], storyId: doc.data()['storyId'] , favList:[] }],
            fetched: true,
            showButton: false,
          },

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
          <ScrollView>
          <View style={{ }}>
            <View style = {{padding:32}}>
                <Text style = {{textDecorationLine:'underline', fontSize:18}}>User Info:</Text>
                <View>
                  { !user.emailVerified && 
                  <View>
                    <Text style = {{padding:16, fontSize:24}} >
                    Your email is not verified! Please check your email or click the button to resend it.
                    </Text>
                    <Button color = "darkorange" onPress = {() => {this.resendEmail()}} title = {(!this.state.emailSent) ? "Resend Email" : "Email has been sent"}/>
                  </View>
                  }
                  <Text style = {{padding:16}}>
                    User Name : {user.displayName} 
                  </Text>
                  
                  <Text style = {{padding:16}}>
                    Email : {user.email} 
                  </Text>
                  
                  <Text style = {{padding:16}}>
                    User ID : {user.uid}
                  </Text>



                  <View style = {{justifyContent: 'center', alignItems: 'center'}}>

                  <View style = {{marginTop:32, width: 300}}>
                    <Button color = "darkorange" onPress = {() => {this.signOut()}} title = "Sign Out!"/>
                  </View>

                  <View style = {{marginTop:32, width: 300}}>
                    <Button color = "darkorange" onPress = {() => {this.sendResetEmail()}} title = "Reset password"/>
                  </View>

                  
                  <View style = {{marginTop:32, width: 300}}>
                    <Button style = {{width: 100}} color = "#0ca379" title = {(this.state.showButton ? "Show your stories" : "Hide your stories")} onPress = {() => {this.getStories()}}/>

                  </View>

                  

                  </View>
                  
                 {!this.state.showButton &&
                   
                    <View style = {{margin:16}}>
                      <Text style = {{textDecorationLine:'underline', fontSize:18, padding:16}}>
                        Below is your stories:
                      </Text>
                      <FlatList
                        refreshing = {true}
                        data={this.state.list}
                        renderItem={({item}) => <StoryItem title = {item.title} author = {item.author} summary = {item.summary} body = {item.body} nav = {this.props} time = {item.time} favList = {item.favList} storyId = {item.storyId}  /> }
                      />
                    </View>
                  }
                    
                 
                  
                </View>
            </View>
          </View>
          </ScrollView>
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
