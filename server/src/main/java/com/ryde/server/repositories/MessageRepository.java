package com.ryde.server.repositories;

import com.ryde.server.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findMessageByRequestIdOrderByTimeSentAsc(Long requestId);
}
