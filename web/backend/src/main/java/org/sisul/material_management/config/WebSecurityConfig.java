package org.sisul.material_management.config;

import lombok.RequiredArgsConstructor;
import org.sisul.material_management.security.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private final CustomAuthenticationProvider customAuthenticationProvider;
    private final CustomUserDetailsService customUserDetailsService;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.authorizeRequests()
                .antMatchers("*")
                .permitAll();

        http.authenticationProvider(this.customAuthenticationProvider);
        http.userDetailsService(this.customUserDetailsService);

        http.formLogin()
                .loginProcessingUrl("/api/member/login")
                .loginPage("/")
                .successHandler(this.loginSuccessHandler)
                .failureHandler(this.loginFailureHandler)
                .permitAll();

        http.logout()
                .logoutUrl("/api/member/logout")
                .logoutSuccessHandler(this.customLogoutSuccessHandler)
                .invalidateHttpSession(true);
    }
}
