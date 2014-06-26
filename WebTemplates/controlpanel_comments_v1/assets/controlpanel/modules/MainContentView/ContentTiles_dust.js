(function(){dust.register("ContentTiles.dust",body_0);function body_0(chk,ctx){return chk.write("<div class=\"row\" id=\"isotope_content_row\"><div id=\"ModalsHolderDiv-Content\"><div id=\"addNewContentModal\" class=\"reveal-modal medium\" data-reveal><h2>Adding a new update</h2><div class=\"row\"><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#ccc;text-align: center;\"><input type=\"file\" id=\"addNewContentModal-ImageData\"></div></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form id=\"form-addNewContentModal\" method='POST' enctype='multipart/form-data' data-abide=\"ajax\"><div class=\"title-field\"><label>Title<input type=\"text\" id=\"addNewContentModal-title\" required/></label><small class=\"error\">A title to this update is required.</small></div><div class=\"published-field\"><label>Published<input type=\"text\" id=\"addNewContentModal-published\" required/></label><small class=\"error\">Published date this update is required.</small></div><div class=\"excerpt-field\"><label>Excerpt<input type=\"text\" id=\"addNewContentModal-excerpt\" required/></label><small class=\"error\">An excerpt to this update is required.</small></div><div class=\"author-field\"><label>Author<input type=\"text\" id=\"addNewContentModal-author\" required/></label><small class=\"error\">Please type the author of this update.</small></div><div class=\"categories-field\"><label>Category<select id=\"addNewContentCategorySelect\"></select></label></div><!--<div class=\"categories-field\"><label>Categories</label> <input type=\"text\" id=\"addNewContentModal-categories\"/></div>--><div class=\"hide\"><label>ID</label><input type=\"text\" class=\"hide\" id=\"addNewContentModal-id\"/></div><div class=\"hide\"><label>Image Path</label>   <input type=\"text\" class=\"hide\" id=\"addNewContentModal-imagePath\"/></div></form></div></div></div><div class=\"row\"><div class=\"large-12 columns right textAreaEditorDiv\"><label>Content</label><!--<textarea id=\"addNewContentModal-content\" cols=\"50\"style=\"height: 300px;\"></textarea><textarea cols=\"50\" id=\"area4\">HTML <b>content</b> <i>default</i> in textarea</textarea>--><div id=\"addNewTextareaDivHolder\"><textarea id=\"addNewContentModal-content\" style=\"height: 300px;\" name=\"content\"></textarea></div></div></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\"><a class=\"button\" id=\"cancelAddNewContentModal\" style=\"float: right;\">Cancel</a><div style=\"width: 10px;float: right;\">&nbsp;</div><a class=\"button\" id=\"addNewContentModal-submit\" style=\"float: right;\">Submit</a></div></div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"editContentModal\" class=\"reveal-modal medium\" data-reveal><h2>Editing content</h2><div class=\"row\"><div class=\"large-6 columns\" style=\"padding-right: 0;\"><div style=\"width: 100%;margin: 0px;padding: 0px;text-align: center;\"><input type=\"file\" id=\"editContentModal-ImageData\"></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form id=\"form-editContentModal\" method='POST' enctype='multipart/form-data' data-abide=\"ajax\"><div class=\"title-field\"><label>Title<input type=\"text\" id=\"editContentModal-title\" required/></label><small class=\"error\">A title to this update is required.</small></div><div class=\"published-field\"><label>Published<input type=\"text\" id=\"editContentModal-published\" required/></label><small class=\"error\">A published date is required.</small></div><div class=\"excerpt-field\"><label>Excerpt<input type=\"text\" id=\"editContentModal-excerpt\" required/></label><small class=\"error\">An excerpt to this update is required.</small></div><div class=\"author-field\"><label>Author<input type=\"text\" id=\"editContentModal-author\"></label></div><div class=\"categories-field\"><label>Category <select id=\"editContentModal-categories\"></select></label></div><input type=\"hidden\" id=\"editContentModal-id\"/><input type=\"hidden\" id=\"editContentModal-etag\"/></form></div></div></div><div class=\"row\"><div class=\"large-12 columns right textAreaEditorDiv\"><label>Content</label><div id=\"editTextareaDivHolder\"></div></div></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\"><a class=\"button\" id=\"cancelEditContentModal\" style=\"float: right;\">Cancel</a><div style=\"width: 10px;float: right;\">&nbsp;</div><a class=\"button\" id=\"editContentModal-submit\" style=\"float: right;\">Submit</a></div></div><a class=\"close-reveal-modal\">&#215;</a></div><div id=\"viewContentModal\" class=\"reveal-modal medium\" data-reveal><!--Begins contents of  div for the viewContentModal--><div class=\"row\"><div class=\"large-4 columns\" id=\"viewContentModal-image\"></div><div class=\"large-8 columns\"><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><span id=\"viewContentModal-categories\" class=\"fancyTagBig\"></span></div><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><i class='icon-pencil fancyTextColor font80'></i>&nbsp;<span id=\"viewContentModal-Author\" class=\"discreetLinks\"></span></div><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><i class='icon-calendaralt-cronjobs fancyTextColor font80'></i>&nbsp;<span id=\"viewContentModal-Date\" class=\"discreetLinks\"></span></div></div><div class=\"large-8 columns\" style=\"padding-right:0;padding-top: 0;padding-bottom:0;\"><div class=\"content-card-line\"><hr></div></div><div class=\"large-8 columns\" style=\"padding-bottom: 12px;padding-right:10px;padding-top:10px;\"><strong><span id=\"viewContentModal-title\" class=\"hugeTitleText\"></span></strong><br></div><div class=\"large-8 columns\" style=\"padding-right:15px;\"><span  id=\"viewContentModal-excerpt\" class=\"contentCardExcerpt bigTitleText discreetTextColor\"></span></div></div><div class=\"row\"><div class=\"large-12 columns\" style=\"height:20px;\"></div></div><div class=\"row\"><div class=\"large-12 columns articleText\" id=\"viewContentModal-content\" style=\"padding-left: 15px !important; padding-right: 15px !important;\"></div></div><div class=\"row\" id=\"viewModalcommentarea-row\"><div class=\"large-12 columns\"><div id=\"viewmodalcommentareaph\"></div></div></div><div class=\"row\"><div class=\"large-12\"><br><a class=\"button\" id=\"closeViewContentModal\" style=\"float:right !important;\">Close</a></div></div><a class=\"close-reveal-modal\">&#215;</a></div> <!--closes div for the viewContentModal--><div id=\"alert-contentUpdate-successful\" class=\"reveal-modal medium\" data-reveal><h3>The content was updated successfully.</h3><p id=\"alert-contentUpdate-successful-variables\" style=\"font-size: 85%;\"></p><a id=\"close-alert-contentUpdate-successful\" class=\"close-reveal-modal\">&#215;</a></div><div id=\"alert-addNewContent-successful-modal\" class=\"reveal-modal medium\" data-reveal><h3>The new content was sent successfully.</h3><p id=\"alert-addNewContent-successful-variables\" style=\"font-size: 85%;\"></p><a id=\"close-alert-addNewContent-successful\" class=\"close-reveal-modal\">&#215;</a></div><div id=\"alert-contentDelete-confirm\" class=\"reveal-modal medium\" data-reveal><h3>Are you sure you want to delete this item?</h3><div id=\"alert-contentDelete-confirm-ID\"></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\"><a class=\"button\" id=\"cancel-deleteContentModal\" style=\"float: right;\">Cancel</a><div style=\"width: 10px;float: right;\">&nbsp;</div><a class=\"button\" id=\"confirm-deleteModal-submit\" style=\"float: right;\">Confirm</a></div></div><a id=\"close-alert-contentDelete-confirm\" class=\"close-reveal-modal\">&#215;</a></div></div><!-- +++Isotope content starts +++++++++++++++++++++++++++++++++++++++++++++ --><div class=\"portfolioFilter\" id=\"portfolioFilterDivContainer\"></div><div class=\"large-12 columns\" id=\"contentDivContainer\" style=\"width:100%; margin: auto !important;\"></div><!-- +++Isotope content ends +++++++++++++++++++++++++++++++++++++++++++++ --></div>");}return body_0;})();