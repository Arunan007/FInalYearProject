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
    if(jQuery('#tableThemeMode')[0].checked){
        //
    }
}