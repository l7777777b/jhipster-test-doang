package com.test.doang.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class Driver2MapperTest {

    private Driver2Mapper driver2Mapper;

    @BeforeEach
    public void setUp() {
        driver2Mapper = new Driver2MapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(driver2Mapper.fromId(id).getId()).isEqualTo(id);
        assertThat(driver2Mapper.fromId(null)).isNull();
    }
}
