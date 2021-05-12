package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.security.CustomUserDetailsService;
import org.sisul.material_management.service.MemberService;
import org.sisul.material_management.vo.RequestFindUsernameVO;
import org.sisul.material_management.vo.RequestSignUpVO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final CustomUserDetailsService customUserDetailsService;

    @GetMapping("/isAuthenticated")
    public Map<String, Object> isAuthenticated() {
        Map<String, Object> auth = new HashMap<>();
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        final boolean isAuthenticated = authentication != null &&
                !authentication.getPrincipal().equals("anonymousUser");
        auth.put("isAuthenticated", isAuthenticated);

        log.info("{}", authentication.getName());
        log.info("{}", authentication.getAuthorities());
        if (isAuthenticated) auth.put("isAdmin", ((List<GrantedAuthority>) authentication.getAuthorities()).get(0).getAuthority().equals("ADMIN"));
        return auth;
    }

    @GetMapping("/getWorkClasses")
    public List<String> getWorkClasses() {
        return this.memberService.getWorkClasses();
    }

    @GetMapping("/findByUsername")
    public int findByUsername(@RequestParam("username") final String username) {
        try {
            this.customUserDetailsService.loadUserByUsername(username);
            return 0;
        } catch (UsernameNotFoundException e) {
            return 1;
        }
    }

    @PostMapping("/signUp")
    public void signUp(@RequestBody final RequestSignUpVO request) {
        this.memberService.signUp(request);
    }

    @PostMapping("/findUsername")
    public String findUsername(@RequestBody final RequestFindUsernameVO request) {
        return this.memberService.findUsername(request);
    }
}
