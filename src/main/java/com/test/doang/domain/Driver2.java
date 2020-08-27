package com.test.doang.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Driver2.
 */
@Entity
@Table(name = "driver_2")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Driver2 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "drivers")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Car3> cars = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Car3> getCars() {
        return cars;
    }

    public Driver2 cars(Set<Car3> car3s) {
        this.cars = car3s;
        return this;
    }

    public Driver2 addCar(Car3 car3) {
        this.cars.add(car3);
        car3.getDrivers().add(this);
        return this;
    }

    public Driver2 removeCar(Car3 car3) {
        this.cars.remove(car3);
        car3.getDrivers().remove(this);
        return this;
    }

    public void setCars(Set<Car3> car3s) {
        this.cars = car3s;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Driver2)) {
            return false;
        }
        return id != null && id.equals(((Driver2) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Driver2{" +
            "id=" + getId() +
            "}";
    }
}
