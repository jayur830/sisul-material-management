package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseLoggedInMemberVO {
    private String username;
    private String password;
    private String workClass;
    private String workerName;
    private String email;
}
