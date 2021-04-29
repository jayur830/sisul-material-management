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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stockId;

    private String category;
    private String item;
    private Integer count;
    private String unit;
}
