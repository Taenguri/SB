package com.feel.sb.views.main;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
public class MainController {

    @GetMapping(value = "")
    public ModelAndView MainPage(){
        return new ModelAndView("/main/main.sb");
    }
}
