package com.feel.sb.views.survey;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/survey")
public class SurveyController {

    @GetMapping(value = "")
    public ModelAndView SurveyListPage(){
        return new ModelAndView("/survey/survey_list.sb");
    }

    @GetMapping(value = "/add")
    public ModelAndView SurveyAddPage(){
        return new ModelAndView("/survey/survey_detail.sb")
                .addObject("PAGE_TYPE", "INSERT");
    }


}
