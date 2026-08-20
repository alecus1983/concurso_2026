/*global app, $on */
(function () {
  'use strict';

  /**
   * Sets up a brand new Daruma app.
   *
   */
  function DarumaApp() {
    this.i18n = new Daruma.I18N(null);
    this.config = new Daruma.Config();
    this.utils = new Daruma.Utils();
    this.core = new Daruma.Core();
  }

  var daruma = new DarumaApp();

  function init() {
  }

  $(window).on('load', init);

  window.daruma = daruma;
})();