﻿$(document).ready(function () {
    var submitReconcileTransactionToWebService = function (id, reconcileDate) {
        $.ajax({
            type: "POST",
            url: "/Home/MarkTransactionReconciled",
            data: { 'id' : id, 'reconcileDate' : reconcileDate },
            success: function (resp) {
                $(".doReconcile[data-id='" + id + "']").replaceWith("<strong>" + reconcileDate + "</strong>");
            },
            error: function (xhr) {
                alert("there was an error");
            }
        });
    };

    var reconcileTransaction = function () {
        var id = $(this).data("id");
        var reconcileDate = $("#reconcileDate").val();
        if (!moment(reconcileDate).isValid()) {
            alert("Please enter a valid reconcile date");
            return;
        }
        console.log(reconcileDate);
        submitReconcileTransactionToWebService(id, reconcileDate);
    };
    
    var validate = function (trans) {
        if (trans.Desc == "") {
            alert("Must enter a description");
            return false;
        }
        if (trans.Amount == "") {
            alert("Must enter an amount");
            return false;
        }
        if (trans.DateDue != null && !moment(trans.DateDue).isValid()) {
            alert("Must enter a valid date due");
            return false;
        }
        if (trans.DatePayed != null && !moment(trans.DatePayed).isValid()) {
            alert("Must enter a valid date payed");
            return false;
        }
        if (trans.DateReconciled != null && !moment(trans.DateReconciled).isValid()) {
            alert("Must enter a valid date reconciled");
            return false;
        }
        if (trans.DateDue == null && trans.DatePayed == null) {
            alert("Must enter a date due or a date payed");
            return false;
        }
        if (trans.Account == "") {
            alert("Must select an account");
            return false;
        }
        if (trans.Ledger == "") {
            alert("Must select a ledger");
            return false;
        }
        return true;
    };

    var submitNewTransactionToWebService = function (trans) {
        $.ajax({
            type: "POST",
            url: "/Home/CreateTransaction",
            data: trans,
            success: function(resp) {
                window.location.href = document.URL;
            },
            error: function(xhr) {
                alert("there was an error");
            }
        });
    };

    var submitNewTransaction = function() {
        var trans = {};
        trans.Desc = $("#desc").val();
        trans.Amount = $("#amount").val();
        if ($("#datedue").val() !== "")
            trans.DateDue = $("#datedue").val();
        else
            trans.DateDue = null;
        if ($("#datepayed").val() !== "")
            trans.DatePayed = $("#datepayed").val();
        else
            trans.DatePayed = null;
        if ($("#datereconciled").val() !== "")
            trans.DateReconciled = $("#datereconciled").val();
        else
            trans.DateReconciled = null;
        trans.Account = $("#account").val();
        trans.Ledger = $("#ledger").val();

        if (validate(trans)) {
            submitNewTransactionToWebService(trans);
        }
    };

    $("#submitNew").click(submitNewTransaction);
    $(".doReconcile").click(reconcileTransaction);
});