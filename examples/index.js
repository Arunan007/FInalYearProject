/* Global Value Declaration Starts */
var portalUrl = "http://arun-pt3004";
var portalPortNumber = "3000";
/* Global Value Declarartion Ends */

/* Binding Events starts*/
jQuery(document).ready(function() { 
    jQuery('#productsList').click(function(){
        getProductsResponse();
    });
    jQuery('#participantsList').click(function(){
        getCustomerResponse();
    });
    jQuery('#moveProduct').click(function(){
        getMoveProductResponse();
    });
});
/* Binding Events ends */

function getProductsResponse(){
    $.get(portalUrl+":"+portalPortNumber+"/api/Product", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });
}
function getCustomerResponse(){
    $.get(portalUrl+":"+portalPortNumber+"/api/Product", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });
}
function getMoveProductResponse(){
    $.get(portalUrl+":"+portalPortNumber+"/api/Product", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
      });
}
function loadDataforDashboard(){
    $.get(portalUrl+":"+portalPortNumber+"/api/Customer", function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        jQuery('#partcipantsCount').html(data.length);
      });
      $.get(portalUrl+":"+portalPortNumber+"/api/Product", function(data, status){
        // alert("Data: " + data + "\nStatus: " + status);
        jQuery('#productCountinDashboard').html(data.length);
      });
    getAllTransactions();
}
function getAllTransactions(){
     $.get(portalUrl+":"+portalPortNumber+"/api/system/historian", function(data, status){
        for(var i=0;i<5;i++){
            var transactionType =  data[i].transactionType.split(".")[data[i].transactionType.split('.')["length"]-1];
            var timeStamp = data[i].transactionTimestamp;
            var transactionId = data[i].transactionId;
            if(data[i].hasOwnProperty("participantInvoking")){
                var particantType =  data[i].participantInvoking.split(".")[data[i].participantInvoking.split(".")["length"]-1];
            }
            else{
                var particantType = 'SYSTEM CREATED';
            }
            var $row = '<tr>\
                            <td>'+transactionType+'</td>\
                            <td>'+particantType+'</td>\
                            <td>'+timeStamp+'</td>\
                            <td><i class="fas fa-arrow-up text-success mr-3"></i>'+transactionId+'</td>\
                        </tr>'
            jQuery('#transactionsTableBody').append($row);
        }      
        jQuery("#transactionCountinDashboard").html(data.length);
    });
}
function getAllTransactionsPAGE(){
    $.get(portalUrl+":"+portalPortNumber+"/api/system/historian", function(data, status){
        for(var i=0;i<data.length;i++){
            var transactionType =  data[i].transactionType.split(".")[data[i].transactionType.split('.')["length"]-1];
            var timeStamp = data[i].transactionTimestamp;
            var transactionId = data[i].transactionId;
            if(data[i].hasOwnProperty("participantInvoking")){
                var particantType =  data[i].participantInvoking.split(".")[data[i].participantInvoking.split(".")["length"]-1];
            }
            else{
                var particantType = 'SYSTEM CREATED';
            }
            var $row = '<tr>\
                            <td><i class="fas fa-arrow-up text-success mr-3"></i>'+transactionType+'</td>\
                            <td>'+particantType+'</td>\
                            <td>\
                                <span class="badge badge-dot mr-4"><i class="bg-success"></i><span class="status">'+timeStamp+'</span></span>\
                            </td>\
                            <td>'+transactionId+'</td>\
                        </tr>'
            jQuery('#transactionsTableBody').append($row);
        }      
    });
}
function getAllProducts(){
    $.get(portalUrl+":"+portalPortNumber+"/api/system/Product", function(data, status){
        for(var i=0;i<data.length;i++){
            var proId =  data[i].productId;
            var proName = data[i].producttype;
            var amount = data[i].amount;
            var lati = data[i].latitude;
            var longi = data[i].longitude;
            var description = data[i].description;
            var owner = data[i].owner;
            var issuer = data[i].issuer;
            var $row = '<tr>\
                            <td>'+proId+'</td>\
                            <td>'+proName+'</td>\
                            <td>Rs.'+amount+'</td>\
                            <td>'+lati+'</td>\
                            <td>'+longi+'</td>\
                            <td>'+owner+'</td>\
                            <td>'+issuer+'</td>\
                            <td>'+description+'</td>\
                        </tr>'
            jQuery('#productsTableBody').append($row);
        }      
    });
}
function getAllParticipants(){
    $.get(portalUrl+":"+portalPortNumber+"/api/system/Product", function(data, status){
        for(var i=0;i<data.length;i++){
            var proId =  data[i].productId;
            var proName = data[i].producttype;
            var amount = data[i].amount;
            var lati = data[i].latitude;
            var longi = data[i].longitude;
            var description = data[i].description;
            var owner = data[i].owner;
            var issuer = data[i].issuer;
            var $row = '<tr>\
                            <td>'+proId+'</td>\
                            <td>'+proName+'</td>\
                            <td>Rs.'+amount+'</td>\
                            <td>'+lati+'</td>\
                            <td>'+longi+'</td>\
                            <td>'+owner+'</td>\
                            <td>'+issuer+'</td>\
                            <td>'+description+'</td>\
                        </tr>'
            jQuery('#productsTableBody').append($row);
        }      
    });
}
function tableToggleDarkOrLightMode(id){
    if(jQuery('#tableThemeMode')[0].checked==false){
        jQuery('#'+id).addClass('bg-default shadow');
        jQuery('#tableThemeCardHeader').addClass('bg-transparent');
        jQuery('#tableThemeCardHeader h3').addClass('text-white');
        jQuery('#thead-id').removeClass('thead-light').addClass('thead-dark');
        jQuery('#tableId').addClass('table-dark');
    }
    if(jQuery('#tableThemeMode')[0].checked==true){
        jQuery('#'+id).removeClass('bg-default shadow');
        jQuery('#tableThemeCardHeader').removeClass('bg-transparent');
        jQuery('#tableThemeCardHeader h3').removeClass('text-white');
        jQuery('#thead-id').addClass('thead-light').removeClass('thead-dark');
        jQuery('#tableId').removeClass('table-dark');
    }
}
function showAddProductForm(){
    jQuery('#productsTableDivCard').hide();
    jQuery('#addProductForm').show();
    getLocation();
}
function showAddParticipantForm(){
    jQuery('#participantTableDivCard').hide();
    jQuery('#addParticipantForm').show();
}
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      alert("Geolocation is not supported by this browser. Try adding Manually!");
    }
}
function showPosition(position) {
    jQuery('#addProductLatitudeField').val(position.coords.latitude);
    jQuery('#addProductLongitudeField').val(position.coords.longitude);
  }
