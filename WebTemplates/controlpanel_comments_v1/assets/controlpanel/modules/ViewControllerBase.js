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

            // FOR SOME REASON - the $hostDiv element IS NOT covering all events within, for example a modal...
            //$hostDiv.on("click", ".oip-controller-command", function(event) {
            // ... and FOR SOME OTHER REASON - the below (which narrows it down to this #div and its children)...
            // ... FAILS TO FIRE on the modal again... => so we're back at direct div + class filter
            //$(document).on("click", "#" + this.divID + " .oip-controller-command", function(event) {
            // The reason found - foundation MOVES the modal on reveal elsewhere on the element tree...
            $hostDiv.on("click", ".oip-controller-command", function (event) {
                me.handleEvent($(this), "click", event);
            });
            me.ControllerInitialize($initialDeferred);
            $.when($initialDeferred.promise()).then(function () {
                var $me = $hostDiv;
                $me.foundation();
                var wnd = window;
                $me.find(".oip-modalbutton").on("click", wnd.ControllerCommon.ModalButtonClick);
                $me.find(".oip-controller-modal").data("oip-controller-instance", me);
            });
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

            //this.currOPM.ExecuteOperationWithAjax(operationName, parameters, callBack);
            this.currOPM.ExecuteOperationWithForm(operationName, parameters, callBack);
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
                throw "Controller's command function not implemented: " + commandName + " on hostind div: " + this.divID;
            ;
            commandFunction.call(this, $source, eventName, eventData);
        };

        ViewControllerBase.prototype.handleModalEvent = function ($modal, $source, eventName, eventData) {
            var commandName = "Modal_" + $source.data("oip-command");
            var commandFunction = this[commandName];
            if (!_.isFunction(commandFunction))
                throw "Controller's command function not implemented: " + commandName + " on hostind div: " + this.divID;
            ;
            commandFunction.call(this, $modal, $source);
        };

        ViewControllerBase.prototype.Modal_Common_CloseOpenModal = function ($modal, $source) {
            $modal.foundation('reveal', 'close');
        };

        ViewControllerBase.prototype.$getSelectedFieldWithinModal = function ($modal, selector) {
            return $modal.find(selector);
        };

        ViewControllerBase.prototype.$getNamedFieldWithinModal = function ($modal, controlName) {
            return $modal.find("[name='" + controlName + "']");
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
