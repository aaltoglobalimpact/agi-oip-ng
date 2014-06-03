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
            this.dataUrl = dataUrl;
            var $hostDiv = $("#" + this.divID);
            $hostDiv.addClass("oip-controller-root");
            $hostDiv.data("oip-controller", this);
            var me = this;
            var $initialDeferred = $.Deferred();
            me.$initialized = $initialDeferred.promise();
            $hostDiv.on("click", ".oip-controller-command", function (event) {
                me.handleEvent($(this), "click", event);
            });
            me.ControllerInitialize($initialDeferred);
        };

        ViewControllerBase.prototype.ControllerInitialize = function ($initialDeferred) {
            throw "ControllerInitialize not implemented";
        };

        ViewControllerBase.prototype.ExecuteCommand = function (commandName) {
            var commandFunction = this[commandName];
            if (_.isFunction(commandFunction)) {
                commandFunction.call(this);
            } else
                throw "Command implementing function not found: " + commandName;
        };

        ViewControllerBase.prototype.ExecuteOperation = function (operationDomain, operationName, parameters) {
            var callBackName = operationName + "Callback";
            var callBack = this[callBackName];
            if (!_.isFunction(callBack)) {
                callBack = null;
            } else {
                callBack = function () {
                    callBack.call(this);
                };
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
            commandFunction.call(this);
        };

        ViewControllerBase.prototype.$getSelectedFieldsWithin = function (selector) {
            var $hostDiv = $("#" + this.divID);
            return $hostDiv.find(selector);
        };

        ViewControllerBase.prototype.$getNamedFieldWithin = function (controlName) {
            var $hostDiv = $("#" + this.divID);
            return $hostDiv.find("[name='" + controlName + "']");
        };
        return ViewControllerBase;
    })();

    
    return ViewControllerBase;
});
