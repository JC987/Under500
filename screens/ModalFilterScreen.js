import React from 'react'
import {Text, View, Button, Switch} from 'react-native'
import * as firebase from 'firebase';

import '@firebase/firestore';

import {  StackActions, NavigationActions, createAppContainer } from "react-navigation";


export default class ModalFilterScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            switchNewst: true,
            switchAdv: false,
            switchComedy: false,
            switchHorror: false,
            switchFantasy: false,
            switchSciFi: false,
            switchOther: false,
            switchAll: true,
            selectedCat: 'all',
        }
        

        this.switchNewst = this.switchNewst.bind(this);
        this.switchAdv = this.switchAdv.bind(this);
        this.switchComedy = this.switchComedy.bind(this);
        this.switchFantasy = this.switchFantasy.bind(this);
        this.switchHorror = this.switchHorror.bind(this);
        this.switchSciFi = this.switchSciFi.bind(this);
        this.switchOther = this.switchOther.bind(this);
        this.apply = this.apply.bind(this);
    }

    
    
    switchNewst = (e) =>{
        this.setState({
            switchNewst: !this.state.switchNewst,
        })
    }

    //TODO: Refactor code so that I don't need a seperate function for every switch
    switchAdv = (e) =>{
        this.setState({
            switchAdv: !this.state.switchAdv,
            switchComedy: false,
            switchHorror: false,
            switchFantasy: false,
            switchSciFi: false,
            switchOther: false,
            switchAll: this.state.switchAdv,
            selectedCat: (this.state.switchAdv) ? "all" : "adventure"
        })
    }
    switchComedy = (e) =>{
        this.setState({
            switchComedy: !this.state.switchComedy,
            switchAdv: false,
            switchHorror: false,
            switchFantasy: false,
            switchSciFi: false,
            switchOther: false,
            switchAll: this.state.switchComedy,
            selectedCat: (this.state.switchComedy) ? "all" : 'comedy',
        })
    }
    switchHorror = (e) =>{
        this.setState({
            switchHorror: !this.state.switchHorror,
            switchAdv: false,
            switchComedy: false,
            switchFantasy: false,
            switchSciFi: false,
            switchOther: false,
            switchAll: this.state.switchHorror,
            selectedCat: (this.state.switchHorror) ? "all" : 'horror',
        })
    }
    switchFantasy = (e) =>{
        this.setState({
            switchFantasy: !this.state.switchFantasy,
            switchAdv: false,
            switchComedy: false,
            switchHorror: false,
            switchSciFi: false,
            switchOther: false,
            switchAll:  this.state.switchFantasy,
            selectedCat: (this.state.switchFantasy) ? "all" : 'fantasy',
        })
    }
    switchSciFi = (e) =>{
        this.setState({
            switchSciFi: !this.state.switchSciFi,
            switchAdv: false,
            switchComedy: false,
            switchHorror: false,
            switchFantasy: false,
            switchOther: false,
            switchAll:  this.state.switchSciFi,
            selectedCat: (this.state.switchSciFi) ? "all" : 'scifi',
        })
    }
    switchOther = (e) =>{
        this.setState({
            switchOther: !this.state.switchOther,
            switchAdv: false,
            switchComedy: false,
            switchHorror: false,
            switchFantasy: false,
            switchSciFi: false,
            switchAll: this.state.switchOther,
            selectedCat: (this.state.switchOther) ? "all" : 'other',
        })
    }


    switchAll = (e) =>{
        this.setState({
            switchAll: true,
            switchAdv: false,
            switchComedy: false,
            switchHorror: false,
            switchFantasy: false,
            switchSciFi: false,
            switchOther: false,
            selectedCat: 'all',
        })
    }
    
    apply = (e) =>{
        //console.log(this.state.selectedCat);
        const dbh = firebase.firestore();
        let storiesRef = dbh.collection('stroies');//misspelled stories in firebase :/
        
        if(this.state.selectedCat != "all"){
            storiesRef = storiesRef.where("category", "==", this.state.selectedCat);//.orderBy("createdAt", "desc")
        }
        
        if(this.state.switchNewst)
            storiesRef = storiesRef.orderBy("createdAt", "desc");
        else
            storiesRef = storiesRef.orderBy("createdAt", "asc");

       const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home', params: {
                filter: storiesRef,
                fetch: true
                } 
            } )],
        });
        this.props.navigation.dispatch(resetAction);
        

    }

    render(){
        return(
            <View>
                <View style ={{flexDirection:'row', margin:32}}>
                    <Text>
                    Sort options
                    </Text>
                </View>

                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Newest First
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchNewst}  
                    onValueChange ={(e)=>{this.switchNewst(e)}}/>
                </View>
                
                <View style ={{flexDirection:'row', margin:32}}>
                    <Text>
                    Select categories
                    </Text>
                </View>

                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show All
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchAll}  
                    onValueChange ={(e)=>{this.switchAll(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Adventure
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchAdv}  
                    onValueChange ={(e)=>{this.switchAdv(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Comedy
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchComedy}  
                    onValueChange ={(e)=>{this.switchComedy(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Horror
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchHorror}  
                    onValueChange ={(e)=>{this.switchHorror(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Fantasy
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFantasy}  
                    onValueChange ={(e)=>{this.switchFantasy(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                     Show Sci-Fi
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchSciFi}  
                    onValueChange ={(e)=>{this.switchSciFi(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Other
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchOther}  
                    onValueChange ={(e)=>{this.switchOther(e)}}/>
                </View>
                
                <Button title = "apply!" onPress={() => {
                    this.apply()
                }}/>
            </View>
            
        );
    }
} 