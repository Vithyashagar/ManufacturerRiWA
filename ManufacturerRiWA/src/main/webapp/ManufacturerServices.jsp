<%@page import = "com.ManufacturerService"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html>
	<head>
		<meta charset="utf-8">
		<meta name = "viewport" content="width=device-width, initial-scale=1" >
		<title>Manufacturer Services</title>
		<link href="Views/bootstrap.min.css" rel="stylesheet">
		<script src="components/jquery-3.4.0.min.js" type ="text/javascript"></script>
		<script src="components/Services.js" type ="text/javascript"></script>
	</head>
	<body>
		<div class ="container">
			<div class ="row">
				<div class ="col">							
					<h1>Manufacturer Management</h1>
					
					<form id="formManufacturer" name="formManufacturer" method="post" action="ManufacturerService.jsp">
						
						Service Name: <input id="serviceName" name="serviceName" type="text" class="form-control form-control-sm"><br>
						
						Service Specialty: <input id="serviceSpecialty" name="serviceSpecialty" type="text" class="form-control form-control-sm"><br>
						
						Service Description: <input id="serviceDesc" name="serviceDesc" type="text" class="form-control form-control-sm"><br>
						
						Manufacturer ID : <input id="ManuID" name="ManuID" type="text" class="form-control form-control-sm"><br>
						
						<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
						<input type="hidden" id="hidManuIDSave" name="hidManuIDSave" value="">
					</form>
					
					<!-- Alert Messages -->
					<div id="alertSuccess" class="alert alert-success"></div>
					<div id="alertError" class="alert alert-danger"></div>

					<br>
					<%
						ManufacturerService ManuObj = new ManufacturerService();
						out.print(ManuObj.readServices());
					%>			
				</div>
			</div>
		</div>
	</body>

	
</html>