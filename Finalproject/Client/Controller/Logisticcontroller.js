  var app = angular.module('myApp', []);
        app.controller('myCtrl', function ($scope, $http,$location) {
            $http.get("http://localhost:5000/FetchingallOrderhistory").then(function (response) {
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
               $scope.image=$scope.orderDetails[x].products.img;
               $scope.Product = $scope.orderDetails[x].products.Prod;
               $scope.address= $scope.orderDetails[x].products.Add;
               $scope.currentstatus=y;  
               if( $scope.currentstatus=="Delivered") 
               {
                   $scope.logisticdisabled=true;
               } 
               $scope.updatestatus={"Customer_name":$scope.name , "products": { "img":$scope.image,"Prod":  $scope.Product,"Add": $scope.address},"status": $scope.currentstatus};
               console.log($scope.currentstatus);
               $http.post("http://localhost:5000/UpdateOrderhistory",$scope.updatestatus).then(function (response) {
                console.log("successfully changed");       				 
            });
            window.location.reload();
        }
				    
               
        });
