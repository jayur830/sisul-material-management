package org.sisul.material_management.security;

import org.springframework.security.authentication.AccountStatusException;

public class NonConfirmedException extends AccountStatusException {
    public NonConfirmedException(String msg) {
        super(msg);
    }
}
