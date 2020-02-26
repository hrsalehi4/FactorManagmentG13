using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace System
{
    public class AjaxErrorHandler:FilterAttribute,IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            int ErrorCode = ErrorHandler.GetErrorCode(filterContext.Exception);
            filterContext.Result = new HttpStatusCodeResult(ErrorCode);
            filterContext.ExceptionHandled = true;
        }
    }

    public class AjaxValidationAttribute:FilterAttribute,IActionFilter
    {

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (filterContext.Controller.ViewData.ModelState.IsValid)
                return;
            var _list = from state in filterContext.Controller.ViewData.ModelState.Values
                        from error in state.Errors
                        select error.ErrorMessage;
            var _listError = _list.ToList();
            string str = "خطا";
            foreach (var item in _listError)
            {
                str += "\n - " + item;
            }

            var ob = new {IsNotValid=true,ErrorMessage=str };
            JsonResult js = new JsonResult();
            js.JsonRequestBehavior = JsonRequestBehavior.AllowGet;
            js.Data = ob;
            filterContext.Result = js;
        }
    }
}