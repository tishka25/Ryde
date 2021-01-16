package com.ryde.server.controllers;

import com.ryde.server.entities.Message;
import com.ryde.server.repositories.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping
    public List<Message> getMessage(@RequestParam Long requestId) {

        return messageRepository.findMessageByRequestIdOrderByTimeSentAsc(requestId);
    }

    @PostMapping
    public ResponseEntity<?> saveMessage(@RequestBody Message message) {
        message.setTimeSent(new Date(System.currentTimeMillis()));

        Message result = messageRepository.save(message);

        return ResponseEntity.ok(result.getId());
    }
}
