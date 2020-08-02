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
            switchFiction: true,
            switchNonFiction: true,
            switchPoetry: true,
            switchSciFi: true,
            switchOther: true,
            switchMystery: true,
            switchRomance: true,
            switchAll: true,
            catArr:['adventure','comedy','horror','fantasy','ficition','nonfiction','poetry','scifi','romance','mystery','other'],
            selectedCat: 'all',
        }
        
        console.log(this.props.navigation.getParam('search',""));
        this.switchNewst = this.switchNewst.bind(this);
        this.switchFavorite = this.switchFavorite.bind(this);
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
            switchFiction: true,
            switchNonFiction: true,
            switchPoetry: true,
            switchSciFi: true,
            switchOther: true,
            switchMystery: true,
            switchRomance: true,
            catArr:['adventure','comedy','horror','fantasy','ficition','nonfiction','poetry','scifi','romance','mystery','other'],
        })
        
    }

    whenCategoryIncluded = (e) => {
        switch (e){
                case 'adventure':
                    this.setState({
                        switchAll:false,
                        switchAdv:false
                    });
                    break;
                case 'comedy':
                    this.setState({
                        switchAll:false,
                        switchComedy:false
                    });
                    break;
                case 'horror':
                    this.setState({
                        switchAll:false,
                        switchHorror:false
                    });
                    break;
                case 'fantasy':
                    this.setState({
                        switchAll:false,
                        switchFantasy:false
                    });
                    break;
                case 'fiction':
                    this.setState({
                        switchAll:false,
                        switchFiction:false
                    });
                    break;
                case 'nonfiction':
                    this.setState({
                        switchAll:false,
                        switchNonFiction:false
                    });
                    break;
                case 'poetry':
                    this.setState({
                        switchAll:false,
                        switchPoetry:false
                    });
                    break;
                case 'scifi':
                    this.setState({
                        switchAll:false,
                        switchSciFi:false
                    });
                    break;
                case 'romance':
                    this.setState({
                        switchAll:false,
                        switchRomance:false
                    });
                    break;
                case 'mystery':
                    this.setState({
                        switchAll:false,
                        switchMystery:false
                    });
                    break;
                case 'other':
                    this.setState({
                        switchAll:false,
                        switchOther:false
                    });
                    break;
                default:
                    break;
    }
}

    whenCategoryNotIncluded = (e) => {
        switch (e){
                case 'adventure':
                    this.setState({
                        switchAdv:true
                    })
                    break;
                case 'comedy':
                    this.setState({
                        switchComedy:true
                    })
                    break;
                case 'horror':
                    this.setState({
                        switchHorror:true
                    })
                    break;
                case 'fantasy':
                    this.setState({
                        switchFantasy:true
                    })
                    break;
                case 'fiction':
                    this.setState({
                        switchFiction:true
                    })
                    break;
                case 'nonfiction':
                    this.setState({
                        switchNonFiction:true
                    })
                    break;
                case 'poetry':
                    this.setState({
                        switchPoetry:true
                    })
                    break;
                case 'scifi':
                    this.setState({
                        switchSciFi:true
                    })
                    break;
                case 'romance':
                    this.setState({
                        switchRomance:true
                    })
                    break;
                case 'mystery':
                    this.setState({
                        switchMystery:true
                    })
                    break;
                case 'other':
                    this.setState({
                        switchOther:true
                    })
                    break;
                default:
                    break;
    }
    }

    //TODO: Refactor code so that I don't need a seperate function for every switch
    updateArray = (e) =>{
        if(this.state.catArr.includes(e)){
            let index = this.state.catArr.indexOf(e)
            this.state.catArr.splice(index,1)
            console.log(this.state.catArr);
            this.whenCategoryIncluded(e)
        }
        else{
            this.state.catArr.push(e);
            console.log(this.state.catArr);
            this.whenCategoryNotIncluded(e)
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
                switchFiction: true,
                switchNonFiction: true,
                switchPoetry: true,
                switchSciFi: true,
                switchOther: true,
                switchRomance:true,
                switchMystery:true,
                selectedCat: 'all',
                catArr:['adventure','comedy','horror','fantasy','ficition','nonfiction','poetry','scifi','romance','mystery','other'],
            })
        }
        else{
            this.setState({
                switchAll: false,
                switchAdv: false,
                switchComedy: false,
                switchHorror: false,
                switchFantasy: false,
                switchFiction: false,
                switchNonFiction: false,
                switchPoetry: false,
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
                catArr:['adventure','comedy','horror','fantasy','ficition','nonfiction','poetry','scifi','romance','mystery','other'],
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
                    onValueChange ={(e)=>{this.updateArray('adventure')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Comedy
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchComedy}  
                    onValueChange ={(e)=>{this.updateArray('comedy')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Horror
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchHorror}  
                    onValueChange ={(e)=>{this.updateArray('horror')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Fantasy
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFantasy}  
                    onValueChange ={(e)=>{this.updateArray('fantasy')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Fiction
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchFiction}  
                    onValueChange ={(e)=>{this.updateArray('fiction')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Non-Fiction
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchNonFiction}  
                    onValueChange ={(e)=>{this.updateArray('nonfiction')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Poetry
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchPoetry}  
                    onValueChange ={(e)=>{this.updateArray('poetry')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                     Show Sci-Fi
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchSciFi}  
                    onValueChange ={(e)=>{this.updateArray('scifi')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                     Show Romance
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchRomance}  
                    onValueChange ={(e)=>{this.updateArray('romance')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                     Show Mystery
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchMystery}  
                    onValueChange ={(e)=>{this.updateArray('mystery')}}/>
                </View>
                <View style ={{flexDirection:'row'}}>
                    <Text style = {{width:120}}>
                    Show Other
                    </Text>
                    <Switch style={{marginLeft:16}} value={this.state.switchOther}  
                    onValueChange ={(e)=>{this.updateArray('other')}}/>
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