import React from 'react';
import {View,Text,Button} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
//import { makeStyles } from '@material-ui/core/styles';
/*import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
*/

function Box({value, nav}){
    console.log("nav \n" + nav);
    let auth = "by "+ value + ":";
    return(
    <View style={{flex: 10, flexDirection: 'column', justifyContent: 'flex-start'}}>
        
        <Card style = {{flex: 1}}>
            <CardTitle  style={{flex:4}}
                title="Short story 1" 
                subtitle={auth}
            />
            <CardContent style={{flex:8,overflow:'hidden', marginTop:16}} text = "This is only 5 words. This is only 5 words. This is only 5 words. This is only 5 words. This is only 5 words. This is only 5 words. This is only 5 words. This is only 5 words. "/>
            <CardAction 
                separator={true} 
                inColumn={false}>
                <CardButton
                    onPress={() => {
                        nav.navigation.navigate('Detail');
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