(function($){
	$.fn.AjaxPagination = function(options){
		var opts = {
			PaginationSelector : 'div.paginate',
			CurrentPageSelector : '.current',
			NextPageLinkSelector : '.next a',
			PreviousPageLinkSelector : '.prev a',
			CallBackWhenNextOrPreviousPageIsLoaded : function(){},
			CallBack:function(){}
		};
		
		opts = $.extend(opts, options);
		
		var pagination = $(this);
		var currentPage = $(opts.CurrentPageSelector, pagination);
		var nextPageLink = $(opts.NextPageLinkSelector, pagination);
		var previousPageLink = $(opts.PreviousPageLinkSelector, pagination);
		var initialNextPageLink = nextPageLink;
		
				
		var needToLoadOnlyNextPages = (previousPageLink.length == 0 && nextPageLink.length == 1);
        var needToLoadOnlyPreviousPages = (previousPageLink.length == 1 && nextPageLink.length == 0);
        var needToLoadBothPreviousAndNextPages = (previousPageLink.length == 1 && nextPageLink.length == 1);
      
	
		var AjaxWrapper = function(url, callback){
		  if(url == null || url == ''){
			return;
		  }
		  $.ajax({ 
			url: url, 
			success:function(data){
				callback(data);
			}
		  });
		};
		
		var PageLoadedCallBack = function(data){
			opts.CallBackWhenNextOrPreviousPageIsLoaded(data);
			pagination = $(data).find(opts.PaginationSelector);
			currentPage = $(opts.CurrentPageSelector, pagination);
			nextPageLink = $(opts.NextPageLinkSelector, pagination);
			previousPageLink = $(opts.PreviousPageLinkSelector, pagination);
			
			if(needToLoadOnlyNextPages && nextPageLink.length){
			  AjaxWrapper(nextPageLink.attr('href'), PageLoadedCallBack);
			}else{
				opts.CallBack();
			}
		  
			if(needToLoadOnlyPreviousPages && previousPageLink.length){
			  AjaxWrapper(previousPageLink.attr('href'), PageLoadedCallBack);
			}else{
				opts.CallBack();
			}
			
			if(needToLoadBothPreviousAndNextPages){
			  if(previousPageLink.length){
				AjaxWrapper(previousPageLink.attr('href'), PageLoadedCallBack);
			  }else if(initialNextPageLink != null){
				AjaxWrapper(initialNextPageLink.attr('href'), PageLoadedCallBack);
				needToLoadOnlyNextPages = true;
				needToLoadBothPreviousAndNextPages = false;
			  }
			}
		};

		if(needToLoadOnlyNextPages){
		  AjaxWrapper(nextPageLink.attr('href'), PageLoadedCallBack);
		}
	  
		if(needToLoadOnlyPreviousPages){
		  AjaxWrapper(previousPageLink.attr('href'), PageLoadedCallBack);
		}
	  
		if(needToLoadBothPreviousAndNextPages){
		  AjaxWrapper(previousPageLink.attr('href'), PageLoadedCallBack);
		}
	  
		if(!needToLoadOnlyNextPages && !needToLoadOnlyPreviousPages && !needToLoadBothPreviousAndNextPages){
		  opts.CallBack();
		}
	};
})(jQuery);