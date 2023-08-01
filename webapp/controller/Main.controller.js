sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("fiori.cap.fioriwithcapp.controller.Main", {
            onInit: function () {
                const that = this
                const oService = this.getOwnerComponent().getModel("mainService")
                oService.read("/TwoFACode", {
                    success: function (res) {
                        const response = res.results[0];
                        let QRimage = response.image.substring(1);
                        var oModel = new JSONModel({
                            HTML: `<img src=${QRimage}>`
                        });
                        that.getView().setModel(oModel,"QRModel")
                        that.byId("idHTMLContent").setContent(`<img src="${QRimage}">`);
                    },
                    error: function (err) {
                        console.log(err)
                    }

                });
            }
        });
    });
