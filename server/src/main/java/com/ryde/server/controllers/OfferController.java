package com.ryde.server.controllers;

import com.ryde.server.entities.Offer;
import com.ryde.server.entities.User;
import com.ryde.server.repositories.OfferRepository;
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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offer")
public class OfferController {
    private static final String ERROR_KEY = "error";
    private static final String INCORRECT_ID_MSG = "The Offer userId does not match the authorized one.";

    @Autowired
    UserRepository userRepository;
    @Autowired
    OfferRepository offerRepository;

    @GetMapping("/all")
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @GetMapping
    public ResponseEntity<?> getUserOffer(Principal principal) {
        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());
        Optional<Offer> result = offerRepository.findOfferByUserId(userPrincipal.get().getId());

        return result.isPresent() ? ResponseEntity.ok(result.get()) : ResponseEntity.ok("");
    }

    @PostMapping
    public ResponseEntity<?> saveOffer(Principal principal, @RequestBody Offer offer) {
        // Check if Offer fields are valid
        Optional<String> errorJson = EntityValidator.validateEntity(offer);
        if(errorJson.isPresent())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorJson.get());

        // Check if Offer userId corresponds to the id of the user that is currently authenticated
        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());
        if (userPrincipal.get().getId() != offer.getUser().getId())
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, INCORRECT_ID_MSG)); // TODO: Add description

        Offer result;
        try {
            result = offerRepository.save(offer);
        } catch(DataIntegrityViolationException e) {
            PSQLException rootException = (PSQLException) e.getRootCause();
            String error = CustomPSQLExceptionJSON.buildCustomPSQLException(rootException);
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(error);
        }

        return ResponseEntity.ok(result.getId());
    }
}
