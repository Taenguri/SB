package com.feel.sb.views.board;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

    @GetMapping(value = "")
    public ModelAndView BoardListPage(){
        return new ModelAndView("/board/board_list.sb");
    }

    @GetMapping(value = "/insert")
    public ModelAndView BoardInsertPage(){
        return new ModelAndView("/board/insert.sb");
    }
}
