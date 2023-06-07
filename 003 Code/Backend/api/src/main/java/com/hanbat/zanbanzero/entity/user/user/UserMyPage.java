package com.hanbat.zanbanzero.entity.user.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserMypage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private User user;

    private String coupon;
    private int point;

    public static UserMypage createNewUserMyPage(User user) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<Integer, String> first_coupon = Map.of(1, "신규가입 환영 쿠폰");
        return new UserMypage(
                user.getId(),
                user,
                objectMapper.writeValueAsString(first_coupon),
                0
                );
    }
}
