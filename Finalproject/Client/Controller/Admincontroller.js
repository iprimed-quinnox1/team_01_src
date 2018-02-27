     var app = angular.module("myApp", []);
        app.controller("mycntrl", function ($scope, $http) {
            $scope.start = true;
            $scope.show = false;
            $scope.Important = true;
            $scope.arr = [];
            $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
                $scope.finalList = response.data;
					     });
                         $scope.Product_itemsfun = function (x) {
				
                            for (var i = 0; i < $scope.finalList.length; i++) {
                            if ($scope.finalList[i].pid ==  $scope.Product_id) {
                             alert("Product already exists ");
                                return Error;
                            }
                        }
                            var image = null;
                            var fd = new FormData();
                            if ($scope.files) {
                                image = $scope.files.name;
                            }
                            else{
                                return;
                            }       
                    if ($scope.Product_id.length == null) {
                        return Error;
                    } else {
                        $scope.add = { "pid": $scope.Product_id,image, techspec: [] ,review:[]};
                        //  $scope.start=false;
                        fd.append('file', $scope.files);
                       fd.append('pid', $scope.Product_id);
                       fd.append('techspec',[]);
                       fd.append('review',[]);
                        $http.post("http://localhost:5000/insertproduct_item", fd, {
                            transformRequest: angular.identity,
                            headers: { 'Content-Type': undefined }
                        }).then(function (response) {
                            console.log("success");
                        if (response.data == true) {
                            $scope.finalList.push(add);
                        }
                        });
                        window.location.reload();
                        $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
                            $scope.finalList = response.data;
                        });
                    }
                 }
            $scope.Addto = function () {
                $scope.show = true;
                //$scope.start=false;
                var id = $scope.Attribute;
                var pass = $scope.Value;
				if (id== null || pass ==null) {
                    return;
                } 
				else {
                    $scope.show1 = true;

                
                $scope.add = { "pid": $scope.id1, "techspec": { "id": $scope.Attribute, "val": $scope.Value } };
                $scope.arr.push($scope.add.techspec);
                $scope.Attribute = "";
                $scope.Value = "";
				}

            }
            $scope.remove_items = function (y) {

                $scope.add = $scope.finalList[$scope.itemIndex].techspec.splice(y,1)[0];
                console.log($scope.add);
                var myOb = { pidToRemove: $scope.finalList[$scope.itemIndex].pid, techSpec: $scope.add };
                $http.post("http://localhost:5000/deleteItemFromList", myOb).then(function (response) {
                    console.log("success");
                });
            
          /*  $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
                $scope.finalList = response.data;
            });*/
            }
            $scope.Another_item = function () {
                for (var i = 0; i < $scope.arr.length; i++) {
                    $scope.add = { "pid": $scope.id1, "techspec": $scope.arr[i] };
                    $http.post("http://localhost:5000/updateinsideProductitem", $scope.add).then(function (response) {
                        console.log("success");

                    });
                    $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
                        $scope.finalList = response.data;
                    });

                }
                $scope.show1 = false;
                $scope.Important = true;
              	  $scope.arr = [];
            }
            $scope.go = function (x) {
                  $scope.itemIndex = x;
                $scope.id1 = $scope.finalList[x].pid;
                $scope.start = false;
                $scope.show = true;
                $scope.Important = true;
                    for (var i = 0; i < $scope.finalList.length; i++) {
                        if ($scope.finalList[i].pid == $scope.id1) {
                            $scope.new1 = $scope.id1;
                        }
                    }
            }
            $scope.back = function () {
                $scope.start = true;
                location.reload();

            }
			//Delete the product_item
			$scope.deleteproduct=function(x)
			{
				$scope.productdelete={"pid":$scope.finalList[x].pid};
				 $http.post("http://localhost:5000/productitemdelete", $scope.productdelete).then(function (response) {
                        console.log("Deleted product item");

                    });
				  $http.get("http://localhost:5000/initializeListProducts_list").then(function (response) {
                        $scope.finalList = response.data;
                    });
			}
        });
        app.directive("fileInput", ['$parse', function ($parse) {
            return {
                restrict: 'A',
                link: function (scope, elm, attrs) {
                    elm.bind('change', function (parse) {
                        $parse(attrs.fileInput).assign(scope, elm[0].files[0]);
                        scope.$apply();
                    })
                }
            }
        }]);
