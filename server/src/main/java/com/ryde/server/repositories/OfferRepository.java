package com.ryde.server.repositories;

import com.ryde.server.entities.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    Optional<Offer> findOfferByUserId(Long userId);
}
