using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FactorManagmentG13.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public ActionResult DefaultError()
        {
            return View();
        }
        public ActionResult NotFound()
        {
            return View();
        }
        public ActionResult ServerError()
        {
            return View();
        }

        public ActionResult Forbidden()
        {
            return View();
        }

    }
}