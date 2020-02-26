using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using FactorManagmentG13.Models;

namespace FactorManagmentG13.Controllers
{
    public class AccountController : Controller
    {
        FactorManagmentG13.Models.AccountingG13EntitiesEntities2 Context = new FactorManagmentG13.Models.AccountingG13EntitiesEntities2();
        [HttpGet]
        public ActionResult LogOn()
        {
            return View();
        }
        [HttpGet]
        public void LogOut()
        {
            FormsAuthentication.SignOut();
            FormsAuthentication.RedirectToLoginPage();
        }
        [HttpPost]
        public ActionResult LogOn(int? id)
        {
            string UserName = Request["UserName"];
            string Password=Request["Password"];
            bool IsRemember = Request["IsRemember"] != null;
            string ReturnUrl = Request["ReturnUrl"];

            if(Context.Users.Any(p=>p.UserName==UserName && p.Password==Password))
            {
                FormsAuthentication.SetAuthCookie(UserName, IsRemember);
                if (ReturnUrl != "" && !ReturnUrl.Contains("LogOut"))
                {
                    return new RedirectResult(ReturnUrl);
                }
                else
                {
                    
                    FormsAuthentication.RedirectFromLoginPage(UserName, IsRemember);
                    return new  RedirectResult(FormsAuthentication.DefaultUrl);
                }
            }
            else
            {
                ViewBag.Error = "کلمه کاربری یا رمز عبور اشتباست";
            }
            return View();
        }
    }
}