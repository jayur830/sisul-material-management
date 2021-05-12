package kr.co.kesti.wmo.utils;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MailUtils {
    private static JavaMailSender mailSender;

    public void setMailSender(JavaMailSender _mailSender) {
        mailSender = _mailSender;
    }

    public static void sendEmail(final String from, final String to, final String title, final String contents) {
        sendEmail(from, to, title, contents, null, false);
    }

    public static void sendEmail(final String from, final String to, final String title, final String contents, MultipartFile multipartFile) {
        sendEmail(from, to, title, contents, multipartFile, false);
    }

    public static void sendEmail(final String from, final String to, final String title, final String contents, boolean isHTML) {
        sendEmail(from, to, title, contents, null, isHTML);
    }

    public static void sendEmail(final String from, final String to, final String title, final String contents, MultipartFile multipartFile, boolean isHTML) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");

            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject(title);
            helper.setText(contents, isHTML);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
