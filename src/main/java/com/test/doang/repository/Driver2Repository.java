package com.test.doang.repository;

import com.test.doang.domain.Driver2;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Driver2 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface Driver2Repository extends JpaRepository<Driver2, Long> {
}
