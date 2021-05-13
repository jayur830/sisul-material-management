package org.sisul.material_management.vo;

import lombok.*;

@Getter
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestUpdateInfoVO {
    private String username;
    private String workClass;
    private String workerName;
    private String email;
}
