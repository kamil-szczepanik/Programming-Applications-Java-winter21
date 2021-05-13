package com.thsgroup.Clinic.appuser;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<UserRole, Long> {
	Optional<AppUserRole> findByName(AppUserRole name);
}
