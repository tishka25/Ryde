package com.ryde.server.entities;

import javax.persistence.*;

@Entity
@Table(name = "request", uniqueConstraints={@UniqueConstraint(columnNames={"offer_id", "user_id"})})
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "luggage")
    private Integer luggage;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "offer_id")
    private Long offerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getLuggage() {
        return luggage;
    }

    public void setLuggage(Integer luggage) {
        this.luggage = luggage;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getOfferId() {
        return offerId;
    }

    public void setOfferId(Long offerId) {
        this.offerId = offerId;
    }
}
