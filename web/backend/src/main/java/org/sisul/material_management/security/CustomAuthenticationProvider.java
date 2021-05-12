package org.sisul.material_management.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {
    private final PasswordEncoder passwordEncoder;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final String username = (String) authentication.getPrincipal();
        final String password = (String) authentication.getCredentials();
        final UserDetails user = this.customUserDetailsService.loadUserByUsername(username);

        // if not matched username or password
        if (!this.passwordEncoder.matches(password, user.getPassword()))
            throw new BadCredentialsException(username);
        // if expired credential
        else if (!user.isCredentialsNonExpired())
            throw new CredentialsExpiredException(username);
        // if disabled account
        else if (!user.isEnabled())
            throw new DisabledException(username);
        // if expired account
        else if (!user.isAccountNonExpired())
            throw new AccountExpiredException(username);
        // if locked account
        else if (!user.isAccountNonExpired())
            throw new LockedException(username);

        return new UsernamePasswordAuthenticationToken(username, password, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
