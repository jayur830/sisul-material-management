package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Member findByUsername(final String username);

    @Modifying
    @Query("update Member m set m.passwordWrongCount = m.passwordWrongCount + 1 where m.username = :username")
    void updatePasswordWrongCountByUsername(@Param("username") final String username);

    @Query("select m.passwordWrongCount from Member m where m.username = :username")
    int findPasswordWrongCountByUsername(@Param("username") final String username);

    @Modifying
    @Query("update Member m set m.passwordWrongCount = 0, m.locked = 1 where m.username = :username")
    void disableAccountByUsername(@Param("username") final String username);

    @Modifying
    @Query("update Member m set m.passwordWrongCount = 0, m.locked = 0 where m.username = :username")
    void initAccountStatusByUsername(@Param("username") final String username);

    Member findByWorkClassAndWorkerName(final String workClass, final String workerName);
}
