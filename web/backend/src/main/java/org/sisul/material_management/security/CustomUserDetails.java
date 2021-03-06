package org.sisul.material_management.security;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Component
@Data
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {
    private String username;
    private String password;

    @Builder.Default
    private String authority = "USER";

    @Builder.Default
    private boolean locked = false;

    @Builder.Default
    private boolean confirmed = false;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(this.authority));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !this.locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return !this.locked;
    }

    public boolean isConfirmed() {
        return this.confirmed;
    }
}
