package org.sisul.material_management.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    @Id
    private Integer id;

    private String itemCategory;
    private String itemName;
}
