(function() {
  'use strict';

  angular
    .module('app',[])
    .config(config)
    .config(configTranslation)
    .config(configCompilerProvider)
    .config(configFlowFactoryProvider);

  /** @ngInject */
  function config($logProvider, toastrConfig){
    //Enable log
    $logProvider.debugEnabled(true);

    // Set otion thrid-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true ;
    toastrConfig.progressBar = true ;
  }

  /** @ngInject */
  function configTranslation($translateProvider){
    $translateProvider.useUrlLoader('http://localhost:8080/messageBundle');
    $translateProvider.useStorage('UrlLanguageStorage');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }

  /** @ngInject */
  function configFlowFactoryProvider(flowFactoryProvider) {
    flowFactoryProvider.default = {
      target: '',
      permanentErrors: [500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: false
    };
  }
    /** @ngInject */

    function configCompilerProvider($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
    }


})();
