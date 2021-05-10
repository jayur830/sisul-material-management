package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.service.MemberService;
import org.sisul.material_management.vo.RequestSignUpVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/getWorkClasses")
    public List<String> getWorkClasses() {
        return this.memberService.getWorkClasses();
    }

    @PostMapping("/signUp")
    public void signUp(@RequestBody final RequestSignUpVO request) {
        this.memberService.signUp(request);
    }
}
