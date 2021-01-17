const rootEndPoint = "http://95.87.221.239:8000/api/";

const requestMap = {
    "city": {
        "getAll": "",
    },
    "user": {
        "getAll": ""
    },
    "offer": {
        "getAll": {
            method: "GET",
            urL: "offer/all"
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
        "getAllByRequestId": {
            method: "GET",
            url: "message",
            params: ["requestId"]
        }
    }
}


const requestHandler = async (endPoint, type, data) => {
    if (![
        "city",
        "message",
        "user",
        "offer"
    ].includes(endPoint)) {
        console.error("End point ", endPoint, "is not found");
        return null;
    }
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

    const response = await fetch(_url, {
        method: apiType.method,
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
    const json = await response.json();
    console.info("Response: ", json);
    return json;
}

export default requestHandler;