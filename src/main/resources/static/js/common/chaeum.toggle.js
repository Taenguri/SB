ToggleController = (function() {

    function CreateToggleEl(input_type, id, checked) {
        let labelEl = document.createElement("label");
        let inputEl = document.createElement("input");
        let spanEl = document.createElement("span");
        let convertHtml;

        labelEl.for = id;
        labelEl.classList.add("switch-button");

        inputEl.id = id;
        inputEl.type = input_type;
        inputEl.name = "toggle_chk";
        inputEl.classList.add("toggle_chk");

        if(checked === "Y") {
            inputEl.setAttribute("checked","true");
        }

        spanEl.classList.add("onoff-switch");

        labelEl.append(inputEl);
        labelEl.append(spanEl);

        convertHtml = labelEl.outerHTML;

        return convertHtml;
    }

    function setEventListener(target, event) {
        let toggleFn = event;
        Array.from(document.querySelectorAll(target)).forEach(function(el){
            toggleFn(el);
        });
    }

    function init() {

    }

    return {
        init,
        CreateToggleEl,
        setEventListener
    }
})();

ToggleController.init();