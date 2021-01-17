package com.ryde.server.entities;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Entity
@Table(name = "request", uniqueConstraints={@UniqueConstraint(columnNames={"offer_id", "user_id"})})
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(0)
    @Max(3)
    @NotNull
    @Column(name = "luggage")
    private Integer luggage;

    @Min(1)
    @Max(7)
    @NotNull
    @Column(name = "capacity")
    private Integer capacity;

    @Positive
    @NotNull
    @Column(name = "user_id")
    private Long userId;

    @Positive
    @NotNull
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
