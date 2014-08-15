(function(){
  'use strict';

  $(document).ready(function(){
    $('.asset').click(sellAsset);
  });

  function sellAsset(){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        name  = $(this).text().split(' ')[0],
        type  = 'delete',
        url   = '/gamblers/'+id+'/assets/'+name;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $asset = $('.asset');
      $asset.fadeOut();

      setTimeout(function(){$asset.remove();}, 2000);
    }});
  }

})();

