package com.test.doang.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.doang.web.rest.TestUtil;

public class Car3DTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(Car3DTO.class);
        Car3DTO car3DTO1 = new Car3DTO();
        car3DTO1.setId(1L);
        Car3DTO car3DTO2 = new Car3DTO();
        assertThat(car3DTO1).isNotEqualTo(car3DTO2);
        car3DTO2.setId(car3DTO1.getId());
        assertThat(car3DTO1).isEqualTo(car3DTO2);
        car3DTO2.setId(2L);
        assertThat(car3DTO1).isNotEqualTo(car3DTO2);
        car3DTO1.setId(null);
        assertThat(car3DTO1).isNotEqualTo(car3DTO2);
    }
}
