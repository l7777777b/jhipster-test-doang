package com.test.doang.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class Car3MapperTest {

    private Car3Mapper car3Mapper;

    @BeforeEach
    public void setUp() {
        car3Mapper = new Car3MapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(car3Mapper.fromId(id).getId()).isEqualTo(id);
        assertThat(car3Mapper.fromId(null)).isNull();
    }
}
