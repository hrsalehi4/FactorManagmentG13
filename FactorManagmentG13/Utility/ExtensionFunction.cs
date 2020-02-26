using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Globalization;

namespace System
{
    public static class ExtensionFunction
    {
        public static String ToPersian(this DateTime dt)
        {
         
            PersianCalendar p = new PersianCalendar();
            int day = p.GetDayOfMonth(dt);
            int month = p.GetMonth(dt);
            int year = p.GetYear(dt);

            return year+"/"+month+"/"+day;
        }
    }
}