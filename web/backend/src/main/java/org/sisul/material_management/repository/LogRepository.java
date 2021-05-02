package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Date> {
    List<Log> findAllByOrderByLogTimeDesc();
    Log findByLogTimeAndWorkClassAndWorkerName(final String logTime, final String workClass, final String workerName);
    List<Log> findAllByStockStockIdOrderByLogTimeDesc(final int stockId);
}
