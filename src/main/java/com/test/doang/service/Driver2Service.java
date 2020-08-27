package com.test.doang.service;

import com.test.doang.domain.Driver2;
import com.test.doang.repository.Driver2Repository;
import com.test.doang.service.dto.Driver2DTO;
import com.test.doang.service.mapper.Driver2Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Driver2}.
 */
@Service
@Transactional
public class Driver2Service {

    private final Logger log = LoggerFactory.getLogger(Driver2Service.class);

    private final Driver2Repository driver2Repository;

    private final Driver2Mapper driver2Mapper;

    public Driver2Service(Driver2Repository driver2Repository, Driver2Mapper driver2Mapper) {
        this.driver2Repository = driver2Repository;
        this.driver2Mapper = driver2Mapper;
    }

    /**
     * Save a driver2.
     *
     * @param driver2DTO the entity to save.
     * @return the persisted entity.
     */
    public Driver2DTO save(Driver2DTO driver2DTO) {
        log.debug("Request to save Driver2 : {}", driver2DTO);
        Driver2 driver2 = driver2Mapper.toEntity(driver2DTO);
        driver2 = driver2Repository.save(driver2);
        return driver2Mapper.toDto(driver2);
    }

    /**
     * Get all the driver2s.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Driver2DTO> findAll() {
        log.debug("Request to get all Driver2s");
        return driver2Repository.findAll().stream()
            .map(driver2Mapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one driver2 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Driver2DTO> findOne(Long id) {
        log.debug("Request to get Driver2 : {}", id);
        return driver2Repository.findById(id)
            .map(driver2Mapper::toDto);
    }

    /**
     * Delete the driver2 by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Driver2 : {}", id);
        driver2Repository.deleteById(id);
    }
}
