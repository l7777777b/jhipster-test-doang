package com.test.doang.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A DTO for the {@link com.test.doang.domain.Car3} entity.
 */
public class Car3DTO implements Serializable {
    
    private Long id;

    private Set<Driver2DTO> drivers = new HashSet<>();
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Driver2DTO> getDrivers() {
        return drivers;
    }

    public void setDrivers(Set<Driver2DTO> driver2s) {
        this.drivers = driver2s;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Car3DTO)) {
            return false;
        }

        return id != null && id.equals(((Car3DTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Car3DTO{" +
            "id=" + getId() +
            ", drivers='" + getDrivers() + "'" +
            "}";
    }
}
