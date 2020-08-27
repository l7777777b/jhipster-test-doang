package com.test.doang.repository;

import com.test.doang.domain.Car3;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Car3 entity.
 */
@Repository
public interface Car3Repository extends JpaRepository<Car3, Long> {

    @Query(value = "select distinct car3 from Car3 car3 left join fetch car3.drivers",
        countQuery = "select count(distinct car3) from Car3 car3")
    Page<Car3> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct car3 from Car3 car3 left join fetch car3.drivers")
    List<Car3> findAllWithEagerRelationships();

    @Query("select car3 from Car3 car3 left join fetch car3.drivers where car3.id =:id")
    Optional<Car3> findOneWithEagerRelationships(@Param("id") Long id);
}
