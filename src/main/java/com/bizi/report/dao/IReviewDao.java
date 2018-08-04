package com.bizi.report.dao;

import com.bizi.report.dto.Review;
import org.apache.ibatis.annotations.Insert;

import java.util.List;

/**
 * Created by guofangbi on 2017/3/21.
 */
public interface IReviewDao {
    @Insert("insert into review values(null,#{taskId},#{docName},#{docType},#{bugNo},#{reviewIdea},#{reviewer},#{reviewWay},#{startDate},#{reviewHour},#{conclusion},#{endDate},#{developer},#{remark},new())")
    void insert(Review review);

    void update(Review review);

    List<Review> query(Review review);
    int count(Review review);
}
