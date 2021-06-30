package org.sisul.material_management.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Stock {
    @Id
    private Integer stockId;

    private String category;
    private String item;

    @Builder.Default
    private Integer count = 0;

    @Builder.Default
    private boolean available = true;
}
