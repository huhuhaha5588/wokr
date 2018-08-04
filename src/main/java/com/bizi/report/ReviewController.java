package com.bizi.report;

import com.bizi.report.dao.IReviewDao;
import com.bizi.report.dto.BaseResult;
import com.bizi.report.dto.Review;
import com.bizi.report.dto.PageDTO;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by guofangbi on 2017/3/21.
 */
@RestController
@RequestMapping("/review")
public class ReviewController {
    @Resource
    private IReviewDao reviewDao;

    @RequestMapping("/insert.json")
    public BaseResult<Void> insert(Review review){

        reviewDao.insert(review);
        return new BaseResult<>(true,null);
    }

    @RequestMapping("/query.json")
    public PageDTO<Review> query(Review review){
        PageDTO<Review> result = new PageDTO<>();
        int count = reviewDao.count(review);
        result.setResults(count);
        if(count>0){
            result.setRows(reviewDao.query(review));
        }
        return result;
    }
    @RequestMapping("/update.json")
    public BaseResult<Void> update(Review review){
        reviewDao.update(review);
        return new BaseResult<>(true,null);
    }
}
