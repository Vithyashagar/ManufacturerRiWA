$(document).ready(function(){
	
	if ($("#alertSuccess").text().trim() == "")	{
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

//SAVE
$(document).on("click", "#btnSave", function(event){
	
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateForm();
	
	if (status != true){
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid------------------------
	var type = ($("#hidManuIDSave").val() == "") ? "POST" : "PUT";
	$.ajax({
		url : "ManufacturerAPI",
		type : type,
		data : $("#formManufacturer").serialize(),
		dataType : "text",
		complete : function(response, status){
			onServiceSaveComplete(response.responseText, status);
		}
	});
});


function onServiceSaveComplete(response, status){
	
	if (status == "success"){
		var resultSet = JSON.parse(response);

		if (resultSet.status.trim() == "success"){
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} 
		
		else if (resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}
	
	else if (status == "error"){	
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	}
	
	else{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	
	$("#hidManuIDSave").val("");
	$("#formManufacturer")[0].reset();
}


$(document).on("click", ".btnUpdate", function(event){
	
	$("#hidManuIDSave").val($(this).data("sid"));
	$("#serviceName").val($(this).closest("tr").find('td:eq(0)').text());
	$("#serviceSpecialty").val($(this).closest("tr").find('td:eq(1)').text());
	$("#serviceDesc").val($(this).closest("tr").find('td:eq(2)').text());
	$("#ManuID").val($(this).closest("tr").find('td:eq(3)').text());
});


$(document).on("click", ".btnRemove", function(event){
	
	$.ajax({
		url : "ManufacturerAPI",
		type : "DELETE",
		data : "SID=" + $(this).data("sid"),
		dataType : "text",
		complete : function(response, status){
			onItemDeleteComplete(response.responseText, status);
		}
	});
});


function onItemDeleteComplete(response, status){
	if (status == "success"){
		
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success"){
			
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} 
		else if (resultSet.status.trim() == "error"){
		
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} 
	
	else if (status == "error"){
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} 
	else{
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// CLIENT-MODEL================================================================
function validateForm(){
	// CODE
	if ($("#serviceName").val().trim() == ""){
		return "Insert Service Name.";
	}
	// NAME
	if ($("#serviceSpecialty").val().trim() == ""){
		return "Insert Specialty.";
	}
	
	// PRICE-------------------------------
	if ($("#serviceDesc").val().trim() == ""){
		return "Insert Service Description.";
	}
		
	// DESCRIPTION------------------------
	if ($("#ManuID").val().trim() == ""){
		return "Insert Manufacturer ID.";
	}
	return true;
}