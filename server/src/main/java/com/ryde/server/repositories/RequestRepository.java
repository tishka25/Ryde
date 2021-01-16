package com.ryde.server.repositories;

import com.ryde.server.entities.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Long> {

    List<Request> findRequestByUserId(Long userId);

    List<Request> findRequestByOfferId(Long offerId);
}
