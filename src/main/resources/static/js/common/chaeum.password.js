function CSPassword(pwId, showTextId, pwConfirmId, confimShowTextId, prevPwId, prevShowTextId) { 
    this.password = document.getElementById(pwId);
    this.passwordConfirm = document.getElementById(pwConfirmId);
	this.showText = document.getElementById(showTextId);
	this.confirmShowText = document.getElementById(confimShowTextId);
	this.prevPassword = document.getElementById(prevPwId);
	this.prevShowText = document.getElementById(prevShowTextId);
	this.prevStatus = false;
    this.status = false;
    this.confirmStatus = false;
    this.MAX_LEN = 16;
    this.MSG = "비밀번호는 영문,숫자 1자 이상, 특수문자 1자 이상 조합하여 8자리 이상 16자리 이하로 입력해 주십시오.";
}


CSPassword.prototype.expressionKeyDown = function() {
    let passwordValue = "";
    let engNumSpeExp  = /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\]).*$/; // 영문, 숫자, 특수문자
    let engNumExp     = /^.*(?=.{10,15})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; // 숫자, 영문
    let speEngExp     = /^.*(?=.{10,15})(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\])(?=.*[a-zA-Z]).*$/; // 특수문자, 영문
    let speNumExp     = /^.*(?=.{10,15})(?=.*[0-9])(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\]).*$/; // 특수문자, 숫자

	let showTextID = this.showText;
	let passwordID = this.password;
	let passwordConfirmID = this.passwordConfirm;
	let chackMSG = this.MSG;
    let prevShowText = this.prevShowText;

    var labelText = getLabelText(passwordID.getAttribute("id"));

    this.password.setAttribute("maxlength", this.MAX_LEN);
    this.password.addEventListener("keyup", function(e) {
        passwordValue = this.value;
        if ( passwordValue ) {
			var hasAll = engNumSpeExp.test(passwordValue);
            let hasTwo = engNumExp.test(passwordValue) || speEngExp.test(passwordValue) || speNumExp.test(passwordValue);

			if ( hasAll ) {
                if(!isNull(prevShowText) && prevShowText.getAttribute("target") && !prevShowText.parentNode.querySelector("input").hasAttribute("disabled") ) {
                    prevPasswordCheck(showTextID, {
                        "manager_password": sha256_digest(this.value),
                        "manager_id": prevShowText.getAttribute("target"),
                        "explain_id": prevShowText.id
                    });
                } else {
                    showTextID.style.color = "#0000FF";
                    showTextID.innerHTML = "양호";
                    this.status = true;
                }
			} else {
                showTextID.style.color = "#FF0000";
                showTextID.innerHTML  = chackMSG;
                this.status = false;
			}
        } else {
        	showTextID.style.color = "#FF0000";
        	showTextID.innerHTML  = labelText + "를 입력해 주십시오.";
            this.status = false;
        }
    });
}

function prevPasswordCheck(showTextID, dataObject) {
    commonAjax(getContextPath() + "/manager/account/password", "POST", dataObject, true, function (res) {
        if (res.result === "success") {
            showTextID.style.color = "#0000FF";
            showTextID.innerHTML = "기존 비밀번호 일치";
            this.status = true;
        } else if(showTextID.getAttribute("target")){
            showTextID.style.color = "#FF0000";
            showTextID.innerHTML = "기존 비밀번호 불일치";
            this.status = true;
        } else {
            showTextID.style.color = "#0000FF";
            showTextID.innerHTML = "양호";
            this.status = true;
        }
    }, false);
}

/**
 * 비밀번호 규칙이 올바른지를 리턴한다.
 *
 * @return true/false
 */
CSPassword.prototype.isValid = function() {
    if (!this.status) {
        alert(getLabelText(this.password.getAttribute("id")) + "는 " + this.MSG);
        this.password.focus();
    }
    return this.status;
}

/**
 * 비밀번호와 비밀번호확인을 blur, keyup 이벤트를 통해 같은지 여부를 체크한다.
 */
