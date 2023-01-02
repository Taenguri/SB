const SurveyListController = (function () {
    const BASE_URL = getContextPath() + "/survey";
    const Elements = (function() {
        const surveyAddBtn = document.getElementById("survey_add_btn");
        const pageType = document.getElementById("page_type");
        return {
            surveyAddBtn,
            pageType
        }
    })();

    function moveAddPage() {
        window.location.href = BASE_URL + "/add";
    }
    function setDatePicker() {
        new DatePicker("#qs_start_date", { id: "datepicker" });
        new DatePicker("#qs_end_date", { id: "datepicker" });
    }

    function setEventListener() {
        Elements.surveyAddBtn.addEventListener("click", moveAddPage);
    }

    function init() {

        setEventListener();
    }
    return {
        init
    }

})();
SurveyListController.init();
