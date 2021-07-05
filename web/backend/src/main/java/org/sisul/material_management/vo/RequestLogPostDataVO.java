package org.sisul.material_management.vo;

import lombok.*;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RequestInsertLogVO {
    private LogSrc src;
    private LogDst dst;

    @Data
    @With
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LogSrc {
        private String logTime;
        private String workClass;
        private String workerName;
        private String category;
        private String item;
        private Integer inOut;
        private Integer count;
        private String unit;
        private String file1;
        private String file2;
        private String file3;
    }

    @Data
    @With
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LogDst {
        private String logTime;
        private String workClass;
        private String workerName;
        private String category;
        private String item;
        private Integer inOut;
        private Integer count;
        private String unit;
    }
}
