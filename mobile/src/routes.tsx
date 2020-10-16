import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './pages/Login';
import Register from './pages/Register';
import OnBoarding1 from './pages/OnBoarding/board1';
import OnBoarding2 from './pages/OnBoarding/board2';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import UpdatePerfil from './pages/UpdatePerfil';
import InviteFriends from './pages/InviteFriends';
import HistoryReceivers from './pages/HistoryReceivers';
import HistoryDonation from './pages/HistoryDonation';
import Ranking from './pages/Ranking';
import DescriptionNeed from './pages/DescriptionNeed';
import ConfirmDonation from './pages/ConfirmDonation';

import DrawerContent from './components/Drawer';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const DrawerNavigation = () => {
    return (
            <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Perfil" component={Perfil} />
                <Drawer.Screen name="InviteFriends" component={InviteFriends} />
            </Drawer.Navigator>
    )
}

const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName="Login" screenOptions={{
                cardStyle: {
                    backgroundColor: "#fff",
                },
            }}
            >
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="OnBoarding1" component={OnBoarding1} />
                <AppStack.Screen name="OnBoarding2" component={OnBoarding2} />
                <AppStack.Screen name="Home" component={DrawerNavigation} />
                <AppStack.Screen name="UpdatePerfil" component={UpdatePerfil} />
                <AppStack.Screen name="HistoryReceivers" component={HistoryReceivers} />
                <AppStack.Screen name="HistoryDonation" component={HistoryDonation} />
                <AppStack.Screen name="Ranking" component={Ranking} />
                <AppStack.Screen name="DescriptionNeed" component={DescriptionNeed} />
                <AppStack.Screen name="ConfirmDonation" component={ConfirmDonation} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;