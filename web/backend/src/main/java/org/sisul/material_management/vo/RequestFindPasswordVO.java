package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestFindUsernameVO {
    private String workClass;
    private String workerName;
}
