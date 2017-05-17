//would like to use statics in a class based approach. settling to use globals here

function Item(name, sell_in, quality) {
  //do not change
  //sell_in - number of days left to sell the item
  //quality - current value of item and > 0
  
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

//helper function
function checkQuality(curr) {
  if(curr.quality >= 0 && curr.quality <=50) {
    return true;
  }
  return false;
}

function updateAgedBrie (curr) {
  //update only if quality less than 50
  var checkQuality = this.checkQuality(curr);
  if(checkQuality) {
    if(curr.sell_in < 0) {
      //increase quality 2x
      //check for current quality cos quality can never get to over 50
      //either increment by 2 if value will be 50 or less or do nothing
      curr.quality = curr.quality + 2 > 50 ? 50 : curr.quality + 2;
    } else {
      curr.quality = curr.quality + 1 > 50 ? 50 : curr.quality + 1;
    }  

  }
  return curr;


}
function updateConjured (curr) {
  //degrade quality by 2x compared to normal items
  var qualityCheck = this.checkQuality(curr);
  if (qualityCheck) {
    //if sell_in >=0 degrade by 2x of normal which is 4x
    if(curr.sell_in < 0) {
      curr.quality = (curr.quality - 4 < 0) ? 0 : curr.quality - 4;
    }else {
      //degrade by 2x
      curr.quality = (curr.quality - 2 < 0) ? 0 : curr.quality - 2;
    }

  }
  return curr;
}

function updateBackstage (curr) {
  //"Backstage passes", like aged brie, increases in quality
  //as it's sell-in value approaches; quality increases by 2 when there are 10 days or less 
  //and by 3 when there are 5 days or less but quality drops to 0 after the concert
  var qualityCheck = this.checkQuality(curr);
  if(qualityCheck) {
    if(curr.sell_in < 0) {
      curr.quality = 0;
    }else {
       var sell_in = curr.sell_in;
       if(sell_in <= 10 && sell_in > 5) {
        curr.quality = curr.quality + 2 > 50 ? 50 : curr.quality + 2;
       }else if(sell_in <= 5) {
        curr.quality = curr.quality + 3 > 50 ? 50 : curr.quality + 3;
       }else {
        //over 10 days remaining
        curr.quality = curr.quality + 1 > 50 ? 50 : curr.quality + 1;
       }
    }

  }
  return curr;

}

function updateDefault (curr) {
  //properties are name, sell_in, quality
  //when sell by date < 0 , quality = quality -2 else quality = quality-1 et EOD
  //quality always > 0 and <= 50
  var qualityCheck = this.checkQuality(curr);
  if (qualityCheck) {
    //if quality if already zero , do nothing
    if(curr.sell_in < 0) {
      //sell by date has passed. quality = quality -2
      //if quality goes below zero, reset to 0
      curr.quality = curr.quality - 2 < 0 ? 0 : curr.quality - 2;
    }else {
      curr.quality--;
    }
  }
  return curr;

}

function updateSulfuras(curr) {
  //do nothing for sulfuras
  return curr;
}

function updateQuality() {
  for (var i = 0; i < items.length; i++) {
     var currentItem = items[i];
     //keep sell in decrement within switch case cos for Sulfuras items - we do not do anything
     //lets keep activities restricted to item type. this wil serve us when the inventory expands
     switch(currentItem.name) {
      case "Aged Brie":
        items[i].sell_in--;
        items[i] = this.updateAgedBrie(currentItem);
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        items[i].sell_in--;
        items[i] = this.updateBackstage(currentItem);
        break;
      case "Sulfuras, Hand of Ragnaros":
        items[i] = this.updateSulfuras(currentItem);
        break;
      case "Conjured Mana Cake":
        items[i].sell_in--;
        items[i] = this.updateConjured(currentItem);
        break;
      default:
        items[i].sell_in--;
        items[i] = this.updateDefault(currentItem);
        break;  
     } 
  }
}

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}

