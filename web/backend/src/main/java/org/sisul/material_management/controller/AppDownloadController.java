package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

@Slf4j
@RestController
@RequestMapping("/app/download")
@RequiredArgsConstructor
public class AppDownloadController {
    @GetMapping("/sisul-android.apk")
    public void downloadAndroid(final HttpServletResponse response) throws IOException {
        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader("Content-Transfer-Encoding", "binary;");
        response.setHeader("Content-Disposition", "attachment; filename=\"서울시설공단 응급보수자재관리.apk\"");
        FileInputStream fileInputStream = new FileInputStream(new File("/sisul/files/서울시설공단 응급보수자재관리.apk"));
        OutputStream outputStream = response.getOutputStream();
        FileCopyUtils.copy(fileInputStream, response.getOutputStream());
        outputStream.flush();
        outputStream.close();
        fileInputStream.close();
    }
}