function addProductFormData(){
    var addProductDataJson = {
        "$class" : "org.example.mynetwork.Product"
    }
    var proId=jQuery('#addProductIdField').val();
    var proName=jQuery('#addProductNameField').val();
    var proOwner=jQuery('#addProductOwnerField').val();
    var proDesc=jQuery('#addProductDescriptionField').val();
    var proAmount=jQuery('#addProductAmountField').val();
    var proLati=jQuery('#addProductLatitudeField').val();
    var proLongi=jQuery('#addProductLongitudeField').val();
    if(proId != "" && proName!="" &&  proOwner!="" && proAmount!="" && proLati!="" && proLongi!="" && proId.trim()!= "" && proName.trim()!="" &&  proOwner.trim()!="" && proAmount.trim()!="" && proLati.trim()!="" && proLongi.trim()!=""){
        addProductDataJson["productId"]=proId;
        addProductDataJson["producttype"]=proName;
        addProductDataJson["amount"]=proAmount;
        addProductDataJson["latitude"]=proLati;
        addProductDataJson["longitude"]=proLongi;
        addProductDataJson["owner"]=proOwner;
        addProductDataJson["issuer"]=" ";
        addProductDataJson["description"]=proDesc;
        console.log(addProductDataJson);
        $.post(portalUrl+":"+portalPortNumber+"/api/Product", addProductDataJson, function(result){
            alert(result);
          })
          .fail(function(){
              alert("Product Id already Exists!")
          });
    }
    else{
        alert("Please provide all the input");
    }   
}
function addParticipantFormData(){
    var addParticipantDataJson = {
        "$class" : "org.example.mynetwork.Participant"
    }
    var parEmail = jQuery("#addParticipantEmailField").val();
    var parFname = jQuery("#addPaticipantFnameField").val();
    var parLname = jQuery("#addPaticipantLnameField").val();
    var parDesc = jQuery("#addParticipantDescriptionField").val();
    if(parEmail != "" && parFname!="" &&  parLname!="" && parEmail.trim()!="" && parFname.trim()!="" && parLname.trim()!=""){
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(parEmail)) {
          alert("Enter the valid Email address");
        }else{
            addParticipantDataJson["email"] = parEmail;
            addParticipantDataJson["firstname"] = parFname;
            addParticipantDataJson["lastname"] = parLname;
            addParticipantDataJson["description"] = parDesc;
            console.log(addParticipantDataJson);
            $.post(portalUrl+":"+portalPortNumber+"/api/Product", addParticipantDataJson, function(result){
                alert(result);
              })
              .fail(function(){
                  alert("Email Id already Exists!")
              });
        }
    }
    else{
        alert("Please provide all the input");
    }   
}
