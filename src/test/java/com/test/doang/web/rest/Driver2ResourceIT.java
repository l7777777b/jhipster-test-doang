package com.test.doang.web.rest;

import com.test.doang.JhipsterTestDoangApp;
import com.test.doang.domain.Driver2;
import com.test.doang.repository.Driver2Repository;
import com.test.doang.service.Driver2Service;
import com.test.doang.service.dto.Driver2DTO;
import com.test.doang.service.mapper.Driver2Mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Driver2Resource} REST controller.
 */
@SpringBootTest(classes = JhipsterTestDoangApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class Driver2ResourceIT {

    @Autowired
    private Driver2Repository driver2Repository;

    @Autowired
    private Driver2Mapper driver2Mapper;

    @Autowired
    private Driver2Service driver2Service;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDriver2MockMvc;

    private Driver2 driver2;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Driver2 createEntity(EntityManager em) {
        Driver2 driver2 = new Driver2();
        return driver2;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Driver2 createUpdatedEntity(EntityManager em) {
        Driver2 driver2 = new Driver2();
        return driver2;
    }

    @BeforeEach
    public void initTest() {
        driver2 = createEntity(em);
    }

    @Test
    @Transactional
    public void createDriver2() throws Exception {
        int databaseSizeBeforeCreate = driver2Repository.findAll().size();
        // Create the Driver2
        Driver2DTO driver2DTO = driver2Mapper.toDto(driver2);
        restDriver2MockMvc.perform(post("/api/driver-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(driver2DTO)))
            .andExpect(status().isCreated());

        // Validate the Driver2 in the database
        List<Driver2> driver2List = driver2Repository.findAll();
        assertThat(driver2List).hasSize(databaseSizeBeforeCreate + 1);
        Driver2 testDriver2 = driver2List.get(driver2List.size() - 1);
    }

    @Test
    @Transactional
    public void createDriver2WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = driver2Repository.findAll().size();

        // Create the Driver2 with an existing ID
        driver2.setId(1L);
        Driver2DTO driver2DTO = driver2Mapper.toDto(driver2);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDriver2MockMvc.perform(post("/api/driver-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(driver2DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Driver2 in the database
        List<Driver2> driver2List = driver2Repository.findAll();
        assertThat(driver2List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDriver2s() throws Exception {
        // Initialize the database
        driver2Repository.saveAndFlush(driver2);

        // Get all the driver2List
        restDriver2MockMvc.perform(get("/api/driver-2-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(driver2.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getDriver2() throws Exception {
        // Initialize the database
        driver2Repository.saveAndFlush(driver2);

        // Get the driver2
        restDriver2MockMvc.perform(get("/api/driver-2-s/{id}", driver2.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(driver2.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingDriver2() throws Exception {
        // Get the driver2
        restDriver2MockMvc.perform(get("/api/driver-2-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDriver2() throws Exception {
        // Initialize the database
        driver2Repository.saveAndFlush(driver2);

        int databaseSizeBeforeUpdate = driver2Repository.findAll().size();

        // Update the driver2
        Driver2 updatedDriver2 = driver2Repository.findById(driver2.getId()).get();
        // Disconnect from session so that the updates on updatedDriver2 are not directly saved in db
        em.detach(updatedDriver2);
        Driver2DTO driver2DTO = driver2Mapper.toDto(updatedDriver2);

        restDriver2MockMvc.perform(put("/api/driver-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(driver2DTO)))
            .andExpect(status().isOk());

        // Validate the Driver2 in the database
        List<Driver2> driver2List = driver2Repository.findAll();
        assertThat(driver2List).hasSize(databaseSizeBeforeUpdate);
        Driver2 testDriver2 = driver2List.get(driver2List.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingDriver2() throws Exception {
        int databaseSizeBeforeUpdate = driver2Repository.findAll().size();

        // Create the Driver2
        Driver2DTO driver2DTO = driver2Mapper.toDto(driver2);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDriver2MockMvc.perform(put("/api/driver-2-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(driver2DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Driver2 in the database
        List<Driver2> driver2List = driver2Repository.findAll();
        assertThat(driver2List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDriver2() throws Exception {
        // Initialize the database
        driver2Repository.saveAndFlush(driver2);

        int databaseSizeBeforeDelete = driver2Repository.findAll().size();

        // Delete the driver2
        restDriver2MockMvc.perform(delete("/api/driver-2-s/{id}", driver2.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Driver2> driver2List = driver2Repository.findAll();
        assertThat(driver2List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
