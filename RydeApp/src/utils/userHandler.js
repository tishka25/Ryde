import AsyncStorage from '@react-native-community/async-storage';


class UserHandler {
    constructor() {
        this.loginData = {};
        this.user = {};
        this.init = this.init.bind(this);
        this.getCredentials = this.getCredentials.bind(this);
        this.setCredentials = this.setCredentials.bind(this);
    }


    async init() {
        try {
            const data = await AsyncStorage.getItem("login");
            this.loginData = Object.assign({}, JSON.parse(data));
            const userData = await AsyncStorage.getItem("user");
            this.user = Object.assign({}, JSON.parse(userData));
            console.log("Loaded user data");
        } catch (error) {
            console.error(err);   
        }
    }

    async getUser(){
        return Object.assign({}, this.user);
    }

    async setUser(user){
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            this.user = Object.assign({}, user);
        } catch (err) {
            console.log(err);
        }
    }

    getCredentials() {
        return Object.assign({}, this.loginData);
    }

    async setCredentials(loginData) {
        try {
            console.log("Saving:", loginData);
            await AsyncStorage.setItem('login', JSON.stringify(loginData));
            this.loginData = Object.assign({}, loginData);
        } catch (err) {
            console.error(err);
        }
    }
}

export default new UserHandler();