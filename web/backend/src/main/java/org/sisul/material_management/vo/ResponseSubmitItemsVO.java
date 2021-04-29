package org.sisul.material_management.vo;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponseSubmitItemsVO {
    @Builder.Default
    private List<String> workClasses = new ArrayList<>();
    @Builder.Default
    private List<String> categories = new ArrayList<>();
    @Builder.Default
    private List<String> items = new ArrayList<>();
    @Builder.Default
    private List<String> units = new ArrayList<>();
}
