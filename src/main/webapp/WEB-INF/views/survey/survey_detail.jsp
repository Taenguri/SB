<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div>
    <article class="admin_con">
        <h4 class="main_tit">설문 관리</h4>
        <div class="sec_box">
            <h3 class="main_sub_tit">HOME / 설문관리</h3>
            <!-- QS GROUP INFO -->
            <h5 class="sub_tit">설문설정</h5>
            <table class="table" id="survey_group_info">
                <tbody id="survey_group_tbody">
                <tr>
                    <th><label for="qs_group_subject">제목</label><span class="must"></span></th>
                    <td colspan="5"><input type="text" class="input99" name="qs_subject" id="qs_group_subject" value="" placeholder="시설명 입력(한글)" required/></td>
                </tr>
                <tr>
                    <th>설문기간<span class="must"></span></th>
                    <td colspan="5">
                        <div class="datepicker_area">
                            <input type="text" name="qs_start_date" id="qs_start_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                            <select name="qs_start_time" id="qs_start_time"></select>
                            <label class="hidden" for="qs_start_date">시작일</label>
                            <label for="qs_start_time">시 부터</label>
                            <label class="hidden" for="qs_end_date">마감일</label>
                            <input type="text" name="qs_end_date" id="qs_end_date" class="datepicker0" value="" placeholder="달력에서 날짜 선택" required disabled/>
                            <select name="qs_end_time" id="qs_end_time"></select>
                            <label for="qs_end_time">시 까지</label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>사용여부<span class="must"></span></th>
                    <td colspan="5"><div id="use_yn_div"></div></td>
                </tr>
                </tbody>
            </table>
            <div class="btn_area center"><input type="button" name="add_row_btn" id="add_row_btn" class="btn bg_deep mt10" value="추가"/></div>
            <div id="survey_info_div">
                <!-- QS INFO -->
                <h5 class="sub_tit">설문항목</h5>
                <table class="table mt20" name="survey_info" id="survey_info0">
                    <colgroup>
                        <col width="13%">
                        <col width="12%">
                        <col width="31%">
                        <col width="12%">
                        <col width="32%">
                    </colgroup>
                    <tbody>
                    <tr>
                        <th rowspan="5">설문항목<span class="must"></span></th>
                        <td><label for="qs_subject0">질문</label><span class="must"></span></td>
                        <td colspan="3"><input type="text" class="input70" id="qs_subject0" value="" required/>
                            <input type='button' class='btn bg_secondery' name='temp_remove_btn' value='삭제' />
                            <input type='button' class='btn bg_secondery' name='temp_up_btn' value='위로' />
                            <input type='button' class='btn bg_secondery' name='temp_down_btn' value='아래로' />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="qs_item0_1">답변1</label><span class="must"></span></td>
                        <td><input type="text" class="input99" id="qs_item0_1" value="" required/></td>
                        <td><label for="qs_item0_2">답변2</label><span class="must"></span></td>
                        <td><input type="text" class="input99" id="qs_item0_2" value="" required/></td>
                    </tr>
                    <tr>
                        <td><label for="qs_item0_3">답변3</label></td>
                        <td><input type="text" class="input99" id="qs_item0_3" value="" /></td>
                        <td><label for="qs_item0_4">답변4</label></td>
                        <td><input type="text" class="input99" id="qs_item0_4" value="" /></td>
                    </tr>
                    <tr>
                        <td><label for="qs_item0_5">답변5</label></td>
                        <td><input type="text" class="input99" id="qs_item0_5" value="" /></td>
                        <td><label for="qs_item0_6">답변6</label></td>
                        <td><input type="text" class="input99" id="qs_item0_6" value="" /></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="btn_area center mt50">
                <input type="button" name="move_back_btn" id="move_back_btn" class="btn bg_deep_line" value="목록"/>
                <input type="button" name="remove_btn" id="remove_btn" class="btn bg_deep_line" value="삭제"/>
                <input type="button" name="save_btn" id="save_btn" class="btn bg_deep" value="저장"/>
                <input type="hidden" name="page_type" id="page_type" value="${PAGE_TYPE}"/>
                <input type="hidden" name="qs_group_key" id="qs_group_key" value="${QS_GROUP_KEY}"/>
                <input type="hidden" name="remove_info_list" id="remove_info_list" value=""/>
            </div>
        </div> <!-- // sec_box -->
    </article>
</div>
<script type="application/javascript" src="<c:url value="/js/views/survey/survey_detail.js"/> "></script>