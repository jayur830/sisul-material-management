package org.sisul.material_management.utils;

import org.springframework.context.MessageSource;

import java.util.Locale;

public class MessageUtils {
    private static MessageSource messageSource;

    public void setMessageSource(MessageSource _messageSource) {
        messageSource = _messageSource;
    }

    public static String getMessage(final String code) {
        return getMessage(code, null);
    }

    public static String getMessage(final String code, Object[] objects) {
        return messageSource.getMessage(code, objects, Locale.getDefault());
    }
}
