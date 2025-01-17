package com.hanbat.zanbanzero.exception.exceptions;

import lombok.Getter;
import org.springframework.security.core.AuthenticationException;

@Getter
public class KeycloakLoginException extends AuthenticationException {

    public KeycloakLoginException(String message) {
        super(message);
    }
}
