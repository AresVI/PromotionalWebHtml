
var certification = (function () {

	var traceability_audit_empthy = {
    "id": 0,
    "name": "",
    "creationDate": "",
    "company": {
      "id": 0,
      "name": "--",
      "identifier": "xx-xxxxxxxx-x"
    },
    "category": ""
  };
  var company_identifier = "";
  const BASE_API_URL = "http://165.227.89.229:8080/api/search_result/"

  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = decodeURIComponent(window.location.search.substring(1)),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : sParameterName[1];
          }
      }
  };

  var getCompanyIdentifier = function () {

      company_identifier = getUrlParameter('company');

  }

  var getTraceabilityAudit = function () {

    if (company_identifier != ""){

      var jqxhr = $.get( BASE_API_URL + company_identifier , function(data, textStatus, jqXHR ) {
        showResult(data);
        console.log(textStatus);
      })
        .fail(function() {
          showResult(traceability_audit_empthy);
        });

    }else{
      showResult(traceability_audit_empthy);
    }

  }

  var getFormattedDate = function (date) {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
  }

  var showResult = function (traceability_audit) {

      $('#certification_company_identification').text('C.U.I.T. ' + traceability_audit.company.identifier);

      $('#certification_company_name').text(traceability_audit.company.name);

      $('#certification_category').text('Categoría' + traceability_audit.category);

      if (traceability_audit.creationDate != "") {
        $('#certification_date').text('Fecha de Auditoría: ' + getFormattedDate(new Date(traceability_audit.creationDate)));
      } else {
        $('#certification_date').text('Fecha de Auditoría');
      }


  }

  var listenerDowndloadWidget = function(){
    $("#download_widget").on("click", function(){
      $("#download_widget_modal").modal("show");
    });
  }

  var init = function() {

    getCompanyIdentifier();

    getTraceabilityAudit();

    listenerDowndloadWidget();

  }

	return {
      init: init()
  }

}());
