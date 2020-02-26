using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace System
{
    public static class ErrorHandler
    {
        public static string GetError(Exception ex)
        {
            string ErrorMessage = "خطا";
            if (ex.GetType() == typeof(FormatException))
            {
                ErrorMessage = "خطای فرمت";
            }

            if (ex.GetType() == typeof(System.Security.Cryptography.CryptographicException))
            {
                ErrorMessage = " خطا در بازیابی رشته ";
            }
            if (ex.GetType() == typeof(System.Data.Entity.Core.EntityException))
            {
                SqlException exsql = ex.InnerException as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }
            if (ex.GetType() == typeof(DbUpdateException))
            {
                ErrorMessage = "خطای پایگاه داده";
                SqlException exsql = ex.InnerException.InnerException as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }
            if (ex.GetType() == typeof(SqlException))
            {
                ErrorMessage = " خطای پایگاه داده ";
                SqlException exsql = ex as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }

            return ErrorMessage;
        }
           static int Code = 500;

        public static int GetErrorCode(Exception ex)
        {

         
            string ErrorMessage = "خطا";
            if (ex.GetType() == typeof(FormatException))
            {
                ErrorMessage = "خطای فرمت";
                Code = 521;
            }
            if (ex.GetType() == typeof(DivideByZeroException))
            {
                ErrorMessage = "خطای تقسیم بر صفر";
                Code = 523;
            }
            if (ex.GetType() == typeof(UnAuthorizeException))
            {
                ErrorMessage = "شما به این قسمت دسترسی ندارید";
                Code = 525;
            }
            if (ex.GetType() == typeof(System.Security.Cryptography.CryptographicException))
            {
                ErrorMessage = " خطا در بازیابی رشته ";
                Code = 522;
            }
            if (ex.GetType() == typeof(System.Data.Entity.Core.EntityException))
            {
                SqlException exsql = ex.InnerException as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }
            if (ex.GetType() == typeof(DbUpdateException))
            {
                ErrorMessage = "خطای پایگاه داده";
                SqlException exsql = ex.InnerException.InnerException as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }
            if (ex.GetType() == typeof(SqlException))
            {
                ErrorMessage = " خطای پایگاه داده ";
                SqlException exsql = ex as SqlException;
                ErrorMessage = GetSqlServerError(ErrorMessage, exsql);
            }

            return Code;
        }
        private static string GetSqlServerError(string ErrorMessage, SqlException exsql)
        {
            if (exsql.Number == 2627)
            { ErrorMessage = "اطلاعات تکراری است"; Code = 531; }
            if (exsql.Number == 547)
            { ErrorMessage = "به دلیل اینکه این اطلاعات پیش نیاز اطلاعات دیگر هستند قابل تغییر نیستند"; Code = 532; }
            if (exsql.Number == 2 || exsql.Number == 0 || exsql.Number == -2)
            { ErrorMessage = " به پایگاه داده دسترسی ندارید"; Code = 533; }
            if (exsql.Number == 4060 || exsql.Number == 229)
            { ErrorMessage = " شما به داده دسترسی ندارید "; Code = 534; }

            return ErrorMessage;
        }
    }

    public class UnAuthorizeException:Exception
    {
    }
}