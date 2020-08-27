package com.test.doang.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.test.doang.web.rest.TestUtil;

public class Car3Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Car3.class);
        Car3 car31 = new Car3();
        car31.setId(1L);
        Car3 car32 = new Car3();
        car32.setId(car31.getId());
        assertThat(car31).isEqualTo(car32);
        car32.setId(2L);
        assertThat(car31).isNotEqualTo(car32);
        car31.setId(null);
        assertThat(car31).isNotEqualTo(car32);
    }
}
