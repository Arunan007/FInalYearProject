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
    $.get(portalUrl+":"+portalPortNumber+"/api/Participants", function(data, status){
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
    var addProductDataJson = {}
    var proId=jQuery('#addProductIdField').val();
    var proName=jQuery('#addProductNameField').val();
    var proOwner=jQuery('#addProductOwnerField').val();
    var proDesc=jQuery('#addProductDescriptionField').val();
    var proAmount=jQuery('#addProductAmountField').val();
    var proLati=jQuery('#addProductLatitudeField').val();
    var proLongi=jQuery('#addProductLongitudeField').val();
    if(proId != "" && proDesc!= "" && proName!="" &&  proOwner!="" && proAmount!="" && proLati!="" && proLongi!=""){
        addProductDataJson["productId"]=proId;
        addProductDataJson["productName"]=proName;
        addProductDataJson["productOwner"]=proOwner;
        addProductDataJson["productAmount"]=proAmount;
        addProductDataJson["productLatitude"]=proLati;
        addProductDataJson["productLongitude"]=proLongi;
        addProductDataJson["productDesc"]=proDesc;
    }
    else{
        alert("Please provide all the input");
    }
}