// Homescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import * as firebase from 'firebase';
import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";


import ProgressBar from 'react-native-progress/Bar';

export default class SignupScreen extends Component{
    constructor(props){
      super(props);
        this.state = {
          email: "",
          password: "",
          confirmPassword:"",
          displayName:"",
          login:true,
          allowSignUp:false,
          errorMessage:"",
          showProgress:false,
          vaildPassword:false,
          vaildConfirmedPassword:false,
          vailidUserName:false
        }
        
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.getDisplayName = this.getDisplayName.bind(this);
        this.signUp = this.signUp.bind(this);
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

        if(e.length > 7 && /\d/.test(e) && /[A-Z]/.test(e)){
          this.setState({
            vaildPassword:true,
            errorMessage:""
          })
        }
        else {
          this.setState({
            allowSignUp:false,
            errorMessage:"Password must be 8 characters long, contain at least 1 number, and 1 least capital letter"
          })
        }


        if(e.length > 7 && /\d/.test(e) && /[A-Z]/.test(e) && this.state.displayName.length >= 3 && !(/^\s*$/.test(this.state.displayName)) ){
          this.setState({
            vaildPassword:true,
            allowSignUp:true,
            errorMessage:""
          })
        }
      }

      getConfirmPassword = (e) => {
          this.setState({
              confirmPassword:  e
          })

          if(e == this.state.password && e.length > 7 && /\d/.test(e) && /[A-Z]/.test(e)){
            this.setState({
              vaildConfirmedPassword:true,
              errorMessage:""
            })
          }
          else {
            this.setState({
              allowSignUp:false,
              errorMessage:"Passwords don't match"
            })
          }

          
          if(e == this.state.password && e.length > 7 && /\d/.test(e) && /[A-Z]/.test(e) && this.state.displayName.length >= 3 && !(/^\s*$/.test(this.state.displayName))  ){
            this.setState({
              allowSignUp:true,
              errorMessage:""
            })
          }
      }
        
      getDisplayName = (e) => {
            this.setState({
                displayName:  e
            })

           

            if(e.length >= 3 && !(/^\s*$/.test(e)) ){
              this.setState({
                vailidUserName:true,
                errorMessage:""
              })
            }
            else {
              this.setState({
                allowSignUp:false,
                errorMessage:"Username is must be 3 characters long"
              })
            }

            if(this.state.confirmPassword == this.state.password && this.state.password.length > 7 && /\d/.test(this.state.password) && /[A-Z]/.test(this.state.password) && e.length >= 3 && !(/^\s*$/.test(e)) ){
              
              this.setState({
                vailidUserName:true,
                allowSignUp:true,
                errorMessage:""
              })
            }
            
      }

      signUp = (e) =>{
        this.setState({showProgress:true})
        const db = firebase.firestore();
        let query  = db.collection('users').where('displayName', '==', this.state.displayName).get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log('No matching documents.');


            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                
                user['user'].updateProfile({
                  displayName: this.state.displayName
                });
                

                // Add a new document with the following id.
                let addDoc = db.collection('users').doc(user['user']['uid']).set({
                  displayName: this.state.displayName,
                  email: this.state.email,
                  password: this.state.password,
                  userId: user['user']['uid'],
                  myStories:[],
                  fav:[],
                  createdAt: new Date().toISOString(),

                }).then(ref => {

                    console.log('Added document: ', ref);

                })
              }).then(() => {
                const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Home' } )],
                  });
                  this.props.nav.dispatch(resetAction);

              }).catch((error) => {

                console.log( error.code);
                console.log(error.message);
              
              this.setState({
                errorMessage:error.message,
                showProgress:false,
              })
              
            });

              return;
          }  
        
          this.setState({
            errorMessage:"Display Name taken",
            showProgress:false,
          });

        })
        .catch(err => {
          console.log('Error getting documents', err);
        });

        

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
            <View style = {{alignItems:'center', justifyContent:'center', height:500,padding:32}} >
                <Text style = {{fontSize:24}}>Sign up:</Text>
                {prog}
                <View style ={{ flexDirection:'row'}}>
                  <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.email} onChangeText = {(e) => this.getEmail(e)} placeholder="Enter an email"/>
                </View>

                <View style = {{flexDirection: 'row'}}>
                  <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.password} onChangeText = {(e) => this.getPassword(e)} placeholder="Create a password"/>
                </View>

                <View style = {{flexDirection: 'row'}}>
                  <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.confirmPassword} onChangeText = {(e) => this.getConfirmPassword(e)} placeholder="Confirm your password"/>
                </View>

                <View style = {{flexDirection: 'row'}}>
                  <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.displayName} onChangeText = {(e) => this.getDisplayName(e)} placeholder="Enter a unique display name"/>
                </View>


                
                <View style = {{justifyContent:'space-between'}}>
                  <View style ={{margin:12, width:250}}  >
                    
                    <Button disabled = {!this.state.allowSignUp}   onPress = {() => {this.signUp()}} title = "SignUp"/>
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