goog.provide('basic.one');

goog.require('goog.array');
goog.require('goog.array.ArrayLike');



/**
 * Constructor.
 * @param {goog.array.ArrayLike} things Things.
 * @constructor
 */
basic.one.Class = function(things) {

  /**
   * @type {goog.array.ArrayLike}
   * @private
   */
  this.things_ = things;

};


/**
 * Do something for each thing.
 * @param {function()} fn Function to be called with each thing.
 */
basic.one.Class.prototype.forEach = function(fn) {
  goog.array.forEach(this.things_, fn);
};
