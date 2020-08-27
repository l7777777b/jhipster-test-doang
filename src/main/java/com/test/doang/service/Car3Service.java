package com.test.doang.service;

import com.test.doang.domain.Car3;
import com.test.doang.repository.Car3Repository;
import com.test.doang.service.dto.Car3DTO;
import com.test.doang.service.mapper.Car3Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Car3}.
 */
@Service
@Transactional
public class Car3Service {

    private final Logger log = LoggerFactory.getLogger(Car3Service.class);

    private final Car3Repository car3Repository;

    private final Car3Mapper car3Mapper;

    public Car3Service(Car3Repository car3Repository, Car3Mapper car3Mapper) {
        this.car3Repository = car3Repository;
        this.car3Mapper = car3Mapper;
    }

    /**
     * Save a car3.
     *
     * @param car3DTO the entity to save.
     * @return the persisted entity.
     */
    public Car3DTO save(Car3DTO car3DTO) {
        log.debug("Request to save Car3 : {}", car3DTO);
        Car3 car3 = car3Mapper.toEntity(car3DTO);
        car3 = car3Repository.save(car3);
        return car3Mapper.toDto(car3);
    }

    /**
     * Get all the car3s.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Car3DTO> findAll() {
        log.debug("Request to get all Car3s");
        return car3Repository.findAllWithEagerRelationships().stream()
            .map(car3Mapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get all the car3s with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<Car3DTO> findAllWithEagerRelationships(Pageable pageable) {
        return car3Repository.findAllWithEagerRelationships(pageable).map(car3Mapper::toDto);
    }

    /**
     * Get one car3 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Car3DTO> findOne(Long id) {
        log.debug("Request to get Car3 : {}", id);
        return car3Repository.findOneWithEagerRelationships(id)
            .map(car3Mapper::toDto);
    }

    /**
     * Delete the car3 by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Car3 : {}", id);
        car3Repository.deleteById(id);
    }
}
