import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AsyncStorage from '@react-native-community/async-storage'

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
import AnnotatedDonation from './pages/AnnotatedDonation';
import DonationProgress from './pages/DonationProgress';

import DrawerContent from './components/Drawer';

const Drawer = createDrawerNavigator();
const AppStack = createStackNavigator();

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
        </Drawer.Navigator>
    )
}


const UserAuthRoutes = () => {

    return (
        <AppStack.Navigator headerMode="none" initialRouteName="Home" screenOptions={{
            cardStyle: {
                backgroundColor: "#fff",
            },
        }}
        >
            <AppStack.Screen name="InviteFriends" component={InviteFriends} />
            <AppStack.Screen name="Perfil" component={Perfil} />
            <AppStack.Screen name="Home" component={DrawerNavigation} />
            <AppStack.Screen name="OnBoarding1" component={OnBoarding1} />
            <AppStack.Screen name="OnBoarding2" component={OnBoarding2} />
            <AppStack.Screen name="UpdatePerfil" component={UpdatePerfil} />
            <AppStack.Screen name="HistoryReceivers" component={HistoryReceivers} />
            <AppStack.Screen name="HistoryDonation" component={HistoryDonation} />
            <AppStack.Screen name="Ranking" component={Ranking} />
            <AppStack.Screen name="DescriptionNeed" component={DescriptionNeed} />
            <AppStack.Screen name="ConfirmDonation" component={ConfirmDonation} />
            <AppStack.Screen name="AnnotatedDonation" component={AnnotatedDonation} />
            <AppStack.Screen name="DonationProgress" component={DonationProgress} />
            <AppStack.Screen name="UserNotAuth" component={UserNotAuthRoutes} />
            {/* <AppStack.Screen name="Register" component={Register} /> */}
        </AppStack.Navigator>
    );
};

const UserNotAuthRoutes = () => {
    return (
        <AppStack.Navigator headerMode="none" initialRouteName="Login" screenOptions={{
            cardStyle: {
                backgroundColor: "#fff",
            },
        }}
        >
            <AppStack.Screen name="Login" component={Login} />
            <AppStack.Screen name="Register" component={Register} />
            <AppStack.Screen name="UserAuth" component={UserAuthRoutes} />
        </AppStack.Navigator>
    )
};

const UserAuth = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName="Home" screenOptions={{
                cardStyle: {
                    backgroundColor: "#fff",
                },
            }}
            >
                <AppStack.Screen name="Home" component={UserAuthRoutes} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
};

const UserNotAuth = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none" initialRouteName="Login" screenOptions={{
                cardStyle: {
                    backgroundColor: "#fff",
                },
            }}
            >
                <AppStack.Screen name="Login" component={UserNotAuthRoutes} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
};

const Routes = () => {
    const [token, setToken] = useState<string | null>("");

    useEffect(() => {
        async function Authentication() {
            const getId = await AsyncStorage.getItem("isLoggedId");

            setToken(getId);
            console.log(getId)
        }

        Authentication();
    }, [token])

    return (
        <>
            {token !== null ? (
                <UserAuth />
            ) : (
                    <UserNotAuth />
                )
            }
        </>
    )
}

export default Routes;