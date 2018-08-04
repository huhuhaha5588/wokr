package com.bizi.report.dto;

import lombok.Data;

/**
 * Created by guofangbi on 2017/3/21.
 */
@Data
public class Review {
    private Integer id;
    private String taskId;//任务编号
    private String docAame;//文档名称
    private String docType;//文档类型
    private Integer bugNo;//发现问题个数
    private String reviewIdea;//评审问题或意见
    private String reviewer;//参加评审人员
    private String reviewWay;//评审方式
    private String startDate;//评审开始日期
    private Integer reviewHour;//评审用时（人时）
    private String conclusion;//评审结论
    private String endDate;//评审完成日期
    private String developer;//责任人
    private String remark;//评审问题或意见跟踪
    private String createDate;//创建日期
}
