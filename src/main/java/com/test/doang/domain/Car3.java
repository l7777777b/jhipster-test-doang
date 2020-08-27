package com.test.doang.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Car3.
 */
@Entity
@Table(name = "car_3")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Car3 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "car_3_driver",
               joinColumns = @JoinColumn(name = "car3_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "driver_id", referencedColumnName = "id"))
    private Set<Driver2> drivers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Driver2> getDrivers() {
        return drivers;
    }

    public Car3 drivers(Set<Driver2> driver2s) {
        this.drivers = driver2s;
        return this;
    }

    public Car3 addDriver(Driver2 driver2) {
        this.drivers.add(driver2);
        driver2.getCars().add(this);
        return this;
    }

    public Car3 removeDriver(Driver2 driver2) {
        this.drivers.remove(driver2);
        driver2.getCars().remove(this);
        return this;
    }

    public void setDrivers(Set<Driver2> driver2s) {
        this.drivers = driver2s;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car3)) {
            return false;
        }
        return id != null && id.equals(((Car3) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car3{" +
            "id=" + getId() +
            "}";
    }
}
