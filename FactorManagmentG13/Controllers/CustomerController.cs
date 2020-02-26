using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FactorManagmentG13.Models;
using System.Web.Script.Serialization;
using System.IO;
using System.Drawing;
using System.Drawing.Imaging;
namespace FactorManagmentG13.Controllers
{

    //[MyAuthorize(Roles = "r1")]
    public class CustomerController : Controller
    {
        AccountingG13EntitiesEntities2 Context = new AccountingG13EntitiesEntities2();
        public ActionResult Index()
        {

            var _List = Context.Customers.Select(p => new { p.Address, p.CustomerFullName, p.ID, p.Mobile, p.Tel }).ToList();
            JavaScriptSerializer js = new JavaScriptSerializer();
            var _ListFactors = Context.Factors.Select(p => new { p.FactorCode, p.FactorDate, p.ID, p.CustomerID }).ToList().Select(p => new { p.FactorCode, FactorDate = p.FactorDate.ToPersian(), p.ID, p.CustomerID });
            ViewBag.ListCustomer = js.Serialize(_List);
            ViewBag.ListFactors = js.Serialize(_ListFactors);
            return View();

        }

        [HttpGet]
        public ActionResult GetCustomers()
        {
            return Json(Context.Customers.Select(p=>new {Value=p.ID,Display=p.CustomerFullName }).ToList(),JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult PartialRegister()
        {
            return View();
        }

        [HttpGet]

        public ActionResult Register(int? id)
        {
            if (id.HasValue)
            {
                var Customer = Context.Customers.Where(p => p.ID == id).Select(p => new { p.Address, p.CustomerFullName, p.ID, p.Mobile, p.Tel }).SingleOrDefault();
                JavaScriptSerializer js = new JavaScriptSerializer();
                ViewBag.Customer = js.Serialize(Customer);

                var _path = Path.Combine(Server.MapPath("~/Images/PicMember/"), Customer.ID + ".jpg");
                Image img = Image.FromFile(_path);
                MemoryStream _memory = new MemoryStream();
                img.Save(_memory, ImageFormat.Jpeg);
                var buffer = _memory.GetBuffer();

                ViewBag.Picture = Convert.ToBase64String(buffer);
            }
            return View();
        }

        [HttpPost]
        [HandleError]
       
        public ActionResult Register(Customer Customer)
        {

            var req = Request.Headers["Date"];
            if (Customer.ID == 0)
            {
                Context.Customers.Add(Customer);
            }
            else
            {
                Context.Entry(Customer).State = System.Data.Entity.EntityState.Modified;

            }
            Context.SaveChanges();

            if (Request.Files.Count != 0)
            {
                var _file = Request.Files[0];
                if (!_file.ContentType.Contains("image"))
                    return new HttpStatusCodeResult(403);

                var _path = Path.Combine(Server.MapPath("~/Images/PicMember/"), Customer.ID + ".jpg");

                _file.SaveAs(_path);
            }
            return RedirectToAction("Index");
        }

        public ActionResult GetPicture(int? id)
        {
            var _path = Path.Combine(Server.MapPath("~/Images/PicMember/"), id + ".jpg");
            if (!System.IO.File.Exists(_path))
            {
                return new HttpStatusCodeResult(404);
            }
            return File(_path, "image/jpg", "picmember");
        }
        [HttpPost]
        [HandleError]
        public ActionResult Remove()
        {

            int id = Convert.ToInt32(Request["ID"]);
            var Customer = Context.Customers.Find(id);
            Context.Customers.Remove(Customer);
            Context.SaveChanges();
            return RedirectToAction("Index");

        }
        [HandleError]
        public ActionResult GetCommidity(int? id)
        {
            var _ListCommodity = Context.FactorCommodities.Where(p => p.FactorID == id).Select(p => new { p.CommodityID, p.FactorID, p.Number, p.PriceInDay, p.Commodity.CommodityCode, p.Commodity.CommodityName }).ToList();
            JavaScriptSerializer js = new JavaScriptSerializer();
            ViewBag.ListCommodity = js.Serialize(_ListCommodity);
            return View();
        }
        [HttpGet]

        public ActionResult CheckMobile(long Mobile)
        {
            bool b = Context.Customers.Any(p => p.Mobile == Mobile);
            return Json(b, JsonRequestBehavior.AllowGet);
        }

    }
}