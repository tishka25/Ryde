import { navigate } from "./rootNavigation";
import Toast from 'react-native-simple-toast';
import userHandler from "./userHandler";


const rootEndPoint = "http://95.87.221.239:8000/api/";

const requestMap = {
    "city": {
        "getByName": {
            method: "GET",
            url: "city",
            params: ["name"]
        },
    },
    "user": {
        "get": {
            method: "GET",
            url: "user",
        },
        "getByUserId": {
            method: "GET",
            url: "user",
            params: ["userId"]
        },
        "login": {
            method: "POST",
            url: "user/login",
        },
        "register": {
            method: "POST",
            url: "user/register"
        }
    },
    "offer": {
        "getAll": {
            method: "GET",
            url: "offer/all"
        },
        "getByUserId": {
            method: "GET",
            url: "offer",
            params: ["userId"]
        },
        "createOffer": {
            method: "POST",
            url: "offer",
        }
    },
    "message": {
        "getByRequestId": {
            method: "GET",
            url: "message",
            params: ["requestId"]
        },
        "create": {
            method: "POST",
            url: "message"
        }
    }
}


const requestHandler = async (endPoint, type, data, onReject) => {
    if (![
        "city",
        "message",
        "user",
        "offer"
    ].includes(endPoint)) {
        console.error("End point ", endPoint, "is not found");
        return null;
    }
    try {
        const apiType = requestMap[endPoint][type];
        const extractUrlParams = () => {
            if (apiType.params && Array.isArray(data)) {
                let _params = "";
                apiType.params.forEach((param, i) => {
                    if (i == 0)
                        _params += `?${param}=${data[i]}`
                    else
                        _params += `&${param}=${data[i]}`

                });
                return _params;
            }
            return ""
        }
        const _url = `${rootEndPoint}${apiType.url}${extractUrlParams()}`;
        console.log("URL:", _url);
        

        const basicAuthToken = btoa(`${userHandler.getCredentials().email}:${userHandler.getCredentials().password}`);

        console.log("Token:", basicAuthToken);

        const response = await fetch(_url, {
            method: apiType.method,
            headers: {
                //TODO: Generate from user
                // "Authorization": "Basic YW5uYS5zbWl0aEBnbWFpbC5jb206cGFzc3dvcmQxMjM="
                "Authorization": "Basic " + basicAuthToken
            },
            body: (() => {
                if (apiType.method == "POST") {
                    try {
                        return JSON.stringify(data);
                    } catch (error) {
                        console.error(error);
                        return "";
                    }
                }
            })()
        });
        //Unauthorized
        if (response.status == 401) {
            if(onReject){
                onReject(response);
            }else{
                Toast.show("Not registered or logged in!");
                navigate("Login");
            }
            return null;
        } else if (response.status == 200) {
            const json = await response.json();
            console.info("Response: ", json);
            return json;
        }else
            throw new Error("Unhandled rejection");
    } catch (e) {
        console.error("Could not find API type:", e);
        return null;
    }
}

export default requestHandler;