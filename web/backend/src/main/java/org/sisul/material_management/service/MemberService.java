package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Member;
import org.sisul.material_management.repository.ItemRepository;
import org.sisul.material_management.repository.MemberRepository;
import org.sisul.material_management.vo.RequestSignUpVO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
}
