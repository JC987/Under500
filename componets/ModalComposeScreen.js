// Modalcomposescreen.js
import React, { Component } from 'react';
import { Button, View, Text, TextInput, Switch, Slider, Picker } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//let storyLength = 0;
//let story;
let ti = "YOLO";
export default class ModalComposeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            storyLength: 0,
            story:'',
            summaryLength: 0,
            summary:'',
            titleLength: 0,
            title:'',
            switchValue: false
        }
        this.handleStory = this.handleStory.bind(this);
        this.handleSummary = this.handleSummary.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
    }

    handleStory = (text) =>{
        //   if(e.target.value != undefined){
            console.log(text);
           let spaces  = text.split(' ');
           let newLines = text.split('\n');
        let num = 0;
        let s = '';

        for(let i = 0; i < spaces.length; i++){
            if(spaces[i] != "")
                num++;
        }
        
        num += newLines.length;

        if(num <= 501){
            s = text;
        }
        else{
            s = this.state.story;
            num--;
        }
        
        this.setState({
            storyLength: num - 1,
            story: s
        })
    }

    handleSummary = (text) =>{
        //   if(e.target.value != undefined){
            console.log(text);
           let spaces  = text.split(' ');
           let newLines = text.split('\n');
        let num = 0;
        let s = '';

        for(let i = 0; i < spaces.length; i++){
            if(spaces[i] != "")
                num++;
        }
        
        num += newLines.length;

        if(num <= 51){
            s = text;
        }
        else{
            s = this.state.summary;
            num--;
        }
        
        this.setState({
            summaryLength: num - 1,
            summary: s
        })
    }

    handleTitle = (text) =>{
     //   if(e.target.value != undefined){
         console.log(text);
        let spaces  = text.split(' ');
        let newLines = text.split('\n');
        let num = 0;
        let s = '';

        for(let i = 0; i < spaces.length; i++){
            if(spaces[i] != "")
                num++;
        }
        
        num += newLines.length;

        if(num <= 11){
            s = text;
        }
        else{
            s = this.state.title;
            num--;
        }
        
        this.setState({
            titleLength: num - 1,
            title: s
        })
   // }
    }
    
    handleSwitch = () =>{

    }
    render() {
      return (
        <View style={{ flex: 1}}>
            <ScrollView>
            <View style={{height:100}}>
                <Text style={{fontSize:24}}>{this.state.titleLength} / 10</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9}} value = {this.state.title} onChangeText = {(text) =>this.handleTitle(text)} multiline = {false} maxLength = {100} placeholder="Enter your story's title"/>
            </View>

            <View style={{height:150}}>
            <Text style={{fontSize:24}}>{this.state.summaryLength} / 50</Text>
                <TextInput style={{ backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, borderWidth:1, flex:9}} value = {this.state.summary} onChangeText ={(text => this.handleSummary(text))} multiline = {true} maxLength = {500} placeholder="Enter a brief summary of your story. Under 50 words!"/>
            </View>

            <View style={{height:500}}>
                <Text style={{fontSize:24}}>{this.state.storyLength} / 500</Text>
                <TextInput style={{backgroundColor: '#fff', borderWidth:1, margin: 8, padding: 4, flex:9, textAlignVertical:'top'}} value = {this.state.story} onChangeText = {(text) => this.handleStory(text)} multiline = {true} maxLength = {5000} placeholder="Write your story"/>    
            </View>     
          
            <View>
                <Text style={{fontSize:18, margin:8}}> 
                    Select categories that fit your story!
                </Text>
                
                <View style={{flexDirection:'row', flexWrap:'wrap',margin:8}}>
                    <View style={{flexDirection:'row'}}>
                        <Switch style={{marginLeft:16}}></Switch>
                        <Text style={{marginLeft:16}}>Adventure</Text>
                        <Switch style={{marginLeft:16}}></Switch>
                        <Text style={{marginLeft:16}}>Comedy</Text>
             
                    </View>
                    
             
                <View style={{flexDirection:'row'}}>
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Epic</Text>
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Fiction</Text>
                </View>
               
                <View style={{flexDirection:'row'}}>
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Horror</Text>
                    
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Mystery</Text>
                </View>
                    
                <View style={{flexDirection:'row'}}>
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Parody</Text>
                    
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Non-Fiction</Text>
                </View>    
                    
                <View style={{flexDirection:'row'}}>
                    <Switch style={{marginLeft:16}}></Switch>
                    <Text style={{marginLeft:16}}>Science-Ficition</Text>
                    
                    <Switch style={{marginLeft:16}} ></Switch>
                    <Text style={{marginLeft:16}}>Romance</Text>
                    
                </View>
                    
                <View style={{flexDirection:'row'}}>
                 
                    <Switch style={{marginLeft:16}} />
                    <Text style={{marginLeft:16}}>Thriller</Text>

                    
                    <Switch style={{marginLeft:16}} value={this.state.switchValue}  
                    onValueChange ={(switchValue)=>this.setState({switchValue})}/> 
                    <Text style={{marginLeft:16}}>OTHER</Text>
                </View>

                </View>
            </View>
                   
          <Button
            onPress={() => this.props.navigation.goBack()}
            title="Submit!"
          />
          </ScrollView>
        </View>
      );
    }
  }