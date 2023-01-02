<%@ page pageEncoding="UTF-8" contentType="text/html; charset=utf-8" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<div>
    <div id="header">
        <a href="${ctx}/">Simple Board</a>
    </div>
    <div id="navbar_menu">
        <a href="${ctx}/survey">설문 관리</a>
        <a href="#">Gallery</a>
        <a href="#">Weddings</a>
        <a href="#">FAQ</a>
        <a href="#">Bookings</a>
    </div>
</div>