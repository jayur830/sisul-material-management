package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.sisul.material_management.entity.Member;
import org.sisul.material_management.repository.ItemRepository;
import org.sisul.material_management.repository.MemberRepository;
import org.sisul.material_management.utils.MailUtils;
import org.sisul.material_management.vo.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    public List<String> getWorkClasses() {
        return this.itemRepository.findAllByItemCategory();
    }

    @Transactional
    public void signUp(final RequestSignUpVO request) {
        this.memberRepository.save(Member.builder()
                .username(request.getUsername())
                .password(this.passwordEncoder.encode(request.getPassword()))
                .workClass(request.getWorkClass())
                .workerName(request.getWorkerName())
                .email(request.getEmail())
                .build());
    }

    public String findUsername(final RequestFindUsernameVO request) {
        try {
            String username = this.memberRepository.findByWorkClassAndWorkerName(request.getWorkClass(), request.getWorkerName()).getUsername();
            return username.substring(0, 3) + IntStream.range(0, username.length() - 3).mapToObj(i -> "*").collect(Collectors.joining());
        } catch (NullPointerException e) {
            return null;
        }
    }

    @Transactional
    public Map<String, Boolean> findPassword(final RequestFindPasswordVO request) {
        Map<String, Boolean> response = new HashMap<>();
        try {
            Member member = this.memberRepository.findByUsernameAndEmail(request.getUsername(), request.getEmail());
            if (member == null) response.put("isExistUser", false);
            else {
                response.put("isExistUser", true);
                final String newPassword = RandomStringUtils.randomAlphanumeric(10);
                this.memberRepository.updateByUsernameAndEmail(this.passwordEncoder.encode(newPassword), request.getUsername(), request.getEmail());
//                MailUtils.sendEmail("jayur830@gmail.com", request.getEmail(), "[서울시설공단] 응급보수자재관리 :: 임시 비밀번호 안내", newPassword, true);
                MailUtils.sendEmail("sisul@material.manage.co.kr", request.getEmail(), "[서울시설공단] 응급보수자재관리 :: 임시 비밀번호 안내", newPassword, true);
            }
        } catch (NullPointerException e) {
            response.put("isExistUser", false);
        }
        return response;
    }

    public ResponseLoggedInMemberVO getLoggedInMember() {
        Member member = this.memberRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseLoggedInMemberVO.builder()
                .username(member.getUsername())
                .password(member.getPassword())
                .workClass(member.getWorkClass())
                .workerName(member.getWorkerName())
                .email(member.getEmail())
                .build();
    }

    @Transactional
    public void updateInfo(final RequestUpdateInfoVO request) {
        this.memberRepository.updateByUsername(request.getUsername(), request.getWorkClass(), request.getWorkerName(), request.getEmail());
    }

    public Map<String, Boolean> compareCurrentPassword(final String currentPassword) {
        Map<String, Boolean> response = new HashMap<>();

        final String password = this.memberRepository.findByUsername(
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName())
                .getPassword();
        log.info("{} {} {}", currentPassword.substring(0, currentPassword.length() - 1), password, this.passwordEncoder.matches(currentPassword, password));
        response.put("isMatched", this.passwordEncoder.matches(currentPassword.substring(0, currentPassword.length() - 1), password));
        return response;
    }

    @Transactional
    public void changePassword(final String newPassword) {
        this.memberRepository.updatePasswordByUsername(
                SecurityContextHolder.getContext().getAuthentication().getName(),
                this.passwordEncoder.encode(newPassword.substring(0, newPassword.length() - 1)));
    }

    public List<Member> getUnconfirmedMembers() {
        return this.memberRepository.findAllByConfirmedOrderByUsername(false);
    }

    @Transactional
    public void confirm(final String username) {
        this.memberRepository.updateConfirmedByUsername(username);
    }
}
