(function(){dust.register("FileManager.dust",body_0);function body_0(chk,ctx){return chk.partial("FileUploadPanel.dust",ctx,null).write("<div class=\"row\"><div class=\"large-12 columns\" id=\"fileTableDivContainer\">").partial("Filelist.dust",ctx,null).write("</div></div>");}return body_0;})();