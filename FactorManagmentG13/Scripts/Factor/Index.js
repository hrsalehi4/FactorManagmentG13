$(Load);

function Load() {
    ShowFactors();
}

function ShowFactors() {
    MyAjax("Get", "GetFactors", "", function (ListFactor) {
        var str = "";
        for (var i in ListFactor) {
            str += "<ul data-id='" + ListFactor[i].ID + "'>";
            str += "<li>مشتری:" + ListFactor[i].CustomerFullName + "</li>";
            str += "<li>کدفاکتور:" + ListFactor[i].FactorCode + "</li>";
            str += "<li>تاریخ فاکتور:" + ListFactor[i].FactorDate + "</li>";
            str += "</ul>";
        }
        $("#FactorList").html(str);
        $("#FactorList ul").dblclick(function () {
            location.href = "../Factor/Edit/" + $(this).attr("data-id");
        });
    });
}