import React from 'react';
import {View,Text,Button} from 'react-native';
//import DetailScreen from './DetailScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import HomeScreen from './HomeScreen';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
//import { makeStyles } from '@material-ui/core/styles';
/*import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
*/
/*
const AppNavigator = createStackNavigator({
    Detail:{
        screen: DetailScreen,
        navigationOptions: {
          title: 'Go Back',
        }
    }
});


const AppContainer = createAppContainer(AppNavigator);*/

function Box({title, author, body, summary, nav, time}){
    //console.log("nav \n" + nav);
    let auth = "by "+ author + ":   " + time;
    return(
    <View style={{flex: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
        
        <Card style = {{flex: 1}}>
            <CardTitle  style={{flex:4}}
                title={title}
                subtitle={auth}
            />
            <CardContent style={{flex:8,overflow:'hidden', marginTop:16}} text = {summary}/>
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {console.log("pressed");
                    nav.navigation.navigate('Detail', {
                        body: body,
                        author: auth,
                        title: title,
                    });
                      }}
                title="Read"
                color="blue"
                /> 
                <CardButton
                onPress={() => {}}
                title="Favorite"
                color="blue"
                />
                <CardButton
                onPress={() => {}}
                title="Download"
                color="blue"
                />

            </CardAction>
        </Card>
        
    </View>
    );
}

export default Box;