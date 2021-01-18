package com.ryde.server.controllers;

import com.ryde.server.entities.Message;
import com.ryde.server.entities.Offer;
import com.ryde.server.entities.Request;
import com.ryde.server.entities.User;
import com.ryde.server.repositories.MessageRepository;
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
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    private static final String ERROR_KEY = "error";
    private static final String UNAUTHORIZED_MSG = "The user is not part of this conversation.";
    private static final String DECLINE_UPDATE_MSG = "Messages cannot be updated and thus should be sent without id.";


    @Autowired
    UserRepository userRepository;
    @Autowired
    OfferRepository offerRepository;
    @Autowired
    RequestRepository requestRepository;
    @Autowired
    MessageRepository messageRepository;

    @GetMapping
    public ResponseEntity<?> getMessage(Principal principal, @RequestParam Long requestId) {
        boolean isUserInConversation = false;

        Optional<User> userPrincipal = userRepository.findUserByEmail(principal.getName());
        Optional<Request> request = requestRepository.findById(requestId);
        Optional<Offer> offer = offerRepository.findOfferByUserId(userPrincipal.get().getId());


        if(request.isPresent())
            if(userPrincipal.get().getId() == request.get().getUserId())
                isUserInConversation = true;

        if(offer.isPresent() && request.isPresent())
            if(offer.get().getId() == request.get().getOfferId())
                isUserInConversation = true;

        if(!isUserInConversation)
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, UNAUTHORIZED_MSG).toString());

        return ResponseEntity.ok(messageRepository.findMessageByRequestIdOrderByTimeSentAsc(requestId));
    }

    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody Message message) {
        Optional<String> errorJson = EntityValidator.validateEntity(message);
        if(errorJson.isPresent())
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(errorJson);

        if(message.getId() != null)
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(new JSONObject().put(ERROR_KEY, DECLINE_UPDATE_MSG).toString());

        message.setTimeSent(new Date(System.currentTimeMillis()));

        Message result;
        try {
            result = messageRepository.save(message);
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
