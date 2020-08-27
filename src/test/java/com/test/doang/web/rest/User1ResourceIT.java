package com.test.doang.web.rest;

import com.test.doang.JhipsterTestDoangApp;
import com.test.doang.domain.User1;
import com.test.doang.repository.User1Repository;
import com.test.doang.service.User1Service;
import com.test.doang.service.dto.User1DTO;
import com.test.doang.service.mapper.User1Mapper;

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

import com.test.doang.domain.enumeration.TaskMode;
/**
 * Integration tests for the {@link User1Resource} REST controller.
 */
@SpringBootTest(classes = JhipsterTestDoangApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class User1ResourceIT {

    private static final TaskMode DEFAULT_TASK_MODE = TaskMode.NO_CONTINUE_STAGE_COUNT;
    private static final TaskMode UPDATED_TASK_MODE = TaskMode.STAGE_COUNT;

    private static final Integer DEFAULT_VALUE = 1;
    private static final Integer UPDATED_VALUE = 2;

    @Autowired
    private User1Repository user1Repository;

    @Autowired
    private User1Mapper user1Mapper;

    @Autowired
    private User1Service user1Service;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUser1MockMvc;

    private User1 user1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createEntity(EntityManager em) {
        User1 user1 = new User1()
            .taskMode(DEFAULT_TASK_MODE)
            .value(DEFAULT_VALUE);
        return user1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static User1 createUpdatedEntity(EntityManager em) {
        User1 user1 = new User1()
            .taskMode(UPDATED_TASK_MODE)
            .value(UPDATED_VALUE);
        return user1;
    }

    @BeforeEach
    public void initTest() {
        user1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createUser1() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();
        // Create the User1
        User1DTO user1DTO = user1Mapper.toDto(user1);
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isCreated());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate + 1);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getTaskMode()).isEqualTo(DEFAULT_TASK_MODE);
        assertThat(testUser1.getValue()).isEqualTo(DEFAULT_VALUE);
    }

    @Test
    @Transactional
    public void createUser1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = user1Repository.findAll().size();

        // Create the User1 with an existing ID
        user1.setId(1L);
        User1DTO user1DTO = user1Mapper.toDto(user1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTaskModeIsRequired() throws Exception {
        int databaseSizeBeforeTest = user1Repository.findAll().size();
        // set the field null
        user1.setTaskMode(null);

        // Create the User1, which fails.
        User1DTO user1DTO = user1Mapper.toDto(user1);


        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValueIsRequired() throws Exception {
        int databaseSizeBeforeTest = user1Repository.findAll().size();
        // set the field null
        user1.setValue(null);

        // Create the User1, which fails.
        User1DTO user1DTO = user1Mapper.toDto(user1);


        restUser1MockMvc.perform(post("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUser1s() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get all the user1List
        restUser1MockMvc.perform(get("/api/user-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(user1.getId().intValue())))
            .andExpect(jsonPath("$.[*].taskMode").value(hasItem(DEFAULT_TASK_MODE.toString())))
            .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE)));
    }
    
    @Test
    @Transactional
    public void getUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", user1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(user1.getId().intValue()))
            .andExpect(jsonPath("$.taskMode").value(DEFAULT_TASK_MODE.toString()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE));
    }
    @Test
    @Transactional
    public void getNonExistingUser1() throws Exception {
        // Get the user1
        restUser1MockMvc.perform(get("/api/user-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Update the user1
        User1 updatedUser1 = user1Repository.findById(user1.getId()).get();
        // Disconnect from session so that the updates on updatedUser1 are not directly saved in db
        em.detach(updatedUser1);
        updatedUser1
            .taskMode(UPDATED_TASK_MODE)
            .value(UPDATED_VALUE);
        User1DTO user1DTO = user1Mapper.toDto(updatedUser1);

        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isOk());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
        User1 testUser1 = user1List.get(user1List.size() - 1);
        assertThat(testUser1.getTaskMode()).isEqualTo(UPDATED_TASK_MODE);
        assertThat(testUser1.getValue()).isEqualTo(UPDATED_VALUE);
    }

    @Test
    @Transactional
    public void updateNonExistingUser1() throws Exception {
        int databaseSizeBeforeUpdate = user1Repository.findAll().size();

        // Create the User1
        User1DTO user1DTO = user1Mapper.toDto(user1);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUser1MockMvc.perform(put("/api/user-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(user1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the User1 in the database
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUser1() throws Exception {
        // Initialize the database
        user1Repository.saveAndFlush(user1);

        int databaseSizeBeforeDelete = user1Repository.findAll().size();

        // Delete the user1
        restUser1MockMvc.perform(delete("/api/user-1-s/{id}", user1.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<User1> user1List = user1Repository.findAll();
        assertThat(user1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
