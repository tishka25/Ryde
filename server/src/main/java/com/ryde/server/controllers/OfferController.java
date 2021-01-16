package com.ryde.server.controllers;


import com.ryde.server.entities.Offer;
import com.ryde.server.repositories.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offer")
public class OfferController {

    public final String NOT_FOUND = "{\"error\":\"The offer was not found\"}";

    @Autowired
    OfferRepository offerRepository;

    @GetMapping("/all")
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    @GetMapping
    public ResponseEntity<?> getUserOffer(@RequestParam Long userId) {
        Optional<Offer> result = offerRepository.findOfferByUserId(userId);

        return result.isPresent() ? ResponseEntity.ok(result.get()) : ResponseEntity.ok(NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> saveOffer(@RequestBody Offer offer) {
        offer = offerRepository.save(offer);

        return ResponseEntity.ok(offer.getId());
    }
}
