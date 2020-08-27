package com.test.doang.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link com.test.doang.domain.Driver2} entity.
 */
public class Driver2DTO implements Serializable {
    
    private Long id;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Driver2DTO)) {
            return false;
        }

        return id != null && id.equals(((Driver2DTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Driver2DTO{" +
            "id=" + getId() +
            "}";
    }
}
