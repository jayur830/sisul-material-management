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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer logId;

    private String logTime;

    private Integer stockId;

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

    @Override
    public Log clone() {
        return Log.builder()
                .logId(this.logId)
                .logTime(this.logTime)
                .stockId(this.stockId)
                .inOut(this.inOut)
                .count(this.count)
                .lastCount(this.lastCount)
                .unit(this.unit)
                .workClass(this.workClass)
                .workerName(this.workerName)
                .img1(this.img1)
                .img2(this.img2)
                .img3(this.img3)
                .build();
    }
}
