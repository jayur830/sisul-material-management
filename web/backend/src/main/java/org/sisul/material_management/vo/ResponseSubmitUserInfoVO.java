package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSubmitUserInfoVO {
    private String workClass;
    private String workerName;
}
