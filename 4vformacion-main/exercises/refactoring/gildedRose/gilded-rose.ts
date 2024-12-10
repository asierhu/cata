export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

function isSulfuras(item:Item ) {
  return item.name === 'Sulfuras, Hand of Ragnaros'
}

function isBrie(item:Item ) {
  return item.name === 'Aged Brie'
}

function isPass(item:Item) {
  return item.name === 'Backstage passes to a TAFKAL80ETC concert'
}

function incrementPass(item:Item) {
  if (item.sellIn < 6) {
    return 3;
  }
  if (item.sellIn < 11) {
    return 2;
  }
  return 1;
}
function increaseQuality(item:Item,increment: number) {
  if (item.quality + increment > 50) {
    item.quality = 50
  } else {
    item.quality += increment
  }
}

function decreaseQuality(item:Item,decrease: number) {
  if (item.quality - decrease < 0) {
    item.quality = 0
  } else {
    item.quality -= decrease
  }
}
function decreaseSellIn(item:Item) {
  item.sellIn -= 1
}
function updateItem(item:Item) {
  if (!isBrie(item) && !isPass(item)) {
    decreaseQuality(item, 1)
  } else {
    if (isPass(item)) {
      increaseQuality(item, incrementPass(item))
    }else{
      increaseQuality(item, 1)
    }
  }
  decreaseSellIn(item) 
  if (item.sellIn < 0) {
    if (!isBrie(item)) {
      if (!isPass(item)) {
        decreaseQuality(item,1)
      } else {
        decreaseQuality(item,item.quality)
      }
    } else {
      increaseQuality(item, 1)
    }
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(item => {
      if (isSulfuras(item)) {
        return;
      }
      updateItem(item); 
    });
    return this.items;
  }
}
