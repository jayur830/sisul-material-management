package org.sisul.material_management.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

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

    private Integer inOut;
    private Integer count;
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
