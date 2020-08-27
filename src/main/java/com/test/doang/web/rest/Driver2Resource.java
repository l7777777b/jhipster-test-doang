package com.test.doang.web.rest;

import com.test.doang.service.Driver2Service;
import com.test.doang.web.rest.errors.BadRequestAlertException;
import com.test.doang.service.dto.Driver2DTO;

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
 * REST controller for managing {@link com.test.doang.domain.Driver2}.
 */
@RestController
@RequestMapping("/api")
public class Driver2Resource {

    private final Logger log = LoggerFactory.getLogger(Driver2Resource.class);

    private static final String ENTITY_NAME = "driver2";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Driver2Service driver2Service;

    public Driver2Resource(Driver2Service driver2Service) {
        this.driver2Service = driver2Service;
    }

    /**
     * {@code POST  /driver-2-s} : Create a new driver2.
     *
     * @param driver2DTO the driver2DTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new driver2DTO, or with status {@code 400 (Bad Request)} if the driver2 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/driver-2-s")
    public ResponseEntity<Driver2DTO> createDriver2(@RequestBody Driver2DTO driver2DTO) throws URISyntaxException {
        log.debug("REST request to save Driver2 : {}", driver2DTO);
        if (driver2DTO.getId() != null) {
            throw new BadRequestAlertException("A new driver2 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Driver2DTO result = driver2Service.save(driver2DTO);
        return ResponseEntity.created(new URI("/api/driver-2-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /driver-2-s} : Updates an existing driver2.
     *
     * @param driver2DTO the driver2DTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated driver2DTO,
     * or with status {@code 400 (Bad Request)} if the driver2DTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the driver2DTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/driver-2-s")
    public ResponseEntity<Driver2DTO> updateDriver2(@RequestBody Driver2DTO driver2DTO) throws URISyntaxException {
        log.debug("REST request to update Driver2 : {}", driver2DTO);
        if (driver2DTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Driver2DTO result = driver2Service.save(driver2DTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, driver2DTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /driver-2-s} : get all the driver2s.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of driver2s in body.
     */
    @GetMapping("/driver-2-s")
    public List<Driver2DTO> getAllDriver2s() {
        log.debug("REST request to get all Driver2s");
        return driver2Service.findAll();
    }

    /**
     * {@code GET  /driver-2-s/:id} : get the "id" driver2.
     *
     * @param id the id of the driver2DTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the driver2DTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/driver-2-s/{id}")
    public ResponseEntity<Driver2DTO> getDriver2(@PathVariable Long id) {
        log.debug("REST request to get Driver2 : {}", id);
        Optional<Driver2DTO> driver2DTO = driver2Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(driver2DTO);
    }

    /**
     * {@code DELETE  /driver-2-s/:id} : delete the "id" driver2.
     *
     * @param id the id of the driver2DTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/driver-2-s/{id}")
    public ResponseEntity<Void> deleteDriver2(@PathVariable Long id) {
        log.debug("REST request to delete Driver2 : {}", id);
        driver2Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
