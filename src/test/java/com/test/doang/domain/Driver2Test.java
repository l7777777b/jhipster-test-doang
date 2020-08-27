package com.test.doang.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.doang.web.rest.TestUtil;

public class Driver2Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Driver2.class);
        Driver2 driver21 = new Driver2();
        driver21.setId(1L);
        Driver2 driver22 = new Driver2();
        driver22.setId(driver21.getId());
        assertThat(driver21).isEqualTo(driver22);
        driver22.setId(2L);
        assertThat(driver21).isNotEqualTo(driver22);
        driver21.setId(null);
        assertThat(driver21).isNotEqualTo(driver22);
    }
}
