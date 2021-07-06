package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestLogPutDataVO {
    private String srcLogTime;
    private String srcWorkClass;
    private String srcWorkerName;
    private String srcCategory;
    private String srcItem;
    private String logTime;
    private String workClass;
    private String workerName;
    private String category;
    private String item;
    private Integer inOut;
    private Integer count;
    private String unit;
}
