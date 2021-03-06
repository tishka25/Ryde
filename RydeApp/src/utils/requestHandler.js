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
        "getByOfferId": {
            method: "GET",
            url: "offer/getById",
            params: ["id"]
        },
        "getByUserId": {
            method: "GET",
            url: "offer",
            params: ["userId"]
        },
        "create": {
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
    },
    "request": {
        "getByOffer": {
            method: "GET",
            url: "request/findByOffer"
        },
        "getByUser": {
            method: "GET",
            url: "request/findByUser"
        },
        "create": {
            method: "POST",
            url: "request"
        }
    }
}


const requestHandler = async (endPoint, type, data, onReject) => {
    if (![
        "city",
        "message",
        "user",
        "offer",
        "request"
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
        
        if(Object.keys(userHandler.getCredentials()).length === 0){
            await userHandler.init();
        }
        
        const credentials = userHandler.getCredentials();
        const basicAuthToken = btoa(`${credentials.email}:${credentials.password}`);

        const body = (() => {
            if (apiType.method == "POST") {
                try {
                    const dataStr = JSON.stringify(data);
                    return dataStr
                } catch (error) {
                    console.error(error);
                    return "";
                }
            }
        })();

        console.log("Body is :", body);

        const response = await fetch(_url, {
            method: apiType.method,
            headers: {
                //TODO: Generate from user
                // "Authorization": "Basic YW5uYS5zbWl0aEBnbWFpbC5jb206cGFzc3dvcmQxMjM="
                "Authorization": "Basic " + basicAuthToken,
                'Content-Type': 'application/json'
            },
            body
        });

        console.log("Response Status:", response.status);
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
        }else{
            throw new Error(`Unhandled rejection ${response.status} ${JSON.stringify(await response.json())}`);
        }
    } catch (e) {
        console.error("Could not find API type:", e);
        return null;
    }
}

export default requestHandler;