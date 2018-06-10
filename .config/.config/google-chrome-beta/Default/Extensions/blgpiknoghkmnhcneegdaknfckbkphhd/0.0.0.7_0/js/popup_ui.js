define([],function(){var UIViewClass=function(classes){this.classes=classes};UIViewClass.prototype.show=function(){this.classes.map(function(className){$(className).show()})};UIViewClass.prototype.hide=function(){this.classes.map(function(className){$(className).hide()})};var loggedInUI=new UIViewClass([".extension_content",".footer",".search_bar_container"]);var loggedOutUI=new UIViewClass([".logged_out_page"]);var serverErrorUI=new UIViewClass([".server_error_page"]);var UIClasses=[loggedInUI,loggedOutUI,serverErrorUI];function justShow(uiClass){for(var i=UIClasses.length-1;i>=0;i--){if(UIClasses[i]===uiClass){uiClass.show()}else{UIClasses[i].hide()}}}function hideAll(){for(var i=UIClasses.length-1;i>=0;i--){UIClasses[i].hide()}}var PopupUI={loggedInUI:loggedInUI,loggedOutUI:loggedOutUI,serverErrorUI:serverErrorUI,justShow:justShow,hideAll:hideAll};return PopupUI});