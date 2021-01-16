package com.ryde.server.controllers;

import com.ryde.server.entities.Request;
import com.ryde.server.repositories.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request")
public class RequestController {

    @Autowired
    RequestRepository requestRepository;

    @GetMapping("/findByUser")
    public List<Request> getAllRequestsByUser(@RequestParam Long userId) {
        return requestRepository.findRequestByUserId(userId);
    }

    @GetMapping("/findByOffer")
    public List<Request> getAllRequestsByOffer(@RequestParam Long offerId) {
        return requestRepository.findRequestByOfferId(offerId);
    }

    @PostMapping
    public ResponseEntity<?> saveRequest(@RequestBody Request request) {
        Request result = requestRepository.save(request);

        return ResponseEntity.ok(result);
    }
}
