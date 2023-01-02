<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>글 등록</title>
</head>
<body>
<div>
    <input type="text" id="title" class="input_1" placeholder="제목">
    <textarea placeholder="내용"></textarea>
</div>
<script type="application/javascript" src="<c:url value="/js/views/board/insert.js" />"></script>


</body>
</html>

