package com.test.doang.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.doang.web.rest.TestUtil;

public class Driver2DTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(Driver2DTO.class);
        Driver2DTO driver2DTO1 = new Driver2DTO();
        driver2DTO1.setId(1L);
        Driver2DTO driver2DTO2 = new Driver2DTO();
        assertThat(driver2DTO1).isNotEqualTo(driver2DTO2);
        driver2DTO2.setId(driver2DTO1.getId());
        assertThat(driver2DTO1).isEqualTo(driver2DTO2);
        driver2DTO2.setId(2L);
        assertThat(driver2DTO1).isNotEqualTo(driver2DTO2);
        driver2DTO1.setId(null);
        assertThat(driver2DTO1).isNotEqualTo(driver2DTO2);
    }
}
