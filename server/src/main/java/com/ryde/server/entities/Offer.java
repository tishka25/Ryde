package com.ryde.server.entities;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

@Entity
@Table(name = "offer", uniqueConstraints={@UniqueConstraint(columnNames={"user_id"})})
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "start_id")
    private City startCity;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "destination_id")
    private City destinationCity;

    @Positive
    @NotNull
    @Column(name = "price")
    private Integer price;

    @Future
    @NotNull
    @Column(name = "date")
    private Date date;

    @Min(0)
    @Max(3)
    @NotNull
    @Column(name = "luggage")
    private Integer luggage;

    @Min(0)
    @Max(7)
    @NotNull
    @Column(name = "capacity")
    private Integer capacity;

    @NotNull
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
