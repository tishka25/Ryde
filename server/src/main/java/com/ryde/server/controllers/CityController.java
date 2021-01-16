package com.ryde.server.controllers;

import com.ryde.server.entities.City;
import com.ryde.server.repositories.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/city")
public class CityController {

    public final String NOT_FOUND = "{\"error\":\"The city was not found\"}";

    @Autowired
    CityRepository cityRepository;

    @GetMapping
    public ResponseEntity<?> getCityByName(@RequestParam String name) {
        Optional<City> city = cityRepository.findByName(name);

        return city.isPresent() ? ResponseEntity.ok(city.get()) : ResponseEntity.ok(NOT_FOUND);
    }
}
