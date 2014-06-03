/**
* Created by kalle on 31.5.2014.
*/
define(["require", "exports"], function(require, exports) {
    var ViewControllerBase = (function () {
        function ViewControllerBase(divID, currOPM, currUDG) {
            this.divID = divID;
            this.currOPM = currOPM;
            this.currUDG = currUDG;
        }
        ViewControllerBase.prototype.Initialize = function (dataUrl) {
            throw "Initialize not implemented";
        };

        ViewControllerBase.prototype.ExecuteCommand = function (commandName) {
            var commandFunction = this[commandName];
            if (_.isFunction(commandFunction))
                commandFunction();
            else
                throw "Command implementing function not found: " + commandName;
        };

        ViewControllerBase.prototype.ExecuteOperation = function (operationDomain, operationName, parameters) {
            var callBackName = operationName + "Callback";
            var callBack = this[callBackName];
            if (!_.isFunction(callBack)) {
                callBack = null;
            }
            this.currOPM.ExecuteOperationWithAjax(operationName, parameters, callBack);
        };

        ViewControllerBase.prototype.VisibleTemplateRender = function () {
            throw "VisibleTemplateRender not implemented";
        };

        ViewControllerBase.prototype.InvisibleTemplateRender = function () {
            throw "InvisibleTemplateRender not implemented";
        };

        ViewControllerBase.prototype.handleEvent = function ($source, eventName, eventData) {
            var commandName = $source.data("oip-command");
            var commandFunction = this[commandName];
            if (!_.isFunction(commandFunction))
                throw "Controller's command function not implemented: " + commandName;
            commandFunction();
        };
        return ViewControllerBase;
    })();

    
    return ViewControllerBase;
});
