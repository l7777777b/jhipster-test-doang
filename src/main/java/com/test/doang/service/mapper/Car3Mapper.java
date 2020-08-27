package com.test.doang.service.mapper;


import com.test.doang.domain.*;
import com.test.doang.service.dto.Car3DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Car3} and its DTO {@link Car3DTO}.
 */
@Mapper(componentModel = "spring", uses = {Driver2Mapper.class})
public interface Car3Mapper extends EntityMapper<Car3DTO, Car3> {


    @Mapping(target = "removeDriver", ignore = true)

    default Car3 fromId(Long id) {
        if (id == null) {
            return null;
        }
        Car3 car3 = new Car3();
        car3.setId(id);
        return car3;
    }
}
