package com.ryde.server.entities;

import javax.persistence.*;
import java.beans.ConstructorProperties;
import java.util.Date;

@Entity
@Table(name = "offer", uniqueConstraints={@UniqueConstraint(columnNames={"user_id"})})
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "start_id")
    private City startCity;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private City destinationCity;

    @Column(name = "price")
    private Integer price;

    @Column(name = "date")
    private Date date;

    @Column(name = "luggage")
    private Integer luggage;

    @Column(name = "capacity")
    private Integer capacity;

    @Column(name = "user_id")
    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public City getStartCity() {
        return startCity;
    }

    public void setStartCity(City startCity) {
        this.startCity = startCity;
    }

    public City getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(City destinationCity) {
        this.destinationCity = destinationCity;
    }

//    public Long getStartId() {
//        return startId;
//    }
//
//    public void setStartId(Long startId) {
//        this.startId = startId;
//    }
//
//    public Long getDestinationId() {
//        return destinationId;
//    }
//
//    public void setDestinationId(Long destinationId) {
//        this.destinationId = destinationId;
//    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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
}
