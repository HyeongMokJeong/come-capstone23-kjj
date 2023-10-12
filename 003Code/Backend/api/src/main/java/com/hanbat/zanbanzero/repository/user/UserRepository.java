package com.hanbat.zanbanzero.repository.user;

import com.hanbat.zanbanzero.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Boolean existsByUsername(String username);

    User findByUsername(@Param("username") String username);

    Optional<User> findByRoles(String role);
}
