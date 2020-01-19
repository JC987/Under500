// Modalcomposescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Switch, Slider, Picker, CheckBox, Input } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
            body:[],
        }
        let user = firebase.auth().currentUser;
    
        console.log(user);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                //same situation apples for handleSummary as handleTitle
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
    let yo;
    var user = firebase.auth().currentUser;
    let tmp_a = user.displayName;
    let tmp_t = this.state.title;
    let tmp_s = this.state.summary;
    let tmp_b = this.state.story.split("\n");
    let upper = String(tmp_t).toUpperCase();
    let date = new Date().toISOString();

    
    let myS = []; 
    
    let docName = tmp_a + date;


          let getDoc = await db.collection('users').where("userId", "==", user.uid).get()
          .then(snapshot => {
            snapshot.forEach(doc => {
                myS = doc.data()['myStories'];
            });
          }).then(() =>{
              
            let addDoc =  db.collection('stroies').doc(docName).set({
                title: tmp_t,
                titleUpper: upper,
                summary: tmp_s,
                body:tmp_b,
                author:tmp_a,
                storyId: docName,
                category:this.state.switchValue,
                createdAt: date
            }).then( () =>  {
                myS.push(docName);
                console.log(myS);
                let setStories = db.collection('users').doc(user.uid).update({
                    myStories: myS
                }).then( () => {
                    this.props.navigation.navigate("Home");
                })
        
            }).catch(err => {
                console.log('Error getting documentsiuyuiok', err);
              });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });

   
    
    }
    
    render() {
      return (
        <View style={{ flex: 1}}>
            <ScrollView>
            <View style={{height:100}}>
                <Text style={{fontSize:20}}>   {this.state.titleLength} / 10 {"\n  "} {this.state.titleChar} / 100 Characters</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9}} value = {this.state.title} onChangeText = {(text) => this.handleTextInput(text,"title",10)} multiline = {false} maxLength = {100} placeholder="Enter your story's title"/>
            </View>

            <View style={{height:150}}>
                <Text style={{fontSize:20}}>   {this.state.summaryLength} / 50 Words {"\n  "} {this.state.summaryChar} / 500 Characters</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, borderWidth:1, flex:9}} value = {this.state.summary} onChangeText ={(text => this.handleTextInput(text,"summary",50))} multiline = {true} maxLength = {500} placeholder="Enter a brief summary of your story. Under 50 words!"/>
            </View>

            <View style={{height:500}}>
                <Text style={{fontSize:20}}>   {this.state.storyLength} / 500 Words {"\n  "} {this.state.storyChar} / 5000 Characters</Text>
                <TextInput style={{backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9, textAlignVertical:'top'}} value = {this.state.story} onChangeText = {(text) => this.handleTextInput(text,"body",500)} multiline = {true} maxLength = {5000} placeholder="Write your story"/>    
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
                    onValueChange ={()=>{this.handleSwitchOther()
                    }}/> 
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