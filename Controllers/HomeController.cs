﻿using System;
using System.Net;
using System.Web.Mvc;
using Ledger.Models;
using Ledger.Models.ViewModels;

namespace Ledger.Controllers
{
    public class HomeController : Controller
    {
        readonly Repository _repo;

        public HomeController()
        {
            _repo = new Repository();
        }

        public ViewResult Index()
        {
            return View();
        }

        public ViewResult Unreconciled(int? id)
        {
            var model = new UnreconciledViewModel();
            model.Transactions = _repo.GetUnreconciled(id);
            model.CurrentBalance = _repo.GetCurrentBalance(id);
            model.ActualBalance = _repo.GetActualBalance(id);
            model.LedgerList = new SelectList(_repo.GetAllLedgers(), "Ledger", "LedgerDesc", id);
            model.AccountsList = new SelectList(_repo.GetAllAccounts(), "Id", "Desc");
            return View(model);
        } 
        
        public ViewResult BillsDue(int? ledger)
        {
            return View();
        }

        public ActionResult CreateTransaction(Transaction transaction)
        {
            if (ModelState.IsValid)
            {
                _repo.CreateTransaction(transaction);
                return new HttpStatusCodeResult(HttpStatusCode.Created, "it worked");
            }
            return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Errors");
        }

        public ActionResult MarkTransactionReconciled(int id, DateTime reconcileDate)
        {
            if(id == 0 || reconcileDate == DateTime.MinValue || reconcileDate == DateTime.MaxValue)
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Errors");
            _repo.MarkTransactionReconciled(id, reconcileDate);
            return new HttpStatusCodeResult(HttpStatusCode.Created, "it worked");
        }
    }
}