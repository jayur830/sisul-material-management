package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Date> {
    List<Log> findAllByOrderByLogTimeDesc();
    Log findByLogTimeAndWorkClassAndWorkerName(final String logTime, final String workClass, final String workerName);
    Log findByLogTime(final String logTime);
    List<Log> findAllByStockStockIdOrderByLogTimeDesc(final int stockId);

    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :count " +
            "where l.stock = :stock")
    void updateCountAll(
            @Param("count") final int count,
            @Param("stock") final Stock stock);

    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :count " +
            "where l.logTime > :logTime " +
            "and l.stock = :stock")
    void updateCountAllByLogTimeGreaterThan(
            @Param("count") final int count,
            @Param("logTime") final String logTime,
            @Param("stock") final Stock stock);

    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :subCount + :addCount " +
            "where l.logTime > :logTime " +
            "and l.stock = :stock")
    void updateCountAllByLogTimeGreaterThan(
            @Param("subCount") final int subCount,
            @Param("addCount") final int addCount,
            @Param("logTime") final String logTime,
            @Param("stock") final Stock stock);

    Log findFirst1ByStockCategoryAndStockItemOrderByLogTimeDesc(final String category, final String item);
}
