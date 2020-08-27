package com.test.doang.web.rest;

import com.test.doang.JhipsterTestDoangApp;
import com.test.doang.domain.Car3;
import com.test.doang.repository.Car3Repository;
import com.test.doang.service.Car3Service;
import com.test.doang.service.dto.Car3DTO;
import com.test.doang.service.mapper.Car3Mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Car3Resource} REST controller.
 */
@SpringBootTest(classes = JhipsterTestDoangApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class Car3ResourceIT {

    @Autowired
    private Car3Repository car3Repository;

    @Mock
    private Car3Repository car3RepositoryMock;

    @Autowired
    private Car3Mapper car3Mapper;

    @Mock
    private Car3Service car3ServiceMock;

    @Autowired
    private Car3Service car3Service;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCar3MockMvc;

    private Car3 car3;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Car3 createEntity(EntityManager em) {
        Car3 car3 = new Car3();
        return car3;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Car3 createUpdatedEntity(EntityManager em) {
        Car3 car3 = new Car3();
        return car3;
    }

    @BeforeEach
    public void initTest() {
        car3 = createEntity(em);
    }

    @Test
    @Transactional
    public void createCar3() throws Exception {
        int databaseSizeBeforeCreate = car3Repository.findAll().size();
        // Create the Car3
        Car3DTO car3DTO = car3Mapper.toDto(car3);
        restCar3MockMvc.perform(post("/api/car-3-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(car3DTO)))
            .andExpect(status().isCreated());

        // Validate the Car3 in the database
        List<Car3> car3List = car3Repository.findAll();
        assertThat(car3List).hasSize(databaseSizeBeforeCreate + 1);
        Car3 testCar3 = car3List.get(car3List.size() - 1);
    }

    @Test
    @Transactional
    public void createCar3WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = car3Repository.findAll().size();

        // Create the Car3 with an existing ID
        car3.setId(1L);
        Car3DTO car3DTO = car3Mapper.toDto(car3);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCar3MockMvc.perform(post("/api/car-3-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(car3DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Car3 in the database
        List<Car3> car3List = car3Repository.findAll();
        assertThat(car3List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCar3s() throws Exception {
        // Initialize the database
        car3Repository.saveAndFlush(car3);

        // Get all the car3List
        restCar3MockMvc.perform(get("/api/car-3-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(car3.getId().intValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCar3sWithEagerRelationshipsIsEnabled() throws Exception {
        when(car3ServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCar3MockMvc.perform(get("/api/car-3-s?eagerload=true"))
            .andExpect(status().isOk());

        verify(car3ServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCar3sWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(car3ServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCar3MockMvc.perform(get("/api/car-3-s?eagerload=true"))
            .andExpect(status().isOk());

        verify(car3ServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCar3() throws Exception {
        // Initialize the database
        car3Repository.saveAndFlush(car3);

        // Get the car3
        restCar3MockMvc.perform(get("/api/car-3-s/{id}", car3.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(car3.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCar3() throws Exception {
        // Get the car3
        restCar3MockMvc.perform(get("/api/car-3-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCar3() throws Exception {
        // Initialize the database
        car3Repository.saveAndFlush(car3);

        int databaseSizeBeforeUpdate = car3Repository.findAll().size();

        // Update the car3
        Car3 updatedCar3 = car3Repository.findById(car3.getId()).get();
        // Disconnect from session so that the updates on updatedCar3 are not directly saved in db
        em.detach(updatedCar3);
        Car3DTO car3DTO = car3Mapper.toDto(updatedCar3);

        restCar3MockMvc.perform(put("/api/car-3-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(car3DTO)))
            .andExpect(status().isOk());

        // Validate the Car3 in the database
        List<Car3> car3List = car3Repository.findAll();
        assertThat(car3List).hasSize(databaseSizeBeforeUpdate);
        Car3 testCar3 = car3List.get(car3List.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCar3() throws Exception {
        int databaseSizeBeforeUpdate = car3Repository.findAll().size();

        // Create the Car3
        Car3DTO car3DTO = car3Mapper.toDto(car3);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCar3MockMvc.perform(put("/api/car-3-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(car3DTO)))
            .andExpect(status().isBadRequest());

        // Validate the Car3 in the database
        List<Car3> car3List = car3Repository.findAll();
        assertThat(car3List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCar3() throws Exception {
        // Initialize the database
        car3Repository.saveAndFlush(car3);

        int databaseSizeBeforeDelete = car3Repository.findAll().size();

        // Delete the car3
        restCar3MockMvc.perform(delete("/api/car-3-s/{id}", car3.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Car3> car3List = car3Repository.findAll();
        assertThat(car3List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