CSPassword.prototype.passwordConfirmBlur = function() {
	let passwordID = this.password;
	let passwordConfirmID = this.passwordConfirm;
	let prevPasswordID = this.prevPassword;
	let confirmShowTextID = this.confirmShowText;
	
    this.passwordConfirm.setAttribute("maxlength", this.MAX_LEN);

	var labelText = getLabelText(passwordConfirmID.getAttribute("id"));
	
    let passwordCheckEvent = function () {
		if (passwordConfirmID.value.length > 0) {
			if (passwordID.value == passwordConfirmID.value) {
				confirmShowTextID.style.color = "#0000FF";
				confirmShowTextID.innerHTML  = "일치";
				prevStatus = true;
				confirmStatus = true;
			} else {
				confirmShowTextID.style.color = "#FF0000";
				confirmShowTextID.innerHTML  = "비밀번호가 일치하지 않습니다.";
				prevStatus = true;
				confirmStatus = false;
			}
		} else if(!isNull(passwordID.value)){
			confirmShowTextID.style.color = "#FF0000";
			confirmShowTextID.innerHTML  = labelText + "을 입력해 주십시오.";
			prevStatus = true;
			confirmStatus = false;
		}
    };

    this.password.addEventListener("blur", passwordCheckEvent);
    this.password.addEventListener("keyup", passwordCheckEvent);
    this.passwordConfirm.addEventListener("blur", passwordCheckEvent);
    this.passwordConfirm.addEventListener("keyup", passwordCheckEvent);
}

/**
 * 비밀번호와 비밀번호확인을 확인버튼을 통해 같은지 여부를 체크한다.
 */
CSPassword.prototype.passwordConfirmClick = function() {
    this.passwordConfirm.setAttribute("maxlength", this.MAX_LEN);
    if (this.passwordConfirm.value) {
        this.confirmStatus = this.password.value === this.passwordConfirm.value;
    } else {
        this.confirmStatus = false;
    }
    return this.confirmStatus;
}

/**
 * 정규식을 통하여 비밀번호 규칙을 검사한다.
 */
