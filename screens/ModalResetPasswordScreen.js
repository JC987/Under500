import React from 'react'
import { Button, View, Text, TextInput} from 'react-native';
import * as firebase from 'firebase';

import '@firebase/firestore';

import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";
import { red } from '@material-ui/core/colors';


export default class ModalResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            emailSent:false,
            errorMessage:"",
            unregisteredEmail:false
        }
    }

    sendResetEmail = async (e) =>{
        const dbh = firebase.firestore();
        await dbh.collection('users').where("email", "==", this.state.email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              console.log("found");
                console.log(doc.data())
          });

        }).then( () => {
            firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
                // Email sent.
                console.log("reset password");
              })
              .then(()=>{this.setState({
                emailSent:true,
                unregisteredEmail:false
              })})
              .catch(function(error) {
                // An error happened.
                console.log(error)
              });
        }).catch(function(error){
            console.log(error)
        }).then(() =>{
            
                this.setState({
                    unregisteredEmail:true,
                    emailSent:false
                })
        });


       
      }

      getEmail = (e) => {
        
        this.setState({
          email:  e
        })
      }


    render(){
        return(
        <View>
            <View style = {{alignItems:'center', justifyContent:'center', height:500, padding:32}} >
                <Text style = {{fontSize:24, marginBottom:16}}>Reset your new password:</Text>
                <View style = {{flexDirection: 'row'}}>
                  <TextInput style = {{borderWidth:1, margin:4, height:50, width:300}} value = {this.state.email} onChangeText = {(e) => this.getEmail(e)} placeholder="Enter your email"/>
                </View>

                {this.state.emailSent &&
                    <Text style ={{marginTop:16, fontSize:16}}> 
                        An email has been sent to your email address. Please follow the instructions to reset your password.
                        
                    </Text>
                }

                {this.state.unregisteredEmail &&
                    <Text style ={{marginTop:16, fontSize:16, color:'red'}}> 
                        Email not registered! Go back to create an account!
                    </Text>
                }
                
                <View style = {{marginTop:32, width: 300}}>
                    <Button color = "darkorange" onPress = {() => {this.sendResetEmail()}} title = "Reset Password"/>
                </View>

                
            </View>
        </View>
        )
    }
}