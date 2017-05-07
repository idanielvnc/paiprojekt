(function() {
  'use strict';

  angular
    .module('cartProject')
    .factory('ProductModel', ProductModelFactory);

  /** @ngInject */
  function ProductModelFactory() {

    var ProductModel = function(char, wins, pack1, pack2, pack3, pack4, pack5, score, value1, value2, value3, value4, value5, time) {

      this.char = char || "";
      this.wins = wins || 0;
      this.pack1 = pack1 || "";
      this.pack2 = pack2 || "";
      this.pack3 = pack3 || "";
      this.pack4 = pack4 || "";
      this.pack5 = pack5 || "";
      this.score = score || "";
      this.value1 = value1 || 0;
      this.value2 = value2 || 0;
      this.value3 = value3 || 0;
      this.value4 = value4 || 0;
      this.value5 = value5 || 0;
      this.display1 = pack1 || "";
      this.display2 = pack2 || "";
      this.display3 = pack3 || "";
      this.display4 = pack4 || "";
      this.display5 = pack5 || "";
      this.time = time || "";

      this.display = function(x){
        if(x == "0") return "--";
        if(x == "1") return "G";
        if(x == "2") return "D";
        if(x == "3") return "C";
        if(x == "4") return "B";
      };

      this.sumCurrency = function(x){
        var sum = 0;
        if(this.pack1 == x ) sum+=this.value1;
        if(this.pack2 == x ) sum+=this.value2;
        if(this.pack3 == x ) sum+=this.value3;
        if(this.pack4 == x ) sum+=this.value4;
        if(this.pack5 == x ) sum+=this.value5;
        return sum;
      };

      this.setChar = function(char) {
        this.char = char;
      };

      this.setWins = function(wins) {
        this.wins = wins;
      };

      this.setPack1 = function(pack1, value1) {
        this.pack1 = pack1;
        this.value1 = value1;
        this.display1 = this.display(pack1);
      };

      this.setPack2 = function(pack2, value2) {
        this.pack2 = pack2;
        this.value2 = value2;
        this.display2 = this.display(pack2);
      };

      this.setPack3 = function(pack3, value3) {
        this.pack3 = pack3;
        this.value3 = value3;
        this.display3 = this.display(pack3);
      };

      this.setPack4 = function(pack4, value4) {
        this.pack4 = pack4;
        this.value4 = value4;
        this.display4 = this.display(pack4);
      };

      this.setPack5 = function(pack5, value5) {
        this.pack5 = pack5;
        this.value5 = value5;
        this.display5 = this.display(pack5);
      };

      this.setScore = function(score) {
        this.score = score;
      };

      this.setTime = function(time) {
        this.time = time;
      };

      this.getGold = function() {
        return this.sumCurrency("1");
      };

      this.getDust = function() {
        return this.sumCurrency("2");
      };

      this.getWins = function() {
        return this.wins;
      };

      this.getTime = function() {
        return this.time;
      };

      this.getChar = function() {
        return this.char;
      };

      this.getGames = function() {
        if(this.wins == 12) {
          return this.wins;
        }
        else{
          return this.wins+3;
        }
      };

      this.getLostGames = function() {
        if(this.wins !== 12) {
          return 3;
        }
      };

    }

    return ProductModel;
  }
})();
