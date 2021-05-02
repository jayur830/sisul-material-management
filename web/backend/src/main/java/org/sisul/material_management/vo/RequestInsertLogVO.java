package org.sisul.material_management.vo;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestInsertLogVO {
    private String logTime;
    private String workClass;
    private String workerName;
    private String category;
    private String item;
    private Integer inOut;
    private Integer count;
    private String unit;
}
