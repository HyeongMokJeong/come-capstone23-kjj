package com.hanbat.zanbanzero.entity.sbiz;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class WeeklyFoodPredict {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Timestamp date;

    private long entireMonday;
    private long entireTuesday;
    private long entireWednesday;
    private long entireThursday;
    private long entireFriday;

    private long monday;
    private long tuesday;
    private long wednesday;
    private long thursday;
    private long friday;
}