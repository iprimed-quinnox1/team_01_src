 var app = angular.module("myApp", []);
    app.controller("myctrl", function ($scope,$http,$location) {
          $scope.start=true;
	 $http.get("http://localhost:5000/initializeListCustomerdetails").then(function (response) {
                        $scope.finalList = response.data;
                    });
        $scope.Register_reg=function()
        {
		 for(var i=0;i<$scope.finalList.length;i++)
                {
                    if($scope.Customer_name==$scope.finalList[i].Customer_name)
                        {
				alert("Username alreay exist! Please enter other name");
					return;				
			}
		}
            alert("Successfully registered...!!");
            $scope.add={ "Customer_name":$scope.Customer_name,"Password":$scope.Password_pass,"Address":[$scope.Address_add],"Contact Number":$scope.contact_num, " Email-ID":$scope.email_id};
            console.log( $scope.add);
            $scope.start=false;
              $http.post("http://localhost:5000/Customertinsert", $scope.add).then(function (response) {
                        console.log("success");
                    });
        }
        $scope.Login_start=function()
        {
            $scope.start=false;
            $http.get("http://localhost:5000/initializeListCustomerdetails").then(function (response) {
                        $scope.finalList = response.data;
                    });
            for(var i=0;i<$scope.finalList.length;i++)
                {
                    if($scope.Username_log==$scope.finalList[i].Customer_name && $scope.password_log==$scope.finalList[i].Password)
                        {
                            alert("Entered");
                            var senddata=$scope.Username_log;
                            window.location="Homepage.html#!search?key="+senddata;
                        }
                }
        }
    });
