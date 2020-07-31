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
            catArr:['other'],
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
      
        if(this.state.catArr.includes("adventure")){
            let index = this.state.catArr.indexOf("adventure")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchAdventure:false
            })
        }
        else{
            this.state.catArr.push('adventure');
            console.log(this.state.catArr);
            this.setState({
                switchAdventure:true
            })
        }
    }
    handleSwitchComedy = (e) =>{
        if(this.state.catArr.includes("comedy")){
            let index = this.state.catArr.indexOf("comedy")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchComedy:false
            })
        }
        else{
            this.state.catArr.push('comedy');
            console.log(this.state.catArr);
            this.setState({
                switchComedy:true
            })
        }
    }
    handleSwitchHorror = (e) =>{
        if(this.state.catArr.includes("horror")){
            let index = this.state.catArr.indexOf("horror")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchHorror:false
            })
        }
        else{
            this.state.catArr.push('horror');
            console.log(this.state.catArr);
            this.setState({
                switchHorror:true
            })
        }
    }
    handleSwitchMystery = (e) =>{
        if(this.state.catArr.includes("mystery")){
            let index = this.state.catArr.indexOf("mystery")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchMystery:false
            })
        }
        else{
            this.state.catArr.push('mystery');
            console.log(this.state.catArr);
            this.setState({
                switchMystery:true
            })
        }
    }
    handleSwitchFantasy = (e) =>{
        if(this.state.catArr.includes("fantasy")){
            let index = this.state.catArr.indexOf("fantasy")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchFantasy:false
            })
        }
        else{
            this.state.catArr.push('fantasy');
            console.log(this.state.catArr);
            this.setState({
                switchFantasy:true
            })
        }
    }
    handleSwitchSciFi = (e) =>{
        if(this.state.catArr.includes("scifi")){
            let index = this.state.catArr.indexOf("scifi")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchSciFi:false
            })
        }
        else{
            this.state.catArr.push('scifi');
            console.log(this.state.catArr);
            this.setState({
                switchSciFi:true
            })
        }
    }
    handleSwitchRomance = (e) =>{
        if(this.state.catArr.includes("romance")){
            let index = this.state.catArr.indexOf("romance")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchRomance:false
            })
        }
        else{
            this.state.catArr.push('romance');
            console.log(this.state.catArr);
            this.setState({
                switchRomance:true
            })
        }
    }
    handleSwitchOther = (e) =>{
        if(this.state.catArr.includes("other")){
            let index = this.state.catArr.indexOf("other")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                //switchAll:false,
                switchOther:false
            })
        }
        else{
            this.state.catArr.push('other');
            console.log(this.state.catArr);
            this.setState({
                switchOther:true
            })
        }
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
                    category: this.state.catArr,
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