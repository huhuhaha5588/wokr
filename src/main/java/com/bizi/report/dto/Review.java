package com.bizi.report.dto;

import lombok.Data;

/**
 * Created by guofangbi on 2017/3/21.
 */
@Data
public class Review {
    private Integer id;
    private String taskId;//������
    private String docAame;//�ĵ�����
    private String docType;//�ĵ�����
    private Integer bugNo;//�����������
    private String reviewIdea;//������������
    private String reviewer;//�μ�������Ա
    private String reviewWay;//����ʽ
    private String startDate;//����ʼ����
    private Integer reviewHour;//������ʱ����ʱ��
    private String conclusion;//�������
    private String endDate;//�����������
    private String developer;//������
    private String remark;//����������������
    private String createDate;//��������
}
