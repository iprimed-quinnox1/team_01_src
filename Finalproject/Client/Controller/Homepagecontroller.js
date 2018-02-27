var app = angular.module("myApp", []);
app.controller("myctrl", function ($scope, $http, $location) {
  $scope.ob = { "Customer_name": $location.search().key };
  $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
    $scope.finalList = response.data;
  });
  $http.post("http://localhost:5000/initializeListCart", $scope.ob).then(function (response) {
    $scope.finalListproduct = response.data;
    console.log("Initialize list");
  });
  $http.post("http://localhost:5000/addressforparticularcustomer", $scope.ob).then(function (response) {
    $scope.addressforparticularcustomer = response.data;
     $scope.defaultaddbuynow= $scope.addressforparticularcustomer[0].Default_address;
});
  $scope.productscust = [];
  $scope.showstart = true;
  $scope.Adressedit = true;

  //SEARCH THE PRODUCT AVAILABLE IN PRODUCT LIST
  /* $scope.Search_items = function () {
 
     for (var i = 0; i < $scope.finalList.length; i++) {
       if ($scope.finalList[i].pid == $scope.Searched_items) {
         $scope.selectedSearched_items = $scope.Searched_items;
         $scope.showstart = false;
       $scope.Gotocartshow=true;
       $scope.changeproduct=false;
       $scope.show_address=false;
       }
     }
 
   }*/

  $scope.Click_items = function (x) {

    $scope.Clicked_items = x;
    //alert($scope.Clicked_items);
    for (var i = 0; i < $scope.finalList.length; i++) {
      if ($scope.finalList[i].pid == $scope.Clicked_items) {
        $scope.selectedSearched_items = $scope.Clicked_items;
        $scope.showimage = $scope.finalList[i].img;
        $scope.showstart = false;
        $scope.Gotocartshow = true;
        $scope.changeproduct = false;
        $scope.show_address = false;
      }
    }

  }

  //ADDING REVIEW
  $scope.Reviewfun = function () {
    $scope.Reviewname = $location.search().key;
    if ($scope.Reviewarea == null) {
      alert("Enter product comment");
      return;
    }
    $scope.addreview = { "pid": $scope.selectedSearched_items, "review": { "Reviewname": $scope.Reviewname, "Reviewarea": $scope.Reviewarea } };
    $http.post("http://localhost:5000/addingreviews", $scope.addreview).then(function (response) {
      console.log("success");
    });
    $scope.Reviewstart = false;
  }
  //FOR VIEWING REVIEW
  $scope.Viewreview = function () {
    $scope.Reviewstart = false;
    $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
      $scope.finalList = response.data;

      for (var i = 0; i < $scope.finalList.length; i++) {
        if ($scope.finalList[i].pid == $scope.selectedSearched_items) {
          $scope.Totalreview = $scope.finalList[i].review;
        }
      }
    });
  }
  //FOR ADDING PRODUCTS IN CART
  $scope.Addtocart = function () {
    alert("adding Product");
    for (var i = 0; i < $scope.finalListproduct.length; i++) {
      if ($scope.finalListproduct[i].Customer_name == $location.search().key && $scope.finalListproduct[i].products.Prod == $scope.selectedSearched_items) {
        alert("Product already exists ");
        return;
      }
    }

    $scope.addtocartlist = { "Customer_name": $location.search().key, "products": { "img": $scope.showimage, "Prod": $scope.selectedSearched_items, "Add": [] } };
    console.log($scope.addtocartlist);
    $http.post("http://localhost:5000/cartinsert", $scope.addtocartlist).then(function (response) {
      alert("Product added");
      console.log("success");
    });
    $http.post("http://localhost:5000/initializeListCart", $scope.ob).then(function (response) {
      $scope.updatedfinalListproduct = response.data;
    });
  }
  //LIST OF PRODUCT AVAILABLE IN CART
  $scope.Gotocart = function () {
    $scope.myaddress = false;
    $scope.changeproduct = false;
    $scope.Gotocartshow = false;
    $scope.Address = true;
    $scope.show_address = true;
    $scope.imageshow = false;
    $http.post("http://localhost:5000/initializeListCart", $scope.ob).then(function (response) {
      $scope.updatedfinalListproduct = response.data;
    });
    $http.post("http://localhost:5000/addressforparticularcustomer", $scope.ob).then(function (response) {
      $scope.addressforonecustomer = response.data;
      // $scope.addressupdated=$scope.addressforonecustomer[0].Address;
    });

    /* for (var i = 0; i < $scope.finalListproduct.length; i++) {
       if ($scope.finalListproduct[i].Customer_name == $location.search().key) {
         $scope.productscust.push($scope.finalListproduct[i]);
       }
     }*/

  }
  //SAVING THE NEW ADDRESS
  $scope.Save_Address = function mycustomername(x) {
    //  alert($scope.Editedaddress);
    if ($scope.Editedaddress == null) {
      alert("New Address required");
      return;
    }
    /* $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
      $scope.finalListproduct = response.data;
    });*/
    $scope.insertadd = { "Customer_name": $location.search().key, "products": {"Prod":$scope.productdetails, "Add":$scope.Editedaddress } };
    console.log($scope.insertadd);

    $http.post("http://localhost:5000/UpdateAddresscart", $scope.insertadd).then(function (response) {
      console.log("success");
    });
    /*  $http.post("http://localhost:5000/initializeListCart",$scope.ob).then(function (response) {
         $scope.finalListproduct = response.data;
       });*/

  }
  //FOR CHANGING THE DEFAULT ADDRES
  $scope.Proceed_changes = function (x) {
    if ($scope.Editedaddress == null) {
      alert("First Save Address and then change");
      return;
    }
    alert("Changed");
    $scope.Editedaddress = " ";
    $scope.Adressedit = true;
    $scope.DefaultAddress = false;
    $http.post("http://localhost:5000/initializeListCart", $scope.ob).then(function (response) {
      $scope.finalListeditedaddress = response.data;
      $scope.newAddress = $scope.finalListeditedaddress[$scope.indexposition].products.Add;
      console.log($scope.newAddress);

    });
  }
  $scope.address_edit = function (x, y, z) {
    $scope.imageshow = z;
    $scope.productdetails = x;
    $scope.indexposition = y;
    $scope.showstart=true;
    $scope.showstart=false;
    $scope.Adressedit = false;
   
  }
  //Deleting items from add to cart
  $scope.removefromaddtocart = function (x, y) {
    $scope.removefromadd2cart = { "Customer_name": $location.search().key, "products": { "Prod": x } };
    $http.post("http://localhost:5000/deleteItemFromAddtoCartList", $scope.removefromadd2cart).then(function (response) {
      console.log("success deleteItemFromCartList");
    });
    $http.post("http://localhost:5000/initializeListCart", $scope.ob).then(function (response) {
      $scope.updatedfinalListproduct = response.data;
    });
  }

  //Adding Gift along with the product 
  $scope.giftsend = function () {
    $scope.answer = confirm("Gift wrapped");
  }

  //Buy now ................................
  $scope.Buynow = function (x, y, z) {
    $scope.giftsend();
    if(z==null)
    {
      z=$scope.defaultaddbuynow;
         console.log(z);
    }
    //Inserting product in orderHistory
    $scope.currentstatus = "In warehouse";
    $scope.addorderhistory = { "Customer_name": $location.search().key, "products": { "img": x, "Prod": y, "Add": z }, "status": $scope.currentstatus, "Gift": $scope.answer };
    $http.post("http://localhost:5000/insertOrderhistory", $scope.addorderhistory).then(function (response) {
      console.log("success");
    });

    //DELETED PRODUCT ADDED IN CART FROM THE DATABASE
    $scope.deletefromdatabase = { "Customer_name": $location.search().key, "products": y };
    $http.post("http://localhost:5000/deleteItemFromCartListCheckout", $scope.deletefromdatabase).then(function (response) {
      console.log("success");
    });
    alert("ITEM PLACED");
    window.location.reload();
  }

  //for checkout//
  $scope.CHECKOUT = function () {
    var inputforchangeaddress = prompt("Do you want to add in your list of addresses", "yes");
    if (inputforchangeaddress == "yes") {
      $scope.add = { "Customer_name": $location.search().key, "Address": $scope.newAddress };
      $http.post("http://localhost:5000/updateAddress", $scope.add).then(function (response) {
        console.log("success");
      });
    
    }
    window.location.reload();
    //Inserting product in orderHistory
    $scope.currentstatus = "In warehouse";
    if($scope.answer==null)
    {
      $scope.answer=false;
    }
    $scope.addorderhistory = { "Customer_name": $location.search().key, "products": { "img":$scope.showimage, "Prod": $scope.finalListeditedaddress[$scope.indexposition].products.Prod, "Add": $scope.finalListeditedaddress[$scope.indexposition].products.Add }, "status": $scope.currentstatus, "Gift": $scope.answer };
    $http.post("http://localhost:5000/insertOrderhistory", $scope.addorderhistory).then(function (response) {
      console.log("success");
    });

    //DELETED PRODUCT ADDED IN CART FROM THE DATABASE
    $scope.deletefromdatabase = { "Customer_name": $location.search().key, "products": $scope.finalListeditedaddress[$scope.indexposition].products.Prod };
    $http.post("http://localhost:5000/deleteItemFromCartListCheckout", $scope.deletefromdatabase).then(function (response) {
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
    $scope.myaddress = false;
    $scope.changeproduct = true;
    $scope.Gotocartshowshow = false;
    $scope.show_address = false;
    $scope.Address = false;
    $scope.imageshow = false;
  }

  //------------------controller for status update-------------------------------------------
  $scope.closeproduct = function (prod, status) {
    //alert(JSON.stringify(prod));
    if (status == "In warehouse") {
      $scope.cancelledstatus = "Item has been cancelled";
      $scope.cancelledorderhistory = { "Customer_name": $location.search().key, "products": { "Prod": prod.Prod, "Add": prod.Add }, "status": $scope.cancelledstatus };
      // alert(JSON.stringify($scope.cancelledorderhistory));
      $http.post("http://localhost:5000/CancelledOrderHistory", $scope.cancelledorderhistory).then(function (response) {
        alert("success");
      });
      var ob = { "Customer_name": $location.search().key };
      $http.post("http://localhost:5000/RetrievingOrderhistory", ob).then(function (response) {
        $scope.finalListorderhistory = response.data;
      });
      $scope.orderhistory();
    }
    if (status == "Packed" || status == "Delivered" || status == "Shipped" || status == "Out for delivery" || status == "Item has been cancelled") {
      $scope.cancelprodcut = true;
    }
  }//Controller for starting the change process in orderHistory
  $scope.changedeliveryadd = function (prod, status, id) {

    if (status == "In warehouse" || status == "Shipped" || status == "Packed") {
      $scope.orderhistoryshow = true;
      $scope.productfororder = prod;
      $scope.id = id;
    }
    if (status == "Out for delivery" || status == "Delivered" || status == "Item has been cancelled") {
      $scope.changedelivery = true;
    }
  }
  //controller for changing the address in orderhistory
  $scope.saveaddinorderhistory = function () {
    if ($scope.updateorderadd == null) {
      alert("Enter your new delivery address");
      return;
    }
    $scope.updatedorderhistory = { "_id": $scope.id, "products": { "Prod": $scope.productfororder, "Add": $scope.updateorderadd } };
    $http.post("http://localhost:5000/UpdateOrderAddress", $scope.updatedorderhistory).then(function (response) {
      console.log("success updating in order history");
    });
    var ob = { "Customer_name": $location.search().key };
    $http.post("http://localhost:5000/RetrievingOrderhistory", $scope.ob).then(function (response) {
      $scope.finalListorderhistory = response.data;
    });
    $scope.orderhistoryshow = false;
    $scope.updateorderadd = "";
  }
  //Save address in the list of customer addresses
  $scope.saveaddinlistofaddress = function () {
    if ($scope.updateorderadd == null) {
      alert("Enter your delivery address which is to be added in addresslist");
      return;
    }
    $scope.addcustomeradd = { "Customer_name": $location.search().key, "Address": $scope.updateorderadd };
    $http.post("http://localhost:5000/updateAddress", $scope.addcustomeradd).then(function (response) {
      console.log("success updating in order history Address");
    });
    $scope.updatedorderhistory = { "_id": $scope.id, "products": { "Prod": $scope.productfororder, "Add": $scope.updateorderadd } };

    $http.post("http://localhost:5000/UpdateOrderAddress", $scope.updatedorderhistory).then(function (response) {
      console.log("success updating in order history");
    });
    $http.post("http://localhost:5000/RetrievingOrderhistory", $scope.ob).then(function (response) {
      $scope.finalListorderhistory = response.data;
    });
    $scope.orderhistoryshow = false;
    $scope.updateorderadd = "";
  }
  //List of all address in customer_details
  $scope.myAddress = function () {
    $scope.myaddress = true;
    $scope.changeproduct = false;
    $scope.imageshow = false;
    $scope.Gotocartshow = false;
    $scope.show_address = false;
    $http.post("http://localhost:5000/addressforparticularcustomer", $scope.ob).then(function (response) {
      $scope.addressforparticularcustomer = response.data;
    });
  }
  //For making address list default 
  $scope.myaddresslist = function (y, s) {
    $scope.defaultaddresscommon = y;
    // $scope.addressforparticularcustomer[0].Default_address=y;
    $scope.customerdefaultadd = { "Customer_name": $location.search().key, "Default_address": $scope.defaultaddresscommon };
    $http.post("http://localhost:5000/updateCustomerdefaultAddress", $scope.customerdefaultadd).then(function (response) {
      console.log("Updated address coming");
    }, function (error) {
      console.log("GHANTA");
      console.log(error);
    });
    $http.post("http://localhost:5000/addressforparticularcustomer", $scope.ob).then(function (response) {
      $scope.addressforparticularcustomer = response.data;
    });
    $scope.defaultaddresscustomer = $scope.addressforparticularcustomer[0].Default_address;
  }

});

