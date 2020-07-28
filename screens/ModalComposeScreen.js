// Modalcomposescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Switch, Slider, Picker, CheckBox, Input } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";
import ProgressBar from 'react-native-progress/Bar';
import * as firebase from 'firebase';

import '@firebase/firestore';
export default class ModalComposeScreen extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            storyChar:0,
            storyLength: 0,
            story:'',
            summaryChar:0,
            summaryLength: 0,
            summary:'',
            titleChar:0,
            titleLength: 0,
            title:'',
            switchOther: true,
            switchAdventure: false,
            switchComedy: false,
            switchHorror: false,
            switchMystery: false,
            switchSciFi: false,
            switchRomance: false,
            switchFantasy: false,
            switchValue: "other",
            emailSent:false,
            body:[],
        }
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
   
    
    
    handleSwitchAdventure = (e) =>{
        this.setState({
            switchAdventure: !this.state.switchAdventure,
            switchComedy:false,
            switchFantasy:false,
            switchHorror:false,
            switchMystery:false,
            switchOther:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"adventure"
        })
    }
    handleSwitchComedy = (e) =>{
        this.setState({
            switchComedy: !this.state.switchComedy,
            switchAdventure:false,
            switchFantasy:false,
            switchHorror:false,
            switchMystery:false,
            switchOther:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"comedy"
        })
    }
    handleSwitchHorror = (e) =>{
        this.setState({
            switchHorror: !this.state.switchHorror,
            switchAdventure:false,
            switchComedy:false,
            switchFantasy:false,
            switchMystery:false,
            switchOther:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"horror"
        })
    }
    handleSwitchMystery = (e) =>{
        this.setState({
            switchMystery: !this.state.switchMystery,
            switchAdventure:false,
            switchComedy:false,
            switchFantasy:false,
            switchHorror:false,
            switchOther:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"mystery"
        })
    }
    handleSwitchFantasy = (e) =>{
        this.setState({
            switchFantasy: !this.state.switchFantasy,
            switchAdventure:false,
            switchComedy:false,
            switchHorror:false,
            switchMystery:false,
            switchOther:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"fantasy"
        })
    }
    handleSwitchSciFi = (e) =>{
        this.setState({
            switchSciFi: !this.state.switchSciFi,
            switchAdventure:false,
            switchComedy:false,
            switchFantasy:false,
            switchHorror:false,
            switchMystery:false,
            switchOther:false,
            switchRomance:false,
            switchValue:"scifi"
        })
    }
    handleSwitchRomance = (e) =>{
        this.setState({
            switchRomance: !this.state.switchRomance,
            switchAdventure:false,
            switchComedy:false,
            switchFantasy:false,
            switchHorror:false,
            switchMystery:false,
            switchOther:false,
            switchSciFi:false,
            switchValue:"romance"
        })
    }
    handleSwitchOther = (e) =>{
        this.setState({
            switchOther: !this.state.switchOther,
            switchAdventure:false,
            switchComedy:false,
            switchFantasy:false,
            switchHorror:false,
            switchMystery:false,
            switchRomance:false,
            switchSciFi:false,
            switchValue:"other"
        })
    }

    handleTextInput = (text, currentText, maxWords) =>{
            let spaces  = text.split(' ');
            let newLines = text.split('\n');
            let numOfWords = 0;
            let s = '';
    
            for(let i = 0; i < spaces.length; i++){
                if(spaces[i] != "")
                numOfWords++;
            }
            
            numOfWords += newLines.length;
    
            if(numOfWords <= maxWords+1){
                s = text;
            }
            else{
                s = this.state[currentText]
                numOfWords--;
            }
            if(currentText == "title"){
                this.setState({
                    titleLength: numOfWords - 1,
                    title: s,
                    titleChar: s.length
                })
            }
            else if (currentText == "summary"){
                this.setState({
                    summaryLength: numOfWords - 1,
                    summary: s,
                    summaryChar: s.length,
                })
            }
            else{
                this.setState({
                    storyLength: numOfWords - 1,
                    story: s,
                    storyChar: s.length
                })
            }
               
    }

    handleSubmit =  async (e) => {

        const db = firebase.firestore();
        let user = firebase.auth().currentUser;
        let displayName = user.displayName;
        let storyTitle = this.state.title;
        let storySummary = this.state.summary;
        let storyBody = this.state.story.split("\n");
        let titleUpperCase = String(storyTitle).toUpperCase();
        let date = new Date().toISOString();

        
        let myStories = []; 
        
        let docName = displayName + date;
            console.log("here");

            let getMyStories = await db.collection('users').where("userId", "==", user.uid).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    myStories = doc.data()['myStories'];
                });
            }).then(() =>{
                
                let addStory =  db.collection('stories').doc(docName).set({
                    title: storyTitle,
                    titleUpper: titleUpperCase,
                    summary: storySummary,
                    body: storyBody,
                    author: displayName,
                    storyId: docName,
                    category: this.state.switchValue,
                    createdAt: date

                }).then( () =>  {
                    myStories.push(docName);
                    console.log(myStories);

                    let setStory = db.collection('users').doc(user.uid).update({
                        myStories: myStories
                    }).then( () => {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Home'} )],
                        });
                        this.props.navigation.dispatch(resetAction);
                        
                    })
            
                }).catch(err => {
                    console.log('Error setting document', err);
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });

    }
    
    render() {
        if(!firebase.auth().currentUser.emailVerified){
            return(  
            <View>
                <Text style = {{padding:16, fontSize:24}} >
                Your email is not verified! You need a verified email to post a story! Please check your email or click the button to resend it.
                </Text>
                <Button color = "darkorange" onPress = {() => {this.resendEmail()}} title = {(!this.state.emailSent) ? "Resend Email" : "Email has been sent"}/>
            </View>);
        }
        else{ 
      return (
      
        <View style={{ flex: 1}}>
            <ScrollView>
                <View style={{height:100}}>
                    <Text style={{fontSize:20}}>   {this.state.titleLength} / 10 {"\n  "} {this.state.titleChar} / 100 Characters</Text>
                    <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9}} value = {this.state.title} 
                    onChangeText = {(text) => this.handleTextInput(text,"title",10)} multiline = {false} maxLength = {100} placeholder="Enter your story's title"/>
                </View>

                <View style={{height:150}}>
                    <Text style={{fontSize:20}}>   {this.state.summaryLength} / 50 Words {"\n  "} {this.state.summaryChar} / 500 Characters</Text>
                    <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9}} value = {this.state.summary} 
                    onChangeText ={(text => this.handleTextInput(text,"summary",50))} multiline = {true} maxLength = {500} placeholder="Enter a brief summary of your story. Under 50 words!"/>
                </View>

                <View style={{height:500}}>
                    <Text style={{fontSize:20}}>   {this.state.storyLength} / 500 Words {"\n  "} {this.state.storyChar} / 5000 Characters</Text>
                    <TextInput style={{backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9, textAlignVertical:'top'}} 
                    value = {this.state.story} onChangeText = {(text) => this.handleTextInput(text,"body",500)} multiline = {true} maxLength = {5000} placeholder="Write your story"/>    
                </View>     
            
                <View>
                    <Text style={{fontSize:18, margin:8}}> 
                        Select categories that fit your story!
                    </Text>
                    
                    <View style={{flexDirection:'row', flexWrap:'wrap',margin:8}}>
                        <View style={{flexDirection:'row'}}>
                            <Switch style={{marginLeft:16}} value={this.state.switchAdventure}  
                                onValueChange ={() => {this.handleSwitchAdventure()}}></Switch>
                            <Text style={{marginLeft:16}}>Adventure</Text>
                            <Switch style={{marginLeft:16}} value={this.state.switchComedy}  
                                onValueChange ={() => {this.handleSwitchComedy()}}></Switch>
                            <Text style={{marginLeft:16}}>Comedy</Text>
                        </View>
                        
                        <View style={{flexDirection:'row'}}>
                            <Switch style={{marginLeft:16}} value={this.state.switchHorror}  
                                onValueChange ={() => {this.handleSwitchHorror()}}></Switch>
                            <Text style={{marginLeft:16}}>Horror</Text>

                            <Switch style={{marginLeft:16}} value={this.state.switchSciFi}  
                                onValueChange ={() => {this.handleSwitchSciFi()}}></Switch>
                            <Text style={{marginLeft:16}}>Science-Ficition</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Switch style={{marginLeft:16}} value={this.state.switchMystery}  
                                onValueChange ={() => {this.handleSwitchMystery()}}></Switch>
                            <Text style={{marginLeft:16}}>Mystery</Text>

                            <Switch style={{marginLeft:16}} value={this.state.switchRomance}  
                                onValueChange ={() => {this.handleSwitchRomance()}}></Switch>
                            <Text style={{marginLeft:16}}>Romance</Text>
                        </View>
                            
                    
                        <View style={{flexDirection:'row'}}>
                        
                            <Switch style={{marginLeft:16}} value={this.state.switchFantasy}  
                                onValueChange ={() => {this.handleSwitchFantasy()}}/> 
                            <Text style={{marginLeft:16}}>Fantasy</Text>

                            
                            <Switch style={{marginLeft:16}} value={this.state.switchOther}  
                                onValueChange ={()=>{this.handleSwitchOther()}}/> 
                            <Text style={{marginLeft:16}}>Other</Text>
                        </View>

                    </View>
                
                </View>
            <Button
                onPress={() => {
                this.handleSubmit();
                }}
                color = "darkorange"
                title="Submit!"
            />
           
          </ScrollView>
        </View>
      );
            }

    }
  }