"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Product = void 0;

var _entityArchetype = require("@autonomy/entity-archetype");

var _UnpublishProducts = require("./UnpublishProducts");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Product extends _entityArchetype.ActiveRecord {
  async unpublish() {
    this.published = true;
    await this.update();
  }

}

exports.Product = Product;

_defineProperty(Product, "subset", (0, _entityArchetype.subsetOf)(Product));

_defineProperty(Product, "loadProduct", (0, _entityArchetype.toLoad)(Product));

_defineProperty(Product, "publishedProducts", Product.subset`published = TRUE`);

_defineProperty(Product, "batchLoadProducts", Product.subset`id IN :productIds`);

_defineProperty(Product, "draftProductCountOfCategory", (0, _entityArchetype.sqlView)`SELECT COUNT(*) as totalCount FROM ${Product} WHERE NOT published AND category = :category`);

_defineProperty(Product, "unpublishProducts", (0, _entityArchetype.toRun)(_UnpublishProducts.UnpublishProducts));