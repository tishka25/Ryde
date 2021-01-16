package com.ryde.server.repositories;

import com.ryde.server.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Long> {

    public Optional<City> findByName(String name);
}
