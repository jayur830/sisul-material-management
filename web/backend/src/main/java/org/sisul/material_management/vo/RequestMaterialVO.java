package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestMaterialVO {
    private String category;
    private String item;
    private Integer initCount;
}
