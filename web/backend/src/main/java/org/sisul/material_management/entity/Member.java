package org.sisul.material_management.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id
    @Column(name = "p_usr", nullable = false)
    private String username;

    @Column(name = "p_pwd")
    private String password;

    @Column(name = "p_auth", length = 5)
    @Builder.Default
    private String authority = "USER";

    @Column(name = "p_pwd_wrng_cnt")
    @Builder.Default
    private Integer passwordWrongCount = 0;

    @Column(name = "p_lckd")
    @Builder.Default
    private Boolean locked = false;

    @Column(name = "p_wrk_cls")
    private String workClass;

    @Column(name = "p_wrk_nm")
    private String workerName;

    @Column(name = "p_email", length = 100)
    private String email;
}
