/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    var CategoriesViewController = (function () {
        function CategoriesViewController() {
        }
        CategoriesViewController.prototype.VisibleTemplateRender = function () {
            alert("categories visible renderer");
        };

        CategoriesViewController.prototype.InvisibleTemplateRender = function () {
            alert("categories invisible renderer");
        };
        return CategoriesViewController;
    })();

    
    return CategoriesViewController;
});
