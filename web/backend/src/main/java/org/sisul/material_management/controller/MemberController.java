package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Member;
import org.sisul.material_management.repository.MemberRepository;
import org.sisul.material_management.security.CustomUserDetailsService;
import org.sisul.material_management.service.MemberService;
import org.sisul.material_management.vo.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
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
        auth.put("isConfirmed", false);

        if (isAuthenticated) {
            auth.put("isAdmin", ((List<GrantedAuthority>) authentication.getAuthorities()).get(0).getAuthority().equals("ADMIN"));
            auth.replace("isConfirmed", this.customUserDetailsService.loadUserByUsername(authentication.getName()).isConfirmed());
        }
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

    @PostMapping("/findPassword")
    public Map<String, Boolean> findPassword(@RequestBody final RequestFindPasswordVO request) {
        return this.memberService.findPassword(request);
    }

    @GetMapping("/getLoggedInMember")
    public ResponseLoggedInMemberVO getLoggedInMember() {
        return this.memberService.getLoggedInMember();
    }

    @PutMapping("/updateInfo")
    public void updateInfo(@RequestBody final RequestUpdateInfoVO request) {
        this.memberService.updateInfo(request);
    }

    @PostMapping("/compareCurrentPassword")
    public Map<String, Boolean> compareCurrentPassword(@RequestBody final String currentPassword) {
        return this.memberService.compareCurrentPassword(currentPassword);
    }

    @PostMapping("/changePassword")
    public void changePassword(@RequestBody final String newPassword) {
        this.memberService.changePassword(newPassword);
    }

    @GetMapping("/getUnconfirmedMembers")
    public List<Member> getUnconfirmedMembers() {
        return this.memberService.getUnconfirmedMembers();
    }

    @PutMapping("/confirm")
    public void confirm(@RequestBody final Map<String, String> request) {
        this.memberService.confirm(request.get("username"));
    }
}
