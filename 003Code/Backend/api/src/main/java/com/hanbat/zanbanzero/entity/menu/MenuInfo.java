package com.hanbat.zanbanzero.entity.menu;

import com.hanbat.zanbanzero.dto.menu.MenuUpdateDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MenuInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String info;
    private String details;

    public void patch(MenuUpdateDto dto) {
        if (dto.info() != null) this.info = dto.info();
        if (dto.details() != null) this.details = dto.details();
    }

    public static MenuInfo from(MenuUpdateDto dto) {
        return new MenuInfo(
                null,
                dto.info(),
                dto.details()
        );
    }
}
