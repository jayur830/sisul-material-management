package org.sisul.material_management.vo;

import lombok.*;
import org.springframework.lang.Nullable;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestMaterialVO {
    private String category;
    @Nullable
    private String item;

    @Builder.Default
    private Integer initCount = 0;
}
