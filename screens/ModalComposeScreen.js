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
            switchOther: false,
            switchAdventure: false,
            switchComedy: false,
         //   switchPoem: false,
         //   switchFiction: false,
            switchHorror: false,
            switchMystery: false,
         //   switchParody: false,
         //   switchNonFiction: false,
            switchSciFi: false,
            switchRomance: false,
            switchFantasy: false,
         //   switchThriller: false,
            body:[],
        }
        this.handleStory = this.handleStory.bind(this);
        this.handleSummary = this.handleSummary.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    handleStory = (text) =>{
        let spaces  = text.split(' ');
        let newLines = text.split('\n');
        let numOfWords = 0;
        let s = '';

        for(let i = 0; i < spaces.length; i++){
            //count the number of words
            if(spaces[i] != "")
                numOfWords++;
        }
        //count a new line as a word. I do this so that user can not surpase 500 words by creating new lines
        numOfWords += newLines.length;

        //501 because the very first line would count as a word and I don't want to count it
        if(numOfWords <= 501){
            s = text;
        }
        else{
            s = this.state.story;
            numOfWords--;
        }
        
        this.setState({
            storyLength: numOfWords - 1,
            story: s,
            storyChar: s.length
        })
    }

    handleSummary = (text) =>{
        //same situation apples for handleSummary as handleStory
        let spaces  = text.split(' ');
        let newLines = text.split('\n');
        let numOfWords = 0;
        let s = '';

        for(let i = 0; i < spaces.length; i++){
            if(spaces[i] != "")
            numOfWords++;
        }
        
        numOfWords += newLines.length;

        if(numOfWords <= 51){
            s = text;
        }
        else{
            s = this.state.summary;
            numOfWords--;
        }
        
        this.setState({
            summaryLength: numOfWords - 1,
            summary: s,
            summaryChar: s.length,
        })
    }

    handleTitle = (text) =>{
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

        if(numOfWords <= 11){
            s = text;
        }
        else{
            s = this.state.title;
            numOfWords--;
        }
        
        this.setState({
            titleLength: numOfWords - 1,
            title: s,
            titleChar: s.length
        })
   // }
    }
    
    handleSwitch = (e) =>{
        this.setState({
            switchValue: !this.state.switchValue
        })
    }
    handleSwitchAdventure = (e) =>{
        this.setState({
            switchAdventure: !this.state.switchAdventure
        })
    }
    handleSwitchComedy = (e) =>{
        this.setState({
            switchComedy: !this.state.switchComedy
        })
    }
    handleSwitchHorror = (e) =>{
        this.setState({
            switchHorror: !this.state.switchHorror
        })
    }
    handleSwitchMystery = (e) =>{
        this.setState({
            switchMystery: !this.state.switchMystery
        })
    }
    handleSwitchFantasy = (e) =>{
        this.setState({
            switchFantasy: !this.state.switchFantasy
        })
    }
    handleSwitchSciFi = (e) =>{
        this.setState({
            switchSciFi: !this.state.switchSciFi
        })
    }
    handleSwitchRomance = (e) =>{
        this.setState({
            switchRomance: !this.state.switchRomance
        })
    }
    handleSwitchOther = (e) =>{
        this.setState({
            switchOther: !this.state.switchOther
        })
    }

    handleSubmit = (e) =>{
    
    const db = firebase.firestore();
    
    var user = firebase.auth().currentUser;
    let tmp_a = user.displayName;
    let tmp_t = this.state.title;
    let tmp_s = this.state.summary;
    let tmp_b = this.state.story.split("\n");
    let upper = String(tmp_t).toUpperCase();
      
    // Add a new document with a generated id.
    let addDoc = db.collection('stroies').add({
        title: tmp_t,
        titleUpper: upper,
        summary: tmp_s,
        body:tmp_b,
        author:tmp_a,
        category:"other",
        createdAt: new Date().toISOString(),
    }).then(ref => {
        console.log('Added document with ID: ', ref.id);
        this.props.navigation.navigate("Home");
    }).catch(console.log("ERROR"));
    }
    
    render() {
      return (
        <View style={{ flex: 1}}>
            <ScrollView>
            <View style={{height:100}}>
      <Text style={{fontSize:20}}>   {this.state.titleLength} / 10 {"\n  "} {this.state.titleChar} / 100 Characters</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9}} value = {this.state.title} onChangeText = {(text) =>this.handleTitle(text)} multiline = {false} maxLength = {100} placeholder="Enter your story's title"/>
            </View>

            <View style={{height:150}}>
            <Text style={{fontSize:20}}>   {this.state.summaryLength} / 50 Words {"\n  "} {this.state.summaryChar} / 500 Characters</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, borderWidth:1, flex:9}} value = {this.state.summary} onChangeText ={(text => this.handleSummary(text))} multiline = {true} maxLength = {500} placeholder="Enter a brief summary of your story. Under 50 words!"/>
            </View>

            <View style={{height:500}}>
                <Text style={{fontSize:20}}>   {this.state.storyLength} / 500 Words {"\n  "} {this.state.storyChar} / 5000 Characters</Text>
                <TextInput style={{backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9, textAlignVertical:'top'}} value = {this.state.story} onChangeText = {(text) => this.handleStory(text)} multiline = {true} maxLength = {5000} placeholder="Write your story"/>    
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
                    <Text style={{marginLeft:16}}>OTHER</Text>

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