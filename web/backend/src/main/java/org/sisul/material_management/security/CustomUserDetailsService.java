package org.sisul.material_management.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Member;
import org.sisul.material_management.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    public CustomUserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        Member member = this.memberRepository.findByUsername(username);
        if (member == null) throw new UsernameNotFoundException(username);
        return CustomUserDetails.builder()
                .username(member.getUsername())
                .password(member.getPassword())
                .authority(member.getAuthority())
                .locked(member.getLocked())
                .confirmed(member.getConfirmed())
                .build();
    }
}
