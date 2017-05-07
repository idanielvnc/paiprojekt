(function() {
  'use strict';

  angular
    .module('cartProject')
    .factory('CartModel', CartModel);

  /** @ngInject */
  function CartModel() {

    var Cart = function() {

      this.listOfProducts = [];

      console.log(this.listOfProducts);

      this.overAll = function() {
        this.sum = 0;
        this.listOfProducts.forEach(function(product) {
          this.sum++;
        }, this);
        return this.sum;
      };

      this.overAllGold = function() {
        this.sumOfGold = 0;
        this.listOfProducts.forEach(function(product) {
          this.sumOfGold += product.getGold();
        }, this);
        return this.sumOfGold;
      };

      this.overAllDust = function() {
        this.sumOfDust = 0;
        this.listOfProducts.forEach(function(product) {
          this.sumOfDust += product.getDust();
        }, this);
        return this.sumOfDust;
      };

      this.overAllWins = function() {
        this.sumOfWins = 0;
        this.listOfProducts.forEach(function(product) {
          this.sumOfWins += product.getWins();
        }, this);
        return this.sumOfWins;
      };

      this.overAllGames = function() {
        this.sumOfGames = 0;
        this.listOfProducts.forEach(function(product) {
          this.sumOfGames += product.getGames();
        }, this);
        return this.sumOfGames;
      };

      this.overAllLostGames = function() {
        this.sumOfLostGames = 0;
        this.listOfProducts.forEach(function(product) {
          this.sumOfLostGames += product.getLostGames();
        }, this);
        return this.sumOfLostGames;
      };

      this.overAllTime = function() {
        this.time = [];//this.listOfProducts[0].getTime()];
        //console.log("czas",this.listOfProducts[0]);
        this.listOfProducts.forEach(function(product) {
          //console.log(product.getTime());
          //this.time.forEach(function(el){
           // if(el != product.getTime());
            //{
              this.time.push(product.getTime());
            //}
          //});
        }, this);
        return this.time;
      };

      this.overAllAvg = function() {
        if(this.sumOfGames != 0) {
          return this.sumOfWins/this.sumOfGames;
        }
        else{
          return 0;
        }
      };

      this.overAllWinLossRatio = function() {
        return this.sumOfGold - (50*this.sum);
      };

      this.overAllBadGames = function() {
        this.sumOfBadGames = 0;
        this.listOfProducts.forEach(function(product) {
          if(product.getWins() <3){
            this.sumOfBadGames += 1;            
          }
        }, this);
        return this.sumOfBadGames;
      };

      this.overAllGrind = function() {
        this.sumOfGrind = this.sumOfGold - (50*this.sum) - (this.sumOfWins/3)*10;
        return this.sumOfGrind.toFixed(2);
      };

      this.overAllTimePlayed = function() {
        this.sumOfTimePlayed = ((this.sumOfGames*589)/60)/60;
        return this.sumOfTimePlayed.toFixed(2);
      };

      this.overAllClasses = function(cell) {
        this.character = ["Hunter","Warlock","Warrior","Rogue","Druid","Shaman","Mage","Paladin","Priest"];
        this.charAmount = [0,0,0,0,0,0,0,0,0];
        this.listOfProducts.forEach(function(product) {
          this.character.forEach(function(a,index){
            if(product.getChar() == a ){
              this.charAmount[index] +=1;
            }
          }, this); 
        }, this);
        return this.charAmount[cell];
      };

      this.addProduct = function(product) {
        this.listOfProducts.push(product);
      };

      this.removeElement = function(id) {
        this.listOfProducts.splice(id, 1);
      }

    }
    return Cart;
  }
})();
