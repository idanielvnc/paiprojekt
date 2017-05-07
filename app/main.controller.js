(function() {
  'use strict';

  angular
    .module('cartProject')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, CartModel, ProductModel, $http, GetJson, $rootScope) {
    $scope.typyNagrod = ["brak", "złoto", "proszek", "karta", "paczka"];
    $scope.typyKart = ["złota", "fioletowa", "pomarań", "szara"];
    $scope.testWinsArr = [{value: "", label: "None"},{value: 1, label: "1"},{value: 2, label: "2"},{value: 3, label: "3"},{value: 4, label: "4"},{value: 5, label: "5"},{value: 6, label: "6"},{value: 7, label: "7"},{value: 8, label: "8"},{value: 9, label: "9"},{value: 10, label: "10"},{value: 11, label: "11"},{value: 12, label: "12"}];
    $scope.classArr = ["Hunter","Rogue","Warrior","Warlock","Druid","Mage","Shaman","Paladin","Priest"];
    $scope.classArr2 = [{value: "", label: "None"},{value: "Hunter", label: "Hunter"},{value: "Rogue", label: "Rogue"},{value: "Warrior", label: "Warrior"},{value: "Warlock", label: "Warlock"},{value: "Druid", label: "Druid"},{value: "Mage", label: "Mage"},{value: "Shaman", label: "Shaman"},{value: "Paladin", label: "Paladin"},{value: "Priest", label: "Priest"}];

    $scope.ch = false;

    var cart = new CartModel();
    $scope.cart = cart;

    var product = new ProductModel();
    $scope.product = product;

    var db = new PouchDB('HSstats');
    db.info().then(function (info) {
      console.log(info);
    })

    $scope.add = function() {
      var Gametime = moment().format('MMMM Do YYYY');
      $scope.product.setChar($scope.productChar);
      $scope.product.setWins($scope.productWins);
      $scope.product.setPack1($scope.productPack1, $scope.productValue1);
      $scope.product.setPack2($scope.productPack2, $scope.productValue2);
      $scope.product.setPack3($scope.productPack3, $scope.productValue3);
      $scope.product.setPack4($scope.productPack4, $scope.productValue4);
      $scope.product.setPack5($scope.productPack5, $scope.productValue5);
      $scope.product.setScore($scope.productScore);
      $scope.product.setTime(Gametime);//, h:mm:ss a'));

      $scope.cart.addProduct($scope.product);
      DBsubmit($scope.productChar,$scope.productWins,$scope.productPack1, $scope.productValue1, $scope.productPack2, $scope.productValue2, $scope.productPack3, $scope.productValue3, $scope.productPack4, $scope.productValue4, $scope.productPack5, $scope.productValue5, $scope.productScore, Gametime);
      //console.log(JSON.stringify($scope.cart, null, 2));

      $scope.product = new ProductModel();
      refreshBarChart();
      $scope.myForm.$setPristine();
      $scope.productChar = "";
      $scope.productWins = "";
      $scope.productPack1 = "";
      $scope.productPack2 = "";
      $scope.productPack3 = "";
      $scope.productPack4 = "";
      $scope.productPack5 = "";
      $scope.productScore = "";

     /* db.allDocs({
        include_docs: true,
        attachments: true
      }).then(function (result) {
        console.log("fin2",result);
      }).catch(function (err) {
        console.log(err);
      });*/

    };

    var DBid = 0;
    var DBsubmit = function(char, wins, pack1, value1, pack2, value2, pack3, value3, pack4, value4, pack5, value5, score, Gametime){
        console.log("addid", DBid);
      var doc = {
        "_id": String(DBid),
        "class": char,
        "wins": wins,
        "pack1" : pack1,
        "val1" : value1,
        "pack2" : pack2,
        "val2" : value2,
        "pack3" : pack3,
        "val3" : value3,
        "pack4" : pack4,
        "val4" : value4,
        "pack5" : pack5,
        "val5" : value5,
        "HSscore": score,
        "Gametime" : Gametime
      };
      db.put(doc);
      DBid++;
    };

    $scope.DBclear = function(){
      $scope.ch = true;
      console.log("");
      db.destroy()
      db = new PouchDB('HSstats');
      db.info().then(function (info) {
        console.log(info);
      })
    };

    var promiseAnswers = GetJson.getData();
    var elemCounter = 0;

    promiseAnswers.then(function(data){ //Get from JSON
      var sent = false;
      data.list.forEach(function(answer) {
        sent=true;
        $scope.product.setChar(answer.char);
        $scope.product.setWins(answer.wins);
        $scope.product.setPack1(answer.pack1, answer.value1);
        $scope.product.setPack2(answer.pack2, answer.value2);
        $scope.product.setPack3(answer.pack3, answer.value3);
        $scope.product.setPack4(answer.pack4, answer.value4);
        $scope.product.setPack5(answer.pack5, answer.value5);
        $scope.product.setScore(answer.score);
        $scope.product.setTime(answer.time);
        
        $scope.cart.addProduct($scope.product);
        DBid = cart.listOfProducts.indexOf($scope.product);
        $scope.product = new ProductModel();
        refreshBarChart();
        //console.log(JSON.stringify($scope.cart, null, 2));
        elemCounter++;
      });
      if(sent) DBid++;
    });

    db.allDocs({ //get from database
      include_docs: true,
      attachments: true
    }).then(function (result) {
      var sent = false;
      result.rows.forEach(function(answer) {
        DBid = answer.id;
        console.log("id",DBid);
        $scope.product.setChar(answer.doc.class);
        $scope.product.setWins(answer.doc.wins);
        $scope.product.setPack1(answer.doc.pack1, answer.doc.value1);
        $scope.product.setPack2(answer.doc.pack2, answer.doc.value2);
        $scope.product.setPack3(answer.doc.pack3, answer.doc.value3);
        $scope.product.setPack4(answer.doc.pack4, answer.doc.value4);
        $scope.product.setPack5(answer.doc.pack5, answer.doc.value5);
        $scope.product.setScore(answer.doc.HSscore);
        $scope.product.setTime(answer.doc.Gametime);
        
        $scope.cart.addProduct($scope.product);
        $scope.product = new ProductModel();
        refreshBarChart();
        sent = true;
      });
      if(sent) DBid++;
    }).catch(function (err) {
      console.log(err);
    });

    $scope.removeElement = function(idi) {
      $scope.cart.removeElement(idi);
      refreshBarChart();
      if(idi < elemCounter){
        elemCounter--;
      } else {
        db.allDocs({
          include_docs: true,
          attachments: true
        }).then(function (result) {
          var temp = result.rows[idi-elemCounter].id;
          db.get(temp).then(function(doc) {
            return db.remove(doc);
          });
        }).catch(function (err) {
          console.log(err);
        });
      }
    }

    var winsSorted=false;
    var classSorted=false;
    var scoreSorted=false;
    $scope.myOrderBy = "";

    $scope.orderByMe = function(x) {
      if(x=="char") {
        if(classSorted){
          $scope.myOrderBy = "-"+x;
          classSorted=false;
        } else {
          $scope.myOrderBy = x;
            classSorted=true;
        }
      }
      if(x=="wins"){
        if(winsSorted){
          $scope.myOrderBy = "-"+x;
          winsSorted=false;
        } else {
          $scope.myOrderBy = x;
          winsSorted=true;
        }
      }
      if(x=="score"){
        if(scoreSorted){
          $scope.myOrderBy = "-"+x;
          scoreSorted=false;
        } else {
          $scope.myOrderBy = x;
          scoreSorted=true;
        }
      }
    };

    var refreshBarChart = function() {
      var data = [
        [$scope.cart.overAllClasses(0), $scope.cart.overAllClasses(1),
        $scope.cart.overAllClasses(2), $scope.cart.overAllClasses(3),
        $scope.cart.overAllClasses(4), $scope.cart.overAllClasses(5),
        $scope.cart.overAllClasses(6), $scope.cart.overAllClasses(7),
        $scope.cart.overAllClasses(8)]
      ];
      //console.log(data);
      $rootScope.$broadcast("sendData", data);
      $rootScope.$broadcast("sendTime", cart.overAllTime());
    };
  }

})();
