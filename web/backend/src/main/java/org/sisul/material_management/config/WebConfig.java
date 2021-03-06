package org.sisul.material_management.config;

import lombok.RequiredArgsConstructor;
import org.sisul.material_management.utils.MailUtils;
import org.sisul.material_management.utils.MessageUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final MessageSource messageSource;

    @Bean
    public MessageUtils messageUtils() {
        MessageUtils messageUtils = new MessageUtils();
        messageUtils.setMessageSource(this.messageSource);
        return messageUtils;
    }

    @Bean
    public MailUtils mailUtils(JavaMailSender javaMailSender) {
        MailUtils mailUtils = new MailUtils();
        mailUtils.setMailSender(javaMailSender);
        return mailUtils;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
