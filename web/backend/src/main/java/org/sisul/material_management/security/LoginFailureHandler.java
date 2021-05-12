package org.sisul.material_management.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.repository.MemberRepository;
import org.sisul.material_management.utils.MessageUtils;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class LoginFailureHandler implements AuthenticationFailureHandler {
    private final MemberRepository memberRepository;

    @Transactional
    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        String errorMsg = exception.getMessage();

        if (exception instanceof UsernameNotFoundException)
            errorMsg = MessageUtils.getMessage("auth.error.UsernameNotFound");
        else if (exception instanceof BadCredentialsException) {
            String username = request.getParameter("username");

            this.memberRepository.updatePasswordWrongCountByUsername(username);
            if (this.memberRepository.findPasswordWrongCountByUsername(username) == 5)
                this.memberRepository.disableAccountByUsername(username);

            errorMsg = MessageUtils.getMessage("auth.error.BadCredentials");
        } else if (exception instanceof CredentialsExpiredException)
            errorMsg = MessageUtils.getMessage("auth.error.CredentialsExpired");
        else if (exception instanceof DisabledException)
            errorMsg = MessageUtils.getMessage("auth.error.Disabled");
        else if (exception instanceof AccountExpiredException)
            errorMsg = MessageUtils.getMessage("auth.error.AccountExpired");
        else if (exception instanceof LockedException)
            errorMsg = MessageUtils.getMessage("auth.error.Locked");

        response.setCharacterEncoding("utf-8");
        response.getWriter().print(String.format("{ \"errorMsg\": \"%s\" }", errorMsg));
    }
}
