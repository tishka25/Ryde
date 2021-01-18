import AsyncStorage from '@react-native-community/async-storage';


class UserHandler {
    constructor() {
        this.loginData = {};
        this.user = {};
        this.init = this.init.bind(this);
        this.getCredentials = this.getCredentials.bind(this);
        this.setCredentials = this.setCredentials.bind(this);
        this.delete = this.delete.bind(this);
    }


    async init() {
        try {
            const data = await AsyncStorage.getItem("login");
            this.loginData = Object.assign({}, JSON.parse(data));

            const userData = await AsyncStorage.getItem("user");
            this.user = Object.assign({}, JSON.parse(userData));

            console.log("Loaded user data", this.user);
        } catch (error) {
            console.error(err);   
        }
    }

    getUser(){
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

    async delete(){
        await this.setCredentials({});
        await this.setUser({});
    }
}

export default new UserHandler();