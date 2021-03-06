﻿using System.Collections.Generic;
using System.Web.Mvc;
using Ledger.Models.Entities;

namespace Ledger.Models.ViewModels
{
    public class UnreconciledViewModel
    {
        public decimal CurrentBalance { get; set; }
        public decimal ActualBalance { get; set; }
        public List<Transaction> Transactions { get; set; }
        public SelectList AccountsList { get; set; }
        public SelectList LedgerList { get; set; }
        public long Ledger { get; set; }
    }
}