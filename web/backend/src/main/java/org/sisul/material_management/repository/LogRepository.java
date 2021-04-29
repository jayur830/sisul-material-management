package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface LogRepository extends JpaRepository<Log, Date> {
    Log findByStock(final Stock stock);
}
