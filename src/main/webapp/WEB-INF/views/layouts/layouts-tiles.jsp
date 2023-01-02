<%@ page pageEncoding="UTF-8" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!doctype html>
<html lang="ko">
<head>
    <link href="<c:url value="/css/datepicker/datepicker.min.css" />" rel="stylesheet" type="text/css" />
    <link href="<c:url value="/css/common.css" />" rel="stylesheet" type="text/css" />
    <link href="<c:url value="/css/toggle.css" />" rel="stylesheet" type="text/css" />
    <link href="<c:url value="/images/favicon.ico" />" rel="shortcut icon" />
    <script src="<c:url value="/js/common/chaeum.common.js" />"></script>
    <script src="<c:url value="/js/datepicker/datepicker.min.js" />"></script>
    <script src="<c:url value="/js/common/chaeum.datepicker.js" />"></script>
    <script src="<c:url value="/js/common/chaeum.toggle.js" />"></script>
</head>

<body>
<input type="hidden" id="ctx" value="${ctx}">
<header>
    <tiles:insertAttribute name="header"/>
    <tiles:insertAttribute name="content"/>
</header>

</body>
</html>