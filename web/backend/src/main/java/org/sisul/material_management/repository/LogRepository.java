package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.projection.LogProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Date> {
    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId " +
            "order by l.logTime")
    List<LogProjection> findAllByOrderByLogTime();

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId " +
            "order by l.logTime desc")
    List<LogProjection> findAllByOrderByLogTimeDesc();

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId " +
            "where l.logTime = :logTime " +
            "and l.workClass = :workClass " +
            "and l.workerName = :workerName")
    LogProjection findByLogTimeAndWorkClassAndWorkerName(final String logTime, final String workClass, final String workerName);

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId " +
            "where l.logTime = :logTime")
    LogProjection findByLogTime(final String logTime);

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId " +
            "where l.stockId = :stockId " +
            "order by l.logTime desc")
    List<LogProjection> findAllByStockIdOrderByLogTimeDesc(final int stockId);

    @Deprecated
    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :count " +
            "where l.stockId = :stockId")
    void updateCountAll(
            @Param("count") final int count,
            @Param("stockId") final int stockId);

    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :count " +
            "where l.logTime > :logTime " +
            "and l.stockId = :stockId")
    void updateCountAllByLogTimeGreaterThan(
            @Param("count") final int count,
            @Param("logTime") final String logTime,
            @Param("stockId") final int stockId);

    @Modifying
    @Query(
            "update Log l " +
            "set l.lastCount = l.lastCount + :subCount + :addCount " +
            "where l.logTime > :logTime " +
            "and l.stockId = :stockId")
    void updateCountAllByLogTimeGreaterThan(
            @Param("subCount") final int subCount,
            @Param("addCount") final int addCount,
            @Param("logTime") final String logTime,
            @Param("stockId") final int stockId);

    void deleteByLogTime(final String logTime);

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId  " +
            "where s.category = :category " +
            "and s.item = :item " +
            "order by l.logTime desc")
    LogProjection findFirst1ByStockCategoryAndStockItemOrderByLogTimeDesc(@Param("category") final String category, @Param("item") final String item);

    @Query(
            "select " +
            "   l.logTime as logTime, " +
            "   s.stockId as stockId, " +
            "   s.category as category, " +
            "   s.item as item, " +
            "   l.inOut as inOut, " +
            "   l.count as count, " +
            "   l.lastCount as lastCount, " +
            "   l.unit as unit, " +
            "   l.workClass as workClass, " +
            "   l.workerName as workerName, " +
            "   l.img1 as img1, " +
            "   l.img2 as img2, " +
            "   l.img3 as img3 " +
            "from Log l " +
            "join Stock s " +
            "on l.stockId = s.stockId  " +
            "where l.logTime >= :logTime " +
            "order by l.logTime")
    List<LogProjection> findAllByLogTimeGreaterThanEqualOrderByLogTime(final String logTime);
}
