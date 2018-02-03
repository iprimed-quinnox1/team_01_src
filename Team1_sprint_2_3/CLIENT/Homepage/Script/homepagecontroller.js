 var app = angular.module("myApp", []);
    app.controller("myctrl", function ($scope, $http, $location) {
      $http.get("http://localhost:5000/INITIALLIST").then(function (response) {
        $scope.finalList = response.data;
           
      });  
            $http.get("http://localhost:5000/LOGINLIST").then(function (response) {
                        $scope.default_Add = response.data;
                    });
                    $http.get("http://localhost:5000/FINALLIST").then(function (response) {
        $scope.finalListproduct = response.data;
      }); 
        //$http.get("http://localhost:5000/initializeList4").then(function (response) {
                //        $scope.product_list = response.data;
            //  $scope.array_of_pro=[""];  
                   // });
      $http.get("http://localhost:5000/CUSTOMERLIST").then(function (response) {
        $scope.finalListcustomer = response.data;
      });
        
      var slideIndex = 0;

      $scope.showstart = true;
      $scope.Adresss_edit = true;
      $scope.showSlides = function () {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("dot");

        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) { slideIndex = 1 }
        for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";

        setTimeout(showSlides, 1000); // Change image every 1 second
      }
      $scope.go = function (x) {
        $scope.itemIndex = x;
        $scope.id1 = $scope.finalList[x].pid;
        for (var i = 0; i < $scope.finalList.length; i++) {
          if ($scope.finalList[i].pid == $scope.id1) {
            $scope.new1 = $scope.id1;
          }
        }
        $scope.showstart = false;
      }
      $scope.Search_items = function (x) {
        $scope.itemIndex = x;
        for (var i = 0; i < $scope.finalList.length; i++) {
          if ($scope.finalList[i].pid == $scope.test) {
            $scope.newtest = $scope.test;
            $scope.showstart = false;
          }
        }

      }
      $scope.Reviewfun = function () {
        $scope.Reviewstart = true;
        $scope.add = { "pid": $scope.test, "review": { "Reviewname": $scope.Reviewname, "Reviewemail": $scope.Reviewemail, "Reviewarea": $scope.Reviewarea } };
        $http.post("http://localhost:5000/REVIEWLIST", $scope.add).then(function (response) {
          console.log("success");
        });
        $scope.Reviewstart = false;
      }
      $scope.Viewreview = function () {
        $scope.Viewstart = true;
        $http.get("http://localhost:5000/INITIALLIST").then(function (response) {
          $scope.finalList = response.data;
        });
        $scope.review = $scope.finalList[0].review[0].Reviewname;
        $scope.review1 = $scope.finalList[0].review[0].Reviewemail;
        $scope.review2 = $scope.finalList[0].review[0].Reviewarea;

      }
      $scope.Add_to_cart = function () {
        alert("adding Product");
        $scope.add = { "Customer_name": $location.search().key, "products":{"Prod": $scope.test,"Add":{}} };
        console.log( $scope.add );
        $http.post("http://localhost:5000/PRODUCT_CUST_LIST",$scope.add).then(function (response) {
          alert("Product added");
          console.log("success");
          
       });
          
    //      console.log( $scope.array_of_pro);
      /*    for(var i=0;i<$scope.array_of_pro.length;i++)
              {
                  if( $scope.array_of_pro[i]== $scope.test)
                      {
                          alert("Product already added to cart");
                          return ;
                      }
              }*/
       
      
        /*   $scope.array_of_pro.push($scope.add.products.Prod);    
           $http.post("http://localhost:5000/insertList32", $scope.array_of_pro).then(function (response) {
          console.log("success");
        });*/
      }
      $scope.Gotocart = function () {
            $http.get("http://localhost:5000/FINALLIST").then(function (response) {
        $scope.finalListproduct = response.data;
      });   
            $http.get("http://localhost:5000/CUSTOMERLIST").then(function (response) {
                        $scope.default_Add = response.data;
                    });
          $scope.Gotocart=false;
        $scope.Address = true;
          $scope.show_address=true;
        for (var i = 0; i < $scope.finalListproduct.length; i++) {
          if ($scope.finalListproduct[i].Customer_name == $location.search().key) {
          //  $scope.Addresscust = $scope.finalListcustomer[i].Address;
            $scope.productscust = $scope.finalListproduct[i].products.Prod;       
          }
        } alert(  $scope.productscust );
         for (var i = 0; i < $scope.default_Add.length; i++) {
          if ($scope.default_Add[i].Customer_name == $location.search().key) {
            $scope.Addresscust = $scope.default_Add[i].Address;
    // $scope.productscust = $scope.finalListproduct[i].products.Prod;
               
          }
        }
        
      }
      $scope.Adress_Edition = function () {

         alert($scope.Editedaddress);
        $scope.add = { "Customer_name": $location.search().key, "products": {"Prod": $scope.productscust, "Add":$scope.Editedaddress } };
        console.log($scope.add);
          $scope.Editedaddress="";
        $http.post("http://localhost:5000/EDITED_LIST", $scope.add).then(function (response) {
          console.log("success");
        });
      }
      $scope.Proceeded_Edition = function () {
       
        $http.get("http://localhost:5000/FINALLIST").then(function (response) {
          $scope.finalListeditedaddress = response.data;
        });
          for(var i=0;i<  $scope.finalListeditedaddress.length;i++)
              {
                  if($scope.finalListeditedaddress[i].Customer_name==$location.search().key)
                      {
                          $scope.newAdd=$scope.finalListeditedaddress[i].products.Add;
                          $scope.show_address=false;
                      }
              }

      }
      $scope.address_edit = function () {
        $scope.Adresss_edit = false;
         
      }
    });

