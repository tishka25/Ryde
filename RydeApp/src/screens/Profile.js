
import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import { navigate } from "../utils/rootNavigation";
import userHandler from "../utils/userHandler";
import Icon from "react-native-vector-icons/FontAwesome";



const Profile = (props) => {

    const [value, setValue] = React.useState(0);
    // const [user, setUser] = React.useState({});
    const { user } = props;


    React.useEffect(() => {
        // loadUser();
    }, [value]);



    async function handleLogout() {
        console.log("LOGOUT ");
        await userHandler.delete();
        // setUser({});
        Object.keys(user).forEach(k => delete user[k])
        setValue(1);
        navigate("Login");
    }


    function render() {
        if (Object.keys(user) == 0 && user) {
            return (
                <View style={[styles.rowContainer, { flexDirection: "column", marginTop: 32, justifyContent: "center", alignSelf: "center" }]}>
                    <Text style={{ fontSize: 24 }}>
                        Not logged in
                    </Text>
                    <View style={{ width: "95%", marginTop: 124, alignSelf: "center" }}>
                        <Button title="Login" onPress={() => navigate("Login")} color="#987bf3" />
                    </View>
                </View>
            )
        } else
            return (
                <ScrollView>
                    <View style={[styles.rowContainer, { marginTop: 32 }]}>
                        <Image source={{ uri: user.picture }} style={styles.profileImage} />
                        <View style={styles.infoContainer}>
                            <Text style={{ fontSize: 18 }}>
                                {user.firstName} {user.lastName}
                            </Text>
                            <View style={[styles.rowContainer, { marginHorizontal: 0 }]}>
                                {(() => {
                                    let a = [];
                                    for (let i = 0; i < user.rating; i++) {
                                        a.push(
                                            <Image
                                                key={i}
                                                style={styles.tinyIcon}
                                                source={require("../assets/star.png")}
                                            />
                                        )
                                    }
                                    return a;
                                })()}
                            </View>
                        </View>

                    </View>

                    <View style={[styles.rowContainer, { marginTop: 64 }]}>
                        <Icon name="at" size={24} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Email</Text>
                            <Text style={styles.infoContent}>{user.email}</Text>
                        </View>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <Icon name="phone" size={24} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Phone Number</Text>
                            <Text style={styles.infoContent}>{user.phoneNumber}</Text>
                        </View>
                    </View>

                    <View style={{ width: "95%", marginTop: 16, alignSelf: "center" }}>
                        <Button title="Logout" onPress={() => handleLogout()} color="#987bf3" />
                    </View>


                </ScrollView>
            )
    }


    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                {render()}
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        marginHorizontal: 18
    },
    infoContainer: {
        flexDirection: "column",
        marginLeft: 32
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infoContent: {
        fontSize: 18,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
    tinyIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 2
    },
});

export default Profile;