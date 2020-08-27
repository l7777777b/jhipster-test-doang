package com.test.doang.repository;

import com.test.doang.domain.RankProperties;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the RankProperties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RankPropertiesRepository extends JpaRepository<RankProperties, Long> {
}