CSPassword.prototype.expressionClick = function() {
    let passwordValue = this.password.value;
    let engNumSpeExp  = /^.*(?=.{8,15})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\]).*$/; // 영문, 숫자, 특수문자
    let engNumExp     = /^.*(?=.{10,15})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; // 숫자, 영문
    let speEngExp     = /^.*(?=.{10,15})(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\])(?=.*[a-zA-Z]).*$/; // 특수문자, 영문
    let speNumExp     = /^.*(?=.{10,15})(?=.*[0-9])(?=.*[!@\#$%<>^&*\()\-=+\',.`";:<>/?\[\]\-\\+_=|\\]).*$/; // 특수문자, 숫자

    this.password.setAttribute("maxlength", this.MAX_LEN);
    if (!isNull(passwordValue)) {
        let hasTwo = engNumExp.test(passwordValue) || speEngExp.test(passwordValue) || speNumExp.test(passwordValue);
        if ( engNumSpeExp.test(passwordValue) ) this.status = true;
        else this.status = hasTwo;
    } else {
        this.status = false;
    }
}

/**
 * 비밀번호와 비밀번호확인이 일치하는지 여부를 리턴한다.
 */
CSPassword.prototype.equals = function() {
    if (!this.confirmStatus) {
        alert(getLabelText(this.password.getAttribute("id")) + "가 일치하지 않습니다.");
        this.passwordConfirm.focus();
    }
    return this.confirmStatus;
}

/**
 * 비밀번호 입력박스 초기화를 수행한다.
 */
CSPassword.prototype.initPassword = function() {
    this.password.value = "";
    this.passwordConfirm.value = "";
	this.showText.innerHTML = "";
	this.confirmShowText.innerHTML = "";	
	this.prevPassword.value = "";
	this.status = false;
	this.confirmStatus = false;	
	this.prevStatus = false;
}

CSPassword.prototype.chkPasswd = function() {
	let pw1 = this.password.value;
	let pw2 = this.passwordConfirm.value;
    let pw3 = this.prevShowText;
    if ( pw3 ) {
        if( pw3.textContent === "비밀번호 불일치") {
            alert("기존 비밀번호가 불일치 합니다.");
            return false;
        }else if(this.password !== this.prevPassword && pw3.parentNode.querySelector("input").value === pw1 ){
            alert("기존 비밀번호가 일치 합니다.");
            return false;
        }
    }
    if (pw1 !== pw2) {
    	alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    	this.password.focus();
		return false;
    }
    if (pw1.length < 8 || pw1.length > 20) {
    	alert("비밀번호의 길이는 8~16까지 입니다.");
    	this.password.focus();
		return false;
	}
    var isalpha = 0;
    var isnumber = 0;
    for (var i = 0; i < pw1.length; i++) {
        var chr = pw1.substr(i, 1);
        if ((chr >= 'a' && chr <= 'z') || (chr >= 'A' && chr <= 'Z')) {
            isalpha += 1;
        } else {
            isnumber += 1;
        }
    }
    var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var number = "1234567890";
    var sChar = "-_=+\|(){}[]*&^%$#@!~`?></;,.:'";
    var sChar_Count = 0;
    var alphaCheck = false;
    var numberCheck = false;
    var len = pw1.length;
    var sCh = '';
    var cnt = 0;
    for (var t = 0; t < len; t++) {
        if (sChar.indexOf(pw1.charAt(t)) != -1) {
            sChar_Count++;
        }
        if (alpha.indexOf(pw1.charAt(t)) != -1) {
            alphaCheck = true;
        }
        if (number.indexOf(pw1.charAt(t)) != -1) {
            numberCheck = true;
        }
    }
    if (sChar_Count < 1 || alphaCheck != true || numberCheck != true) {
    	alert("비밀번호는 8~16자 영문,숫자 1자 이상,특수문자 1자 이상으로 조합해주세요");
    	return false; 
    }
    for (var k = 0; k < len; k++) {
        sCh = pw1.charAt(k);
        if (sCh == pw1.charAt(k + 1)) {
            cnt++;
        }
    }
    if (cnt > 2) {
		alert("비밀번호는 연속된 문자(숫자)를 사용하실수 없습니다.");
		this.password.focus();
		return false;		
    }
    var qwerty = "qwertyuiopasdfghjklzxcvbnm";
    var alpha1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var alpha2 = "abcdefghijklmnopqrstuvwxyz";
    var start = 3;
    var seq = "_" + pw1.slice(0, start);
    var numseq = "0" + pw1.slice(0, start);
    for (t = 3; t < len; t++) {
        seq = seq.slice(1) + pw1.charAt(t);
        if (qwerty.indexOf(seq) > -1) { 
    		alert("비밀번호는 연속된 문자(숫자)를 사용하실수 없습니다.");
    		this.password.focus();
    		return false;
        }
    }
    for (t = 3; t < len; t++) {
        numseq = numseq.slice(1) + pw1.charAt(t);
        if (number.indexOf(numseq) > -1) {
    		alert("비밀번호는 연속된 문자(숫자)를 사용하실수 없습니다.");
    		this.password.focus();
    		return false;
        }
    }
    for (t = 3; t < len; t++) {
        seq = seq.slice(1) + pw1.charAt(t);
        if (alpha1.indexOf(seq) > -1) {
    		alert("비밀번호는 연속된 문자(숫자)를 사용하실수 없습니다.");
    		this.password.focus();
    		return false;
        }
    }
    for (t = 3; t < len; t++) {
        seq = seq.slice(1) + pw1.charAt(t);
        if (alpha2.indexOf(seq) > -1) {
    		alert("비밀번호는 연속된 문자(숫자)를 사용하실수 없습니다.");
    		this.password.focus();
    		return false;
        }
    }
    return true;
}

CSPassword.prototype.prevPwKeyDown = function() {
	let prevShowTextID = this.prevShowText.getAttribute("id");
    let managerId = this.prevShowText.getAttribute("target");
    this.prevPassword.addEventListener("keyup", function(e) {
    	let dataObject = {
    		"manager_password" : sha256_digest(this.value),
    		"manager_id" : managerId,
            "explain_id" : prevShowTextID
    	};
    	commonAjax(getContextPath() + "/manager/account/password", "POST", dataObject, true,prevPwKeyDownAfterAction,false);
    });
}

function prevPwKeyDownAfterAction(response) {
    if(response.result === "error") {
        document.getElementById(response.EXPLAIN_ID).style.color = "#FF0000";
        document.getElementById(response.EXPLAIN_ID).innerHTML  = "비밀번호 불일치";
        return false;
    } else {
        document.getElementById(response.EXPLAIN_ID).style.color = "#0000FF";
        document.getElementById(response.EXPLAIN_ID).innerHTML  = "비밀번호 일치";
		return true;
	}
}
