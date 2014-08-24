(function(){dust.register("Modals.dust",body_0);function body_0(chk,ctx){return chk.partial("modal_begin.dust",ctx,{"modal_name":"AddNewContentModal"}).write("<h2>Adding a new update</h2><div class=\"row\"><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#c7c7c7;text-align: center\"><input type=\"file\" name=\"ImageData\"><a class=\"button small oipfile\" data-oipfile-filegroupid=\"imageDataImage\" data-oipfile-buttontype=\"select\">Select</a><a class=\"button small oipfile\" data-oipfile-filegroupid=\"imageDataImage\" data-oipfile-buttontype=\"remove\">Remove</a><img class=\"oipfile\" style=\"max-height: 247;width: 100%\" src=\"../assets/controlpanel/images/lightGray.jpg\" data-oipfile-noimageurl=\"../assets/controlpanel/images/lightGray.jpg\" data-oipfile-filegroupid=\"imageDataImage\"></div></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form id=\"form-addNewContentModal\" method='POST' enctype='multipart/form-data' data-abide=\"ajax\"><div class=\"title-field\"><label>Title<input type=\"text\" name=\"Title\" required/></label><small class=\"error\">A title to this update is required.</small></div><div class=\"published-field hide\"><label>Published<input type=\"text\" name=\"Published\" required/></label><small class=\"error\">Published date this update is required.</small></div><div class=\"author-field\"><label>Author<input type=\"text\" name=\"Author\" required/></label><small class=\"error\">Please type the author of this update.</small></div><!--<div class=\"categories-field\"><label>Categories</label> <input type=\"text\" id=\"addNewContentModal-categories\"/></div>--><div class=\"categories-field\"><label>Categories<select name=\"Categories\" multiple style=\"height: 120px; background-image: none\"></select></label></div></form></div></div></div><div class=\"row\"><div class=\"large-12 columns\"><div class=\"excerpt-field\"><label>Excerpt<textarea rows=\"5\" name=\"Excerpt\"/></label></div></div></div><div class=\"row\"><div class=\"large-12 columns right textAreaEditorDiv\"><label>Content</label><!--<textarea id=\"addNewContentModal-content\" cols=\"50\"style=\"height: 300px;\"></textarea><textarea cols=\"50\" id=\"area4\">HTML <b>content</b> <i>default</i> in textarea</textarea>--><div name=\"textareaDivHolder\"><textarea name=\"Content\" style=\"height: 300px;\"></textarea></div></div></div><div class=\"row\" name=\"attachmentRow\" style=\"margin:10px auto 0 auto;background-color: rgb(244, 244, 244); width:95% !important;\"><div class=\"small-6 medium-6 large-6 columns\"><div>Attachments can be added after post is initially saved and opened for edit.</div></div></div> <!--Closes addNewPost-attachmenRow--><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"SaveNewContent","button_label":"Save","style":"float:right;font-color:Green"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"EditContentModal"}).write("<h2>Editing content</h2><div class=\"row\"><div class=\"large-6 columns\" style=\"padding-right: 0;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#c7c7c7;text-align: center\"><input type=\"file\" name=\"ImageDataFileInput\"><a class=\"button small oipfile\" data-oipfile-filegroupid=\"editModal\" data-oipfile-buttontype=\"select\">Select</a><a class=\"button small oipfile\" data-oipfile-filegroupid=\"editModal\" data-oipfile-buttontype=\"remove\">Remove</a><img class=\"oipfile\" style=\"max-height: 247;width: 100%\" src=\"../assets/controlpanel/images/lightGray.jpg\" data-oipfile-noimageurl=\"../assets/controlpanel/images/lightGray.jpg\" data-oipfile-filegroupid=\"editModal\"></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form id=\"form-editContentModal\" method='POST' enctype='multipart/form-data' data-abide=\"ajax\"><div class=\"title-field\"><label>Title<input type=\"text\" name=\"Title\"required/></label><small class=\"error\">A title to this update is required.</small></div><div class=\"published-field\"><label>Published<input type=\"text\" name=\"Published\" required/></label><small class=\"error\">A published date is required.</small></div><div class=\"author-field\"><label>Author<input type=\"text\" name=\"Author\"></label></div><div class=\"categories-field\"><label>Categories<select name=\"Categories\" multiple style=\"height: 100px; background-image: none\"></select></label></div><input type=\"hidden\" name=\"ID\"/><input type=\"hidden\" name=\"ETag\"/><input type=\"hidden\" name=\"RelativeLocation\"/></form></div></div></div><div class=\"row\"><div class=\"large-12 columns\"><div class=\"excerpt-field\"><label>Excerpt<textarea rows=\"5\" name=\"Excerpt\"/></label></div></div></div><div class=\"row\"><div class=\"large-12 columns right textAreaEditorDiv\"><label>Content</label><div name=\"TextAreaDivHolder\"></div></div></div><div class=\"row\" name=\"attachmentRow\" style=\"margin:10px auto 0 auto;background-color: rgb(244, 244, 244); width:95% !important;\"><div class=\"large-12 columns\" name=\"AttachmentListDiv\"></div><div class=\"small-6 medium-6 large-6 columns\"><div><label>Attachment</label><input type=\"file\" name=\"AttachmentBinaryData\"></div></div><div class=\"small-6 medium-6 large-6 columns\" style=\"vertical-align: middle; display: inline-block;\">").partial("insidemodal_button.dust",ctx,{"command":"EditContentUploadAttachment","style":"margin-top:5%;","button_label":"Upload"}).write("</div></div> <!--Closes addNewPost-attachmenRow--><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"SaveExistingContent","button_label":"Save","style":"float:right;font-color:Green"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"ViewContentModal"}).write("<div class=\"row\"><div class=\"large-4 columns\" id=\"viewContentModal-image\"></div><div class=\"large-8 columns\"><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><spanid=\"viewContentModal-categories\" class=\"fancyTagBig\"></span></div><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><iclass='icon-pencil fancyTextColor font80'></i>&nbsp;<span id=\"viewContentModal-Author\"class=\"discreetLinks\"></span></div><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><iclass='icon-calendaralt-cronjobs fancyTextColor font80'></i>&nbsp;<span id=\"viewContentModal-Date\"class=\"discreetLinks\"></span></div></div><div class=\"large-8 columns\" style=\"padding-right:0;padding-top: 0;padding-bottom:0;\"><div class=\"content-card-line\"><hr></div></div><div class=\"large-8 columns\" style=\"padding-bottom: 12px;padding-right:10px;padding-top:10px;\"><strong><spanname=\"Title\" class=\"hugeTitleText\"></span></strong><br></div><div class=\"large-8 columns\" style=\"padding-right:15px;\"><span id=\"viewContentModal-excerpt\"class=\"contentCardExcerpt bigTitleText discreetTextColor\"></span></div></div><div class=\"row\"><div class=\"large-12 columns\" style=\"height:20px;\"></div></div><div class=\"row\"><div class=\"large-12 columns articleText\" id=\"viewContentModal-content\"style=\"padding-left: 15px !important; padding-right: 15px !important;\"></div></div><div class=\"row\"><div id=\"viewContentModal-attachments\"></div></div><br><div class=\"row\" id=\"viewModalcommentarea-row\"><div class=\"large-12 columns\"><div id=\"viewmodalcommentareaph\"></div></div></div><div class=\"row\"><div class=\"large-12\"><br>").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Close","style":"float:right !important;"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"AddLinkToContentModal"}).write("<h2>Adding a new Link To Content</h2><div class=\"row\"><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#c7c7c7;text-align: center\"><input type=\"file\" name=\"ImageData\"><a class=\"button small oipfile\" data-oipfile-filegroupid=\"imageDataImage\"data-oipfile-buttontype=\"select\">Select</a><a class=\"button small oipfile\" data-oipfile-filegroupid=\"imageDataImage\"data-oipfile-buttontype=\"remove\">Remove</a><img class=\"oipfile\" style=\"max-height: 247;width: 100%\"src=\"../assets/controlpanel/images/lightGray.jpg\"data-oipfile-noimageurl=\"../assets/controlpanel/images/lightGray.jpg\"data-oipfile-filegroupid=\"imageDataImage\"></div></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form><div class=\"text-field\"><label>URL<input type=\"text\" name=\"URL\"/></label></div><div class=\"title-field\"><label>Title<input type=\"text\" name=\"Title\"/></label></div><div class=\"categories-field\"><label>Categories<select name=\"Categories\" multiple style=\"height: 120px; background-image: none\" /></label></div></form></div></div></div><div class=\"row\"><div class=\"large-12 columns\"><div class=\"excerpt-field\"><label>Description<textarea rows=\"5\" name=\"Description\"/></label></div></div></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"SaveNewLinkToContent","button_label":"Save","style":"float:right;font-color:Green"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"EditLinkToContentModal"}).write("<h2>Editing Link To Content</h2><div class=\"row\"><div class=\"large-6 columns\" style=\"padding-right: 0;\"><div style=\"width: 100%;margin: 0px;padding: 0px;height:300px; background-color:#c7c7c7;text-align: center\"><input type=\"file\" name=\"ImageDataFileInput\"><a class=\"button small oipfile\" data-oipfile-filegroupid=\"editModal\"data-oipfile-buttontype=\"select\">Select</a><a class=\"button small oipfile\" data-oipfile-filegroupid=\"editModal\"data-oipfile-buttontype=\"remove\">Remove</a><img class=\"oipfile\" style=\"max-height: 247;width: 100%\" src=\"../assets/controlpanel/images/lightGray.jpg\"data-oipfile-noimageurl=\"../assets/controlpanel/images/lightGray.jpg\"data-oipfile-filegroupid=\"editModal\"></div></div><div class=\"large-6 columns\"><div style=\"width: 100%; height: auto;margin: 0px;padding: 0px;\"><form><div class=\"text-field\"><label>URL<input type=\"text\" name=\"URL\"></label></div><div class=\"title-field\"><label>Title<input type=\"text\" name=\"Title\"></label></div><div class=\"categories-field\"><label>Categories<select name=\"Categories\" multiple style=\"height: 120px; background-image: none\" /></label></div><input type=\"hidden\" name=\"ID\"/><input type=\"hidden\" name=\"ETag\"/><input type=\"hidden\" name=\"RelativeLocation\"/></form></div></div></div><div class=\"row\"><div class=\"large-12 columns\"><div class=\"excerpt-field\"><label>Description<textarea rows=\"5\" name=\"Description\"/></label></div></div></div><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"SaveExistingLinkToContent","button_label":"Save","style":"float:right;font-color:Green"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"ViewLinkToModal"}).write("<div class=\"row\"><div class=\"large-4 columns\" id=\"viewContentModal-image\"></div><div class=\"large-8 columns\"><div class=\"itemWrapper-fixedWidth\" style=\"padding-right: 10px;padding-bottom: 5px;\"><spanid=\"viewContentModal-categories\" class=\"fancyTagBig\"></span></div></div><div class=\"large-8 columns\" style=\"padding-right:0;padding-top: 0;padding-bottom:0;\"><div class=\"content-card-line\"><hr></div></div><div class=\"large-8 columns\" style=\"padding-bottom: 12px;padding-right:10px;padding-top:10px;\"><strong><spanname=\"Title\" class=\"hugeTitleText\"></span></strong><br></div><div class=\"large-8 columns\" style=\"padding-right:15px;\"><span name=\"Description\"class=\"contentCardExcerpt bigTitleText discreetTextColor\"></span></div></div><div class=\"row\"><div name=\"LinkToURL\" class=\"large-12 columns\" style=\"height:20px;\"></div></div><div class=\"row\"><div class=\"large-12 columns articleText\" name=\"LinkToIFrame\"style=\"padding-left: 15px !important; padding-right: 15px !important;\"></div></div><br><div class=\"row\"><div class=\"large-12 columns\"><div Name=\"CommentArea\"></div></div></div><div class=\"row\"><div class=\"large-12\"><br>").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Close","style":"float:right !important;"}).write("</div></div>").partial("modal_end.dust",ctx,null).partial("modal_begin.dust",ctx,{"modal_name":"AlertContentDeleteConfirm"}).write("<h3>Are you sure you want to delete this item?</h3>").partial("hiddeninput.dust",ctx,{"field_name":"ID"}).partial("hiddeninput.dust",ctx,{"field_name":"ObjectName"}).partial("hiddeninput.dust",ctx,{"field_name":"DomainName"}).write("<div name=\"ContentDescription\"/><div class=\"row\" style=\"margin-top: 20px;\"><div class=\"large-12 columns\">").partial("insidemodal_button.dust",ctx,{"command":"Common_CloseOpenModal","button_label":"Cancel","style":"float: right;"}).write("<div style=\"width: 10px;float: right;\">&nbsp;</div>").partial("insidemodal_button.dust",ctx,{"command":"DeleteContent","button_label":"Delete","style":"float:right;font-color:Red"}).write("</div></div>").partial("modal_end.dust",ctx,null);}return body_0;})();