using FactorManagmentG13.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace FactorManagmentG13.Controllers
{
    public class CommodityController : Controller
    {
        AccountingG13EntitiesEntities2 Context = new AccountingG13EntitiesEntities2();

        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult FindComCode(string ComCode)
        {
            
            Context.Configuration.ProxyCreationEnabled = false;
            var commodity = Context.Commodities.FirstOrDefault(p => p.CommodityCode == ComCode);
            var com = commodity == null ? new Commodity() : commodity;
            return Json(com, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetComCodes()
        {
            return Json(Context.Commodities.Select(p=>p.CommodityCode).ToList(),JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetCommodities(string Title)
        {
            var _list = Context.Commodities.Where(p =>p.CommodityCode.Contains(Title) || p.CommodityName.Contains(Title) || p.CommodityType.CommodityTypeDescription.Contains(Title) )
                .Select(p => new { p.CommodityCode, p.CommodityName, p.CommodityTypeID, p.ID, p.Price, p.CommodityType.CommodityTypeDescription }).ToList();
            
            return Json(_list,JsonRequestBehavior.AllowGet);
        }

        [HttpPost] 
        [AjaxErrorHandler]
        [AjaxValidation]
        public ActionResult Register(Commodity Commodity)
        {
            if (Commodity.ID == 0)
            {
                Context.Commodities.Add(Commodity);
            }
            else
            {
                Context.Entry(Commodity).State = System.Data.Entity.EntityState.Modified;
            }
            Context.SaveChanges();

            return Json(Commodity, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [AjaxErrorHandler]
        [AuthorizeAjax(Roles="r6")]
        public void Remove(int id)
        {
            Context.Commodities.Remove(Context.Commodities.Find(id));
            Context.SaveChanges();
        }
        [HttpGet]
        public ActionResult GetCommidityTypes()
        {
            var _list = Context.CommodityTypes.Select(p => new {Display=p.CommodityTypeDescription,Value=p.ID }).ToList();
            return Json(_list,JsonRequestBehavior.AllowGet);
        }

       
    }
}