using FactorManagmentG13.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace FactorManagmentG13.Controllers
{
    public class FactorController : Controller
    {
        AccountingG13EntitiesEntities2 Context = new AccountingG13EntitiesEntities2();

        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AjaxErrorHandler]
        public ActionResult Save(string Data)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var Factor = js.Deserialize<Factor>(Data.Split(';')[0]);
          
            var ListFactorCommodities = js.Deserialize<List<FactorCommodity>>(Data.Split(';')[1]);
            if(Factor.ID==0)
            {
                Factor.FactorDate = DateTime.Now;
                Context.Factors.Add(Factor);
            }
            else
            {
                Factor.FactorDate = DateTime.Now;
                Context.Entry(Factor).State = System.Data.Entity.EntityState.Modified;
                Context.FactorCommodities.RemoveRange(Context.FactorCommodities.Where(p=>p.FactorID==Factor.ID));
            }
            if(Factor.FactorCommodities==null)
            {
                Factor.FactorCommodities = new HashSet<FactorCommodity>();
            }
            foreach (var item in ListFactorCommodities)
            {
                Factor.FactorCommodities.Add(item);
            }


            Context.SaveChanges();
            return Json(new { Factor.CustomerID, Factor.FactorCode, Factor.ID }, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetFactors()
        {
            return Json(Context.Factors.Select(p => new { p.Customer.CustomerFullName, p.FactorCode, p.FactorDate, p.ID }).ToList().Select(p => new { p.CustomerFullName, p.FactorCode, ID = p.ID, FactorDate = p.FactorDate.ToPersian() }), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        
        public ActionResult Edit(int? id)
        {
            var Factor = Context.Factors.Select(p=>new {p.CustomerID,p.FactorCode,p.ID }).FirstOrDefault(p=>p.ID==id);
            var ListFactorCommodities = Context.FactorCommodities.Where(p => p.FactorID == id).Select(p=>new {p.Commodity.CommodityCode,p.Commodity.CommodityName, p.CommodityID,p.FactorID,p.Number,p.PriceInDay,Total=p.Number*p.PriceInDay}).ToList();
            JavaScriptSerializer js = new JavaScriptSerializer();
 
            TempData["FactorData"] = js.Serialize(Factor) + ";;;" + js.Serialize(ListFactorCommodities);
            return RedirectToAction("Register");
        }

    }
}