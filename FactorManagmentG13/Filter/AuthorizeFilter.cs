using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace System
{
    public class MyAuthorize:AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
      
            filterContext.Result = new RedirectResult("../Error/Forbidden");
        }
    }
    public class AuthorizeAjax : AuthorizeAttribute
    {
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            throw new UnAuthorizeException();
        }
    }
    public class CheckReferrerAttribute : AuthorizeAttribute
    {
        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext != null)
            {
                if (filterContext.HttpContext.Request.UrlReferrer == null)
                    filterContext.Result = new RedirectResult("../Error/Forbidden");


                if (filterContext.HttpContext.Request.UrlReferrer.Host != "http://localhost:12642")
                    filterContext.Result = new RedirectResult("../Error/Forbidden");

            }

            base.OnAuthorization(filterContext);
        }
    }
}