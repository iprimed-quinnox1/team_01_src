  var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope, $http,$location) {
            $http.get("http://localhost:5000/RetrievingOrderhistory").then(function (response) {
                $scope.orderDetails = response.data;
            });                   
            $scope.statuses = [
                "In warehouse",
                 "Packed" ,
                "Shipped",
                 "Out for delivery",
                  "Delivered"
            ];
               $scope.updatestatus=function(x,y)
               { 
				   
               $scope.name= $scope.orderDetails[x].Customer_name;
               $scope.Product = $scope.orderDetails[x].products.Prod;
               $scope.address= $scope.orderDetails[x].products.Add;
               $scope.currentstatus=y;  
               $scope.updatestatus={"Customer_name":$scope.name , "products": { "Prod":  $scope.Product,"Add": $scope.address},"status": $scope.currentstatus};
               console.log($scope.currentstatus);
               $http.post("http://localhost:5000/UpdateOrderhistory",$scope.updatestatus).then(function (response) {
                console.log("successfully changed");
				 
            });
				     window.location.reload();
               }
        });