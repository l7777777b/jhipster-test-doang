package com.test.doang.web.rest;

import com.test.doang.service.Car3Service;
import com.test.doang.web.rest.errors.BadRequestAlertException;
import com.test.doang.service.dto.Car3DTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.test.doang.domain.Car3}.
 */
@RestController
@RequestMapping("/api")
public class Car3Resource {

    private final Logger log = LoggerFactory.getLogger(Car3Resource.class);

    private static final String ENTITY_NAME = "car3";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Car3Service car3Service;

    public Car3Resource(Car3Service car3Service) {
        this.car3Service = car3Service;
    }

    /**
     * {@code POST  /car-3-s} : Create a new car3.
     *
     * @param car3DTO the car3DTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new car3DTO, or with status {@code 400 (Bad Request)} if the car3 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/car-3-s")
    public ResponseEntity<Car3DTO> createCar3(@RequestBody Car3DTO car3DTO) throws URISyntaxException {
        log.debug("REST request to save Car3 : {}", car3DTO);
        if (car3DTO.getId() != null) {
            throw new BadRequestAlertException("A new car3 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Car3DTO result = car3Service.save(car3DTO);
        return ResponseEntity.created(new URI("/api/car-3-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /car-3-s} : Updates an existing car3.
     *
     * @param car3DTO the car3DTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated car3DTO,
     * or with status {@code 400 (Bad Request)} if the car3DTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the car3DTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/car-3-s")
    public ResponseEntity<Car3DTO> updateCar3(@RequestBody Car3DTO car3DTO) throws URISyntaxException {
        log.debug("REST request to update Car3 : {}", car3DTO);
        if (car3DTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Car3DTO result = car3Service.save(car3DTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, car3DTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /car-3-s} : get all the car3s.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of car3s in body.
     */
    @GetMapping("/car-3-s")
    public List<Car3DTO> getAllCar3s(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Car3s");
        return car3Service.findAll();
    }

    /**
     * {@code GET  /car-3-s/:id} : get the "id" car3.
     *
     * @param id the id of the car3DTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the car3DTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/car-3-s/{id}")
    public ResponseEntity<Car3DTO> getCar3(@PathVariable Long id) {
        log.debug("REST request to get Car3 : {}", id);
        Optional<Car3DTO> car3DTO = car3Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(car3DTO);
    }

    /**
     * {@code DELETE  /car-3-s/:id} : delete the "id" car3.
     *
     * @param id the id of the car3DTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/car-3-s/{id}")
    public ResponseEntity<Void> deleteCar3(@PathVariable Long id) {
        log.debug("REST request to delete Car3 : {}", id);
        car3Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
