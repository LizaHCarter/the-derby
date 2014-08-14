(function(){
  'use strict';

  $(document).ready(function(){
    $('.asset').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        name  = $(this).text().split(' ')[0];
    console.log(id, name);
  }

})();

