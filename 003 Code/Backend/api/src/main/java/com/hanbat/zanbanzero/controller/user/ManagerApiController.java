package com.hanbat.zanbanzero.controller.user;

import com.hanbat.zanbanzero.auth.jwt.JwtTemplate;
import com.hanbat.zanbanzero.auth.jwt.JwtUtil;
import com.hanbat.zanbanzero.dto.user.info.ManagerInfoDto;
import com.hanbat.zanbanzero.dto.user.user.UserDto;
import com.hanbat.zanbanzero.exception.exceptions.CantFindByIdException;
import com.hanbat.zanbanzero.exception.exceptions.JwtException;
import com.hanbat.zanbanzero.service.user.ManagerService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/manager/")
public class ManagerApiController {
    private final ManagerService managerService;

    @Operation(summary="관리자 로그인", description="username과 password를 입력받아 로그인 시도")
    @PostMapping("login/id")
    public ResponseEntity<ManagerInfoDto> managerLogin(HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return ResponseEntity.ok(managerService.getInfoForUsername(username));
    }

    @Operation(summary="관리자 대표정보 조회", description="username만 입력받아 정보조회")
    @GetMapping("info")
    public ResponseEntity<ManagerInfoDto> getInfo(HttpServletRequest request) throws JwtException, CantFindByIdException {
        String username = JwtUtil.getUsernameFromToken(request.getHeader(JwtTemplate.HEADER_STRING));
        return ResponseEntity.ok(managerService.getInfo(username));
    }
}
