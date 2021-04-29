package org.sisul.material_management.vo;

import lombok.*;

import java.util.Date;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDashboardDataVO {
    private Date logTime;
    private Integer inOut;
    private String category;
    private String item;
    private Integer count;
    private String unit;
    private String workClass;
    private String workerName;
}
