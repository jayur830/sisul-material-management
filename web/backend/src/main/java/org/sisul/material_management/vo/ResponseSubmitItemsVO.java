package org.sisul.material_management.vo;

import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSubmitItemsVO {
    @Builder.Default
    private List<String> workClasses = new ArrayList<>();
    @Builder.Default
    private Map<String, List<String>> materials = new HashMap<>();
    @Builder.Default
    private List<String> units = new ArrayList<>();
}
