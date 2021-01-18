package com.ryde.server.utility;

import org.json.JSONObject;
import org.postgresql.util.PSQLException;

public class CustomPSQLExceptionJSON {

    public static String buildCustomPSQLException(PSQLException e) {
        JSONObject psqlExceptionJson = new JSONObject();
        psqlExceptionJson.put("message", e.getServerErrorMessage().getMessage());
        psqlExceptionJson.put("detail", e.getServerErrorMessage().getDetail());

        return psqlExceptionJson.toString();
    }
}
