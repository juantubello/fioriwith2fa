sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MT) {
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
                            HTML: `<img src=${QRimage}>`,
                            secret: response.secret
                        });
                        that.getView().setModel(oModel, "QRModel")
                        that.byId("idHTMLContent").setContent(`<img src="${QRimage}">`);
                    },
                    error: function (err) {
                        console.log(err)
                    }

                });
            },
            onPress: function () {
                const inputToken = this.byId("inputText")
                const token = inputToken.getValue()
                const oService = this.getOwnerComponent().getModel("mainService")
                oService.read(`/verifyToken(token='${token}')`, {
                    success: function (res) {
                        if (res.isValid) {
                            MT.show("✔️ Token valido ✔️")
                            inputToken.setValueState("Success")
                        } else {
                            MT.show("❌ Token invalido ❌")
                            inputToken.setValueState("Error")
                        }

                    },
                    error: function (err) {
                        console.log(err)
                    }

                });

            },
            onChange: function (oEvent) {
                const oState = oEvent.getParameters("state")
                const inputToken = this.byId("inputText")
                const labelToken = this.byId("l-token")
                const qrCode = this.byId("idHTMLContent")
                const button = this.byId("b-btn-token")
                const textoQR = this.byId("l-qr-desc")
                if (oState.state) {
                    inputToken.setVisible(false)
                    labelToken.setVisible(false)
                    qrCode.setVisible(true)
                    textoQR.setVisible(true)
                    button.setVisible(false)
                } else {
                    inputToken.setVisible(true)
                    labelToken.setVisible(true)
                    qrCode.setVisible(false)
                    textoQR.setVisible(false)
                    button.setVisible(true)
                }

            }
        });
    });
