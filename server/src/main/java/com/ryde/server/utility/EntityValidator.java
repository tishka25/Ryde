package com.ryde.server.utility;

import com.ryde.server.entities.User;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Optional;
import java.util.Set;

public class EntityValidator {

    public static <T> Optional<String> validateEntity(T entity) {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set<ConstraintViolation<T>> violations = validator.validate(entity);

        if (!violations.isEmpty()) {
            JSONObject errorJson = new JSONObject();
            JSONArray violationArr = new JSONArray();
            for (ConstraintViolation<T> violation : violations) {
                JSONObject violationJson = new JSONObject();
                violationJson.put("field", violation.getPropertyPath().toString());
                violationJson.put("violation", violation.getMessage());

                violationArr.put(violationJson);
            }
            errorJson.put("error", violationArr);

            return Optional.of(errorJson.toString());
        }

        return Optional.empty();
    }
}
