package com.test.doang.repository;

import com.test.doang.domain.User1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the User1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface User1Repository extends JpaRepository<User1, Long> {
}
