package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestModifyStockVO {
    private int stockId;
    private int count;
}
