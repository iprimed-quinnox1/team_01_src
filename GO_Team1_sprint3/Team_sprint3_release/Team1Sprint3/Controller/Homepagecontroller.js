var app = angular.module("myApp", []);
app.controller("myctrl", function ($scope, $http, $location) {
  $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
    $scope.finalList = response.data;
  });
  $http.get("http://localhost:5000/initializeListCustomerdetails").then(function (response) {
    $scope.default_Add = response.data;
  });
  $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
    $scope.finalListproduct = response.data;
  });

  $scope.productscust = [];
  $scope.showstart = true;
  $scope.Adressedit = true;
 $scope.ob = { "Customer_name": $location.search().key };
  //SEARCH THE PRODUCT AVAILABLE IN PRODUCT LIST
  $scope.Search_items = function () {

    for (var i = 0; i < $scope.finalList.length; i++) {
      if ($scope.finalList[i].pid == $scope.Searched_items) {
        $scope.selectedSearched_items = $scope.Searched_items;
        $scope.showstart = false;
		  $scope.Gotocartshow=true;
		  $scope.changeproduct=false;
		  $scope.show_address=false;
      }
    }

  }
  //ADDING REVIEW
  $scope.Reviewfun = function () {
    $scope.Reviewstart = true;
    $scope.add = { "pid": $scope.Searched_items, "review": { "Reviewname": $scope.Reviewname, "Reviewemail": $scope.Reviewemail, "Reviewarea": $scope.Reviewarea } };
    $http.post("http://localhost:5000/addingreviews", $scope.add).then(function (response) {
      console.log("success");
    });
    $scope.Reviewstart = false;
  }
  //FOR VIEWING REVIEW
  $scope.Viewreview = function () {
    $scope.Viewstart = true;
    $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
      $scope.finalList = response.data;
    });
    for (var i = 0; i < $scope.finalList.length; i++) {
      if ($scope.finalList[i].pid == $scope.Searched_items) {
        $scope.Totalreview = $scope.finalList[i].review;
      }
    }

  }
  //FOR ADDING PRODUCTS IN CART
  $scope.Add_to_cart = function () {
    alert("adding Product");
    for (var i = 0; i < $scope.finalListproduct.length; i++) {
      if ($scope.finalListproduct[i].Customer_name == $location.search().key && $scope.finalListproduct[i].products.Prod == $scope.Searched_items) {
        alert("Product already exists ");
        return;
      }
    }
    $scope.add = { "Customer_name": $location.search().key, "products": { "Prod": $scope.Searched_items, "Add": [] } };
    console.log($scope.add);
    $http.post("http://localhost:5000/cartinsert", $scope.add).then(function (response) {
      alert("Product added");
      console.log("success");
    });
    $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListproduct = response.data;
    });
  }
  //LIST OF PRODUCT AVAILABLE IN CART
  $scope.Gotocart = function () {
    $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListproduct = response.data;
    });
    $http.get("http://localhost:5000/initializeListCustomerdetails").then(function (response) {
      $scope.default_Add = response.data;
    });
	    $scope.changeproduct=false;
    $scope.Gotocartshow = false;
    $scope.Address = true;
    $scope.show_address = true;
    for (var i = 0; i < $scope.finalListproduct.length; i++) {
      if ($scope.finalListproduct[i].Customer_name == $location.search().key) {
        $scope.productscust.push($scope.finalListproduct[i]);
      }
    }
    for (var i = 0; i < $scope.default_Add.length; i++) {
      if ($scope.default_Add[i].Customer_name == $location.search().key) {
        $scope.Addresscust = $scope.default_Add[i].Address;
        //$scope.indexpositionofcucstomer=i;

      }
    }

  }
  //SAVING THE NEW ADDRESS
  $scope.Save_Address = function mycustomername(x) {
  //  alert($scope.Editedaddress);
	  if($scope.Editedaddress==null)
		  {
			  alert("New Address required");
			  return;
		  }
    /* $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListproduct = response.data;
    });*/
    $scope.add = { "Customer_name": $location.search().key, "products": { "Prod": $scope.productscust[x].products.Prod, "Add": $scope.Editedaddress } };
    console.log($scope.add);

    $http.post("http://localhost:5000/UpdateAddress", $scope.add).then(function (response) {
      console.log("success");
    });
 /*  $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListproduct = response.data;
    });*/

  }
  //FOR CHANGING THE DEFAULT ADDRES
  $scope.Proceed_changes = function (x) {
	    if($scope.Editedaddress==null)
		  {
			  alert("First Save Address and then change");
			  return;
		  }
    alert("Changed");
    $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListeditedaddress = response.data;
      $scope.Editedaddress = " ";
      $scope.Adressedit = true;
      $scope.newAddress = $scope.finalListeditedaddress[$scope.indexposition].products.Add;
      console.log($scope.newAddress);
      $scope.DefaultAddress = false;
    });
  }
  $scope.address_edit = function (x) {
    $scope.Adressedit = false; 
    $scope.indexposition = x;
  }
  //for checkout//
  $scope.CHECKOUT = function () {
    var inputforchangeaddress = prompt("Do you want to change your default address", "yes");
    if (inputforchangeaddress == "yes") {
      $scope.add = { "Customer_name": $location.search().key, "Address": $scope.newAddress };
      $http.post("http://localhost:5000/updateCustomerAddress", $scope.add).then(function (response) {
        console.log("success");
      });
		window.location.reload();
    }
    //Inserting product in orderHistory
    $scope.currentstatus = "In warehouse";
    $scope.addorderhistory = { "Customer_name": $location.search().key, "products": { "Prod": $scope.finalListeditedaddress[$scope.indexposition].products.Prod, "Add": $scope.finalListeditedaddress[$scope.indexposition].products.Add }, "status": $scope.currentstatus };
    $http.post("http://localhost:5000/initializeListOrderhistory", $scope.addorderhistory).then(function (response) {
      console.log("success");
    });

    //DELETED PRODUCT ADDED IN CART FROM THE DATABASE
    $scope.deletefromdatabase = { "Customer_name": $location.search().key, "products": $scope.finalListeditedaddress[$scope.indexposition].products.Prod };
    $http.post("http://localhost:5000/deleteItemFromCartList", $scope.deletefromdatabase).then(function (response) {
      console.log("success");
    });
    alert("ITEM PLACED");
  }
  //.............To get the order history........................
  $scope.orderhistory = function () {
    $scope.ob = { "Customer_name": $location.search().key };
    $http.post("http://localhost:5000/RetrievingOrderhistory", $scope.ob).then(function (response) {
      $scope.finalListorderhistory = response.data;
    });
    $scope.changeproduct = true;
	  $scope.Gotocartshowshow=false;
	  $scope.show_address=false;
	  $scope.Address=false;
  }

  //------------------controller for status update-------------------------------------------
  $scope.closeproduct = function (prod,status) {
    //alert(JSON.stringify(prod));
	  if( status== "In warehouse")
		  {
    $scope.cancelledstatus = "Item has been cancelled";
    $scope.cancelledorderhistory = { "Customer_name": $location.search().key, "products": { "Prod": prod.Prod, "Add": prod.Add }, "status": $scope.cancelledstatus };
    // alert(JSON.stringify($scope.cancelledorderhistory));
    $http.post("http://localhost:5000/OrderCancelledHistory", $scope.cancelledorderhistory).then(function (response) {
      alert("success: " + JSON.stringify($scope.cancelledorderhistory));   
    });
	    var ob = { "Customer_name": $location.search().key };
    $http.post("http://localhost:5000/RetrievingOrderhistory", ob).then(function (response) {
      $scope.finalListorderhistory = response.data;
    });
	  $scope.orderhistory();
		  }
	  
	    if(status=="Packed"||status=="Delivered"||status=="Shipped"||status=="Out for delivery"||status=="Item has been cancelled"){
          alert("You can't change your product ");
          return ;
      }
  }//Controller for starting the change process in orderHistory
	$scope.changedeliveryadd=function(prod,status)
	{
    
		if(status=="Shipped"||status=="Packed")
		  {
        $scope.orderhistoryshow=true;
    //	 <!--Sending updated address-->
        $scope.productfororder=prod;
        
		  }
  }
  //controller for changing the address in orderhistory
  $scope.saveaddinorderhistory=function()
  {
    $scope.updatedorderhistory = { "Customer_name": $location.search().key, "products": { "Prod": $scope.productfororder, "Add":$scope.updateorderadd}};
    $http.post("http://localhost:5000/UpdateOrderhistoryAdd", $scope.updatedorderhistory).then(function (response) {
   console.log("success updating in order history");
 });
 var ob = { "Customer_name": $location.search().key };
 $http.post("http://localhost:5000/RetrievingOrderhistory", ob).then(function (response) {
   $scope.finalListorderhistory = response.data;
 });
 $scope.orderhistoryshow=false;
  }
});

