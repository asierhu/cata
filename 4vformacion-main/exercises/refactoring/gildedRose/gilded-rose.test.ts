import { expect, test, describe } from "bun:test";
import { Item, GildedRose } from "./gilded-rose";

describe("Gilded Rose", () => {
  test("should decrease quality and sellIn for normal items", () => {
    // Arrange
    const items = [new Item("foo", 10, 10)];
    const gildedRose = new GildedRose(items);
    
    // Act
    gildedRose.updateQuality();
    
    // Assert
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(9);
  });

  test("should decrease sellIn and double the quality for normal items", () => {
    // Arrange
    const items = [new Item("foo", 0, 10)];
    const gildedRose = new GildedRose(items);
    
    // Act
    gildedRose.updateQuality();
    
    // Assert
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
  });

  test("Quality shouldn't go below zero", () => {
    // Arrange
    const items = [new Item("foo", 10, 0)];
    const gildedRose = new GildedRose(items);
    
    // Act
    gildedRose.updateQuality();
    
    // Assert
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  });

  test.skip("Quality shouldn't go above 50", () => {
    // Arrange
    const items = [new Item("foo", 10, 55)];
    const gildedRose = new GildedRose(items);
    
    // Act
    gildedRose.updateQuality();
    
    // Assert
    expect(items[0].name).toBe("foo");
    expect(items[0].quality).toBe(50);
  });
  
  describe("Aged Brie", () => {
    test("'Aged Brie' should increase quality", () => {
      // Arrange
      const items = [new Item("Aged Brie", 10, 10)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(11);
    });

    test("'Aged Brie' should increase double the quality after SellIn", () => {
      // Arrange
      const items = [new Item("Aged Brie", -1, 10)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toBe(-2);
      expect(items[0].quality).toBe(12);
    });

    test("Quality shouldn't go above 50", () => {
      // Arrange
      const items = [
        new Item("Aged Brie", 10, 50),
        new Item("Aged Brie", 0, 50),
      ];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Aged Brie");
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(50);

      expect(items[1].name).toBe("Aged Brie");
      expect(items[1].sellIn).toBe(-1);
      expect(items[1].quality).toBe(50);
    });
  });

  describe("Sulfuras, Hand of Ragnaros", () => {
    test("'Sulfuras, Hand of Ragnaros' should not deacrease quality", () => {
      // Arrange
      const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
      expect(items[0].sellIn).toBe(10);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes to a TAFKAL80ETC concert", () => {
    test("'Backstage passes to a TAFKAL80ETC concert' should increase double the quality when there are 10 days or less", () => {
      // Arrange
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBe(9);
      expect(items[0].quality).toBe(12);
    });

    test("'Backstage passes to a TAFKAL80ETC concert' should increase triple the quality when there are 5 days or less", () => {
      // Arrange
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBe(4);
      expect(items[0].quality).toBe(13);
    });

    test("'Backstage passes to a TAFKAL80ETC concert' should decrease to 0 when there are less than 0 days", () => {
      // Arrange
      const items = [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 10)];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBe(-1);
      expect(items[0].quality).toBe(0);
    });

    test("Quality shouldn't go above 50", () => {
      // Arrange
      const items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 12, 50),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48),
      ];
      const gildedRose = new GildedRose(items);
      
      // Act
      gildedRose.updateQuality();
      
      // Assert
      expect(items[0].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[0].sellIn).toBe(11);
      expect(items[0].quality).toBe(50);

      expect(items[1].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[1].sellIn).toBe(9);
      expect(items[1].quality).toBe(50);

      expect(items[2].name).toBe("Backstage passes to a TAFKAL80ETC concert");
      expect(items[2].sellIn).toBe(4);
      expect(items[2].quality).toBe(50);
    });
  });
});
