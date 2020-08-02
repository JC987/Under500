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
            switchFavorite: false,
            switchAdv: true,
            switchComedy: true,
            switchHorror: true,
            switchFantasy: true,
            switchSciFi: true,
            switchOther: true,
            switchMystery: true,
            switchRomance: true,
            switchAll: true,
            catArr:['adventure','comedy','horror','fantasy','scifi','romance','mystery','other'],
            selectedCat: 'all',
        }
        
        console.log(this.props.navigation.getParam('search',""));
        this.switchNewst = this.switchNewst.bind(this);
        this.switchFavorite = this.switchFavorite.bind(this);
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
    switchFavorite = (e) =>{
        this.setState({
            switchFavorite: !this.state.switchFavorite,
            switchAll: true,
                switchAdv: true,
                switchComedy: true,
                switchHorror: true,
                switchFantasy: true,
                switchSciFi: true,
                switchOther: true,
                switchRomance:true,
                switchMystery:true,
                selectedCat: 'all',
                catArr:['adventure','comedy','horror','fantasy','scifi','romance','mystery','other']
        })
        
    }

    //TODO: Refactor code so that I don't need a seperate function for every switch
    switchAdv = (e) =>{
        if(this.state.catArr.includes("adventure")){
            let index = this.state.catArr.indexOf("adventure")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
                switchAdv:false
            })
        }
        else{
            this.state.catArr.push('adventure');
            console.log(this.state.catArr);
            this.setState({
                switchAdv:true
            })
        }
    }
    switchComedy = (e) =>{
        if(this.state.catArr.includes("comedy")){
            let index = this.state.catArr.indexOf("comedy")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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
    switchHorror = (e) =>{
        if(this.state.catArr.includes("horror")){
            let index = this.state.catArr.indexOf("horror")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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
    switchFantasy = (e) =>{
        if(this.state.catArr.includes("fantasy")){
            let index = this.state.catArr.indexOf("fantasy")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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
    switchSciFi = (e) =>{
        if(this.state.catArr.includes("scifi")){
            let index = this.state.catArr.indexOf("scifi")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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
    switchOther = (e) =>{
        if(this.state.catArr.includes("other")){
            let index = this.state.catArr.indexOf("other")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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

    switchRomance = (e) =>{

        if(this.state.catArr.includes("romance")){
            let index = this.state.catArr.indexOf("romance")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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

    switchMystery = (e) =>{

        if(this.state.catArr.includes("mystery")){
            let index = this.state.catArr.indexOf("mystery")
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.setState({
                switchAll:false,
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


    switchAll = (e) =>{
        if(!this.state.switchAll){
            this.setState({
                switchAll: true,
                switchAdv: true,
                switchComedy: true,
                switchHorror: true,
                switchFantasy: true,
                switchSciFi: true,
                switchOther: true,
                switchRomance:true,
                switchMystery:true,
                selectedCat: 'all',
                catArr:['adventure','comedy','horror','fantasy','scifi','romance','mystery','other']
            })
        }
        else{
            this.setState({
                switchAll: false,
                switchAdv: false,
                switchComedy: false,
                switchHorror: false,
                switchFantasy: false,
                switchSciFi: false,
                switchOther: false,
                switchRomance:false,
                switchMystery:false,
                selectedCat: 'none',
                catArr:[]
            })
        }
        
        console.log(this.state.catArr)
    }
    
    apply = (e) =>{
        //console.log(this.state.selectedCat);
        const dbh = firebase.firestore();
        let storiesRef = dbh.collection('stories')
        
        if(this.state.switchFavorite){
            this.setState({
                catArr:['adventure','comedy','horror','fantasy','scifi','romance','mystery','other']
            })

            let favArr =[];
            favArr = this.props.navigation.getParam('fav',"");
            if(favArr.length > 0)
                storiesRef = storiesRef.where("storyId", "in", favArr);

        }
        else if(this.state.selectedCat != "all"){
            storiesRef = storiesRef.where("category","array-contains-any", this.state.catArr);//.orderBy("createdAt", "desc")
        }
        
        if(this.state.switchNewst)
            storiesRef = storiesRef.orderBy("createdAt", "desc");
        else
            storiesRef = storiesRef.orderBy("createdAt", "asc");

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home', params: {
                filter: storiesRef,
                search: this.props.navigation.getParam('search',""),
                fetch: true,
                category: this.state.catArr,
                showFavorites: this.state.switchFavorite,
                showNewest: this.state.switchNewst
                } 
            } )],
        });
        this.props.navigation.dispatch(resetAction);
    

    }

    render(){
        return(
            <View style={{alignItems:'center'}}>
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

                <View style ={{flexDirection:'row'}}>
                    
                <Text style = {{ width:120}}>
                        Favorite
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFavorite}  
                        onValueChange ={(e)=>{this.switchFavorite(e)}}/>
                        
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
                    Show Fiction
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFantasy}  
                    onValueChange ={(e)=>{this.switchFantasy(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Non-Fiction
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFantasy}  
                    onValueChange ={(e)=>{this.switchFantasy(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Poetry
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
                     Show Romance
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchRomance}  
                    onValueChange ={(e)=>{this.switchRomance(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                     Show Mystery
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchMystery}  
                    onValueChange ={(e)=>{this.switchMystery(e)}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Other
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchOther}  
                    onValueChange ={(e)=>{this.switchOther(e)}}/>
                </View>

                <View style = {{marginTop:16, justifyContent:'center', alignItems:'center'}}>
                    <Button color = "darkorange" title = "apply!" onPress={() => {
                        this.apply()
                    }}/>
                </View>
                
            </View>
            
        );
    }
} 