package org.sisul.material_management.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    @Id
    private String logTime;

    @OneToOne
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @Builder.Default
    private Integer inOut = 0;

    @Builder.Default
    private Integer count = 0;

    @Builder.Default
    private Integer lastCount = 0;

    private String unit;
    private String workClass;
    private String workerName;

    @Builder.Default
    private String img1 = "";

    @Builder.Default
    private String img2 = "";

    @Builder.Default
    private String img3 = "";
}
