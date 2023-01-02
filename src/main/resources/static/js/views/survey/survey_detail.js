const SurveyListController = (function () {
    const BASE_URL = getContextPath() + "/survey";
    const Elements = (function() {
        const pageType = document.getElementById("page_type");
        const qsStartTime = document.getElementById("qs_start_time");
        const qsEndTime = document.getElementById("qs_end_time");
        const useYnDiv = document.getElementById("use_yn_div");
        const addRowBtn = document.getElementById("add_row_btn");
        const moveBackBtn = document.getElementById("move_back_btn");
        const removeBtn = document.getElementById("remove_btn");
        const saveBtn = document.getElementById("save_btn");
        return {
            pageType,
            qsStartTime,
            qsEndTime,
            useYnDiv,
            addRowBtn,
            moveBackBtn,
            removeBtn,
            saveBtn
        }
    })();


    /* 질문 추가 */
    function addQuestionTemplate(e) {
        let _this = e.target;
        SurveyTemplateController.createTemplate(_this);
    }

    function setDatePicker() {
        new DatePicker("#qs_start_date", { id: "datepicker" });
        new DatePicker("#qs_end_date", { id: "datepicker" });
    }

    function setEventListener() {
        document.addEventListener("click", function (e){
            if(e.target === Elements.addRowBtn) {
                addQuestionTemplate(e);
            } else if(e.target === Elements.moveBackBtn) {
                window.location.href = BASE_URL + "/";
            } else if(e.target === Elements.saveBtn) {
                //saveQuestionTemplate();
            } else if(e.target === Elements.removeBtn) {
                //deleteSurveyInfo();
            }
        })
    }

    function init() {
        Elements.useYnDiv.innerHTML = ToggleController.CreateToggleEl("checkbox", "use_yn");
        setDatePicker();
        createSelectTimeBox("qs_start_time", null);
        createSelectTimeBox("qs_end_time", null);

        setEventListener();
    }
    return {
        init
    }

})();
SurveyListController.init();
