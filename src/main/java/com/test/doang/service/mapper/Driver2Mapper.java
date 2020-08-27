package com.test.doang.service.mapper;


import com.test.doang.domain.*;
import com.test.doang.service.dto.Driver2DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Driver2} and its DTO {@link Driver2DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface Driver2Mapper extends EntityMapper<Driver2DTO, Driver2> {


    @Mapping(target = "cars", ignore = true)
    @Mapping(target = "removeCar", ignore = true)
    Driver2 toEntity(Driver2DTO driver2DTO);

    default Driver2 fromId(Long id) {
        if (id == null) {
            return null;
        }
        Driver2 driver2 = new Driver2();
        driver2.setId(id);
        return driver2;
    }
}
