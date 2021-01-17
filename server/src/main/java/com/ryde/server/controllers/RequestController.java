package com.ryde.server.controllers;

import com.ryde.server.entities.Offer;
import com.ryde.server.entities.Request;
import com.ryde.server.entities.User;
import com.ryde.server.repositories.OfferRepository;
import com.ryde.server.repositories.RequestRepository;
import com.ryde.server.repositories.UserRepository;
import com.ryde.server.utility.CustomPSQLExceptionJSON;
import com.ryde.server.utility.EntityValidator;
import org.json.JSONObject;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    private static final String ERROR_KEY = "error";
    private static final String INCORRECT_ID_MSG = "The Request userId does not match the authorized one.";

    @Autowired
    UserRepository userRepository;
    @Autowired
    OfferRepository offerRepository;
    @Autowired
    RequestRepository requestRepository;

    @GetMapping("/findByUser")
    public List<Request> getAllRequestsByUser(Principal principal) {
        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());

        return requestRepository.findRequestByUserId(userPrincipal.get().getId());
    }

    @GetMapping("/findByOffer")
    public List<Request> getAllRequestsByOffer(Principal principal) {
        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());
        Optional<Offer> offerResult = offerRepository.findOfferByUserId(userPrincipal.get().getId());

        if (offerResult.isEmpty())
            return Collections.emptyList();

        return requestRepository.findRequestByOfferId(offerResult.get().getId());
    }

    @PostMapping
    public ResponseEntity<?> saveRequest(Principal principal, @RequestBody Request request) {
        Optional<String> errorString = EntityValidator.validateEntity(request);
        if(errorString.isPresent())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorString.get());

        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());

        if (userPrincipal.get().getId() != request.getUserId())
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, INCORRECT_ID_MSG).toString());

        Request result;
        try {
            result = requestRepository.save(request);
        } catch(DataIntegrityViolationException e) {
            PSQLException rootException = (PSQLException) e.getRootCause();
            String error = CustomPSQLExceptionJSON.buildCustomPSQLException(rootException);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }
        return ResponseEntity.ok(result);
    }
}
