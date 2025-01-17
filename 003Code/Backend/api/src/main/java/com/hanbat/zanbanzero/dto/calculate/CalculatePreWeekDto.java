package com.hanbat.zanbanzero.dto.calculate;

import com.hanbat.zanbanzero.entity.batch.calculate.CalculatePreWeek;

import java.time.LocalDate;

public record CalculatePreWeekDto(LocalDate date, int monday, int tuesday, int wednesday, int thursday, int friday) {

    public static CalculatePreWeekDto from(CalculatePreWeek data) {
        return new CalculatePreWeekDto(
                data.getBatchDate().getDate(),
                data.getMonday(),
                data.getTuesday(),
                data.getWednesday(),
                data.getThursday(),
                data.getFriday()
        );
    }
}
