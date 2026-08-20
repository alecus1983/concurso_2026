(function($) {
    $.fn.jpdf = function( options ) {
          var settings = $.extend({
            path         : '/pdf/1.pdf',
            scale        : 2,
            languaje     : 'en'
          }, options);
          this.html("");
          var permLang = ['en','es'];
          if($.inArray(settings.languaje, permLang)==-1)
          {
            console.log('unexistant languaje');
            settings.languaje = 'en';
          };

          var lang = {
            'en':{
              'next':'Next',
              'prev':'Previous',
              'first':'First',
              'last':'Last',
              'label':'Page: ',
              'labelmax':' Of ',
              'alert':'Please Wait... Loading Document'
            },
            'es':{
              'next':'Siguiente',
              'prev':'Anterior',
              'first':'Primera',
              'last':'Ultima',
              'label':'Pagina: ',
              'labelmax':' De ',
              'alert':'Por favor Espere... Cargando Documento'
            }
          };

          lang = lang[settings.languaje];

          console.log('creating variables');
          var pageShowing = 1;
          var numberPages = 0;
          var containerName = this.attr('id');

          var filePath = settings.path ;
          var currentPage = 1;
          function Num(num) {
            var num = num;
            return function () {
              return num;
            };
          };

          var Init = function(){
            var container = $('#'+containerName);
            var controler = document.createElement('div');
            controler.id = "pdfControler";
            controler.className = "pdfControler";
            controler = $(controler);
            container.append(controler);

            var buttonNext = $(document.createElement('button'));
            var buttonPrev = $(document.createElement('button'));
            var buttonFirst = $(document.createElement('button'));
            var buttonLast = $(document.createElement('button'));
            var gotolabel = $(document.createElement('span'));
            var gotomax = $(document.createElement('label'));
            var gotop = $(document.createElement('input'));
            gotop.type = 'number';
            gotop.min = '1';
            
            buttonFirst.html( lang['first'] );
            buttonFirst.addClass('pdfBtn');
            buttonFirst.attr('id','pdfBtnFirst');
            controler.append(buttonFirst);
            $('#pdfBtnFirst').click(goToFirst);

            buttonPrev.html( lang['prev'] );
            buttonPrev.addClass('pdfBtn');
            buttonPrev.attr('id','pdfBtnPrev');
            controler.append(buttonPrev);
            $('#pdfBtnPrev').click(previousPage);

            buttonNext.html( lang['next'] );
            buttonNext.addClass('pdfBtn');
            buttonNext.attr('id','pdfBtnNext');
            controler.append(buttonNext);
            $('#pdfBtnNext').click(nextPage);

            buttonLast.html( lang['last'] );
            buttonLast.addClass('pdfBtn');
            buttonLast.attr('id','pdfBtnLast');
            controler.append(buttonLast);
            $('#pdfBtnLast').click(goToLast);

            gotolabel.html( lang['label'] );
            gotomax.html( lang['labelmax'] );

            gotop.addClass('pdfInputGoTo');
            gotop.attr('value',1);
            gotop.attr('id','InputGoTo');
            gotop.attr('type','number');
            gotop.attr('min','1');
            controler.append(gotolabel);
            controler.append(gotop);
            controler.append(gotomax);
            document.getElementById('InputGoTo').addEventListener('keyup', function() {
              // Handle the user inputting a floating point number.
              pageToGo = (this.value | 0 );
              goToPage(pageToGo);
            });
            document.getElementById('InputGoTo').addEventListener('change', function() {
              // Handle the user inputting a floating point number.
              pageToGo = (this.value | 0 );
              goToPage(pageToGo);
            });
          };


          function showPage(page){
            if (document.getElementById(page)==null) {
              alert(lang['alert']);
            }
            else{
              var canvasH = document.getElementById(pageShowing);
              var canvasS = document.getElementById(page);
              var input = document.getElementById('InputGoTo');
              canvasH.className = "hide pdfCanvas";
              canvasS.className = " pdfCanvas";
              input.value = pageShowing = page; 
            };
          };

          var goToFirst = function(){
            showPage(1);
          };

          var goToLast = function(){
            showPage(numberPages);
          };

          var goToPage = function(pageto){
            pageto = parseInt(pageto);
            if(pageto<1) pageto = 1;
            if(pageto<numberPages){
              toshow = pageto;
              showPage(toshow);
            };
          };

          var nextPage = function(){
            //console.log('nobody wants to get free');
            if(pageShowing<numberPages){
              toshow = pageShowing + 1;
              showPage(toshow);
            };
          };

          var previousPage = function (){
            if(pageShowing>1){
              toshow = pageShowing - 1;
              showPage(toshow);
            };
          };

          function renderPDF(url, canvasContainer, options) {
            var options = options || { scale: settings.scale },          
              func,
              pdfDoc,
              def = $.Deferred(),
              promise = $.Deferred().resolve().promise(),
              width, 
              height,
              makeRunner = function(func, args) {
                return function() {
                  return func.call(null, args);
                };
              };             

              function renderPage(num) {          
                  var def = $.Deferred(),
                    currPageNum = new Num(num);

                  pdfDoc.getPage(currPageNum()).then(function(page) {
                    var viewport = page.getViewport(options.scale);
                    var canvas = document.createElement('canvas');
                    canvas.className = canvas.className + ' pdfCanvas';
                    var ctx = canvas.getContext('2d');
                    var renderContext = {
                      canvasContext: ctx,
                      viewport: viewport
                    };

                      canvas.id=currPageNum();

                      if(currPageNum() === 1) { 
                          canvas.className = " pdfCanvas";            
                          height = viewport.height;
                          width = viewport.width;
                      }
                      else{

                        canvas.className = canvas.className + " hide";
                      };

                      canvas.height = height;
                      canvas.width = width;

                      canvasContainer.appendChild(canvas);

                      page.render(renderContext).then(function() {                                        
                          def.resolve();
                      });
                  })

                  return def.promise();
              }

              function renderPages(data) {
                  pdfDoc = data;

                  var pagesCount = pdfDoc.numPages;
                  numberPages = pdfDoc.numPages;
                  $('#pdfControler').append($(document.createElement('span')).html(numberPages));
                  $('#InputGoTo').attr('max',numberPages);
                  for (var i = 1; i <= pagesCount; i++) { 
                      func = renderPage;
                      promise = promise.then(makeRunner(func, i));
                  }
              }

              PDFJS.disableWorker = true;
              PDFJS.getDocument(url).then(renderPages);       
          };

          Init();
          var container = document.getElementById(containerName);
          renderPDF(filePath, container);
          return 0;
      };
}(jQuery));