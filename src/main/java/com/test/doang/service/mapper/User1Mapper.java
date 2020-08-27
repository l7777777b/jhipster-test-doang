package com.test.doang.service.mapper;


import com.test.doang.domain.*;
import com.test.doang.service.dto.User1DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link User1} and its DTO {@link User1DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface User1Mapper extends EntityMapper<User1DTO, User1> {

    @Mapping(source = "referral.id", target = "referralId")
    User1DTO toDto(User1 user1);

    @Mapping(source = "referralId", target = "referral")
    User1 toEntity(User1DTO user1DTO);

    default User1 fromId(Long id) {
        if (id == null) {
            return null;
        }
        User1 user1 = new User1();
        user1.setId(id);
        return user1;
    }
}
