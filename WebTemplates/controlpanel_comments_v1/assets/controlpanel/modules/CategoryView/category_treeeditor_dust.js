(function(){dust.register("category_treeeditor.dust",body_0);function body_0(chk,ctx){return chk.write("<p><button class=\"btn oip-controller-command\" data-oip-command=\"SaveCategoryHierarchy\">Save Category Hierarchy</button></p><p>Edit categories by dragging the items below up/down (= order) and sideways (= hierarchy). Save changes by clicking button above.</p><p> add category, add categories<div name=\"nestableTree\" class=\"dd\"><ol class=\"dd-list\">").section(ctx.get("CategoriesWithChildren"),ctx,{"block":body_1},null).write("</ol></div></p>");}function body_1(chk,ctx){return chk.partial("category_treeitem.dust",ctx,null);}return body_0;})();