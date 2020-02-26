/// <reference path="E:\وب\GW13\Session 8\FactorManagmentG13\FactorManagmentG13\Views/Commodity/Index.cshtml" />

/// <reference path="../Common.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Model.js" />

window.onload = Load;
var Commodity = new Commodity(0, "", 0, 0, "");
var ListCommodities = [];
var SelectedTr = null;
function Load() {
    CreateModals();

    ShowCommodities();
    ShowCommodityTypes();

    $("#BtnExpensive").click(SelectExpensive);

    //$("#BtnRegisterCustomer").click(function () {
    //    $("#ParitalDiv").load('../Customer/GetCommidity/1029');
    //});

}

function ShowCommodityTypes() {

    FillSelectTag("GetCommidityTypes", CommodityTypeID);
}

function SelectExpensive() {
    $("#DivCommodity table tbody tr").each(function () {
        $(this).children("td").html(function (index, value) {

            if (index == 4) {
                var _price = parseInt(value);
                if (_price > 10000)
                    $(this).css({ "color": "red", "font-weight": "bolder" }).animate({ "font-size": "+=3" });
            }
        });

    });
}

function EditMode() {
    if (SelectedTr != null) {
        alert("سطری در مد ویرایش وجود دارد");
        return;
    }
    SelectedTr = $(this);
    $(this).children("td").html(function (index, value) {
        if (index == 1 || index == 2 || index == 4) {
            return '<input type="text" value="' + value + '" class="form-control">';
        }
        if (index == 3) {
            var str = '<select class="form-control">' + $("#CommodityTypeID").html() + '</select>';
            $(this).html(str);
            $(this).children("select").first().children("option").html(function (i, val) {

                if (value.trim() == val.trim()) {
                    $(this).attr("selected", "selected");
                }
            });
        }
    });
}



function CreateModals() {
    CreateForms(FormCommodity, "مدیریت سیگنال", [{ name: "CommodityName", type: "text", caption: "سیگنال" }, { name: "CommodityCode", type: "text", caption: "کد سیگنال" }, { name: "CommodityTypeID", type: "select", caption: "نوع سیگنال" }, { name: "Price", type: "text", caption: "قیمت" }]
      , [{ text: "ثبت", event: Register }, { text: "بازگشت", event: null }])


    CreateForms(FormCommoditySearch, "جستجو", [{ name: "Title", type: "text", caption: "عنوان" }]
      , [{ text: "جستجو", event: Search }, { text: "بازگشت", event: null }])


}
function ShowCommodities() {
    JQAjax("Get", "GetCommodities", { "Title": Title.value }, ShowGrid, null);


}

function Search() {
    ShowCommodities();
}
function ShowGrid(Data) {
    ListCommodities = Data;
    MyGrid(Data, DivCommodity, [{ Data: "CommodityName", Title: "سیگنال" }, { Data: "CommodityCode", Title: "کد سیگنال" }, { Data: "ID", Title: "ID" }, { Data: "CommodityTypeDescription", Title: "نوع سیگنال" }, { Data: "Price", Title: "قیمت" }],
                    [{ Text: "ویرایش", Icon: "edit", Event: Edit }, { Text: "حذف", Icon: "remove", Event: Remove }], { RowNumber: true });
    $("#DivCommodity table tbody tr").dblclick(EditMode);

}
function Edit(id) {
    if (SelectedTr != null) {
        Commodity.ID = id;
       
        SelectedTr.children("td").html(function (index, value) {
            if (index == 1) {
                Commodity.CommodityName = $(this).children("input").first().val();
                return Commodity.CommodityName;
            }
            if (index == 2) {
                Commodity.CommodityCode = $(this).children("input").first().val();
                return Commodity.CommodityCode;
            }
            if (index == 4) {
                Commodity.Price = $(this).children("input").first().val();
                return Commodity.Price;
            }
            if (index == 3) {
                Commodity.CommodityTypeID = $(this).children("select").first().val();
                var str = "";
                $(this).children("select").first().children("option").html(function (i, val) {
                    if ($(this).is(":selected")) {
                        str = val;
                    }

                });

                return str;
            }
        });
        JQAjax("Post", "Register", Commodity, function (Data) {
            Commodity.ID = Data.ID;

            SelectedTr = null;
            alert("عملیات با موفقیت انجام شد");
        });
    }
    else {
        BtnRegister.click();
        var _find = false;
        for (var i in ListCommodities) {
            if (ListCommodities[i].ID == id) {
                _find = true;
                Commodity.ID = id;
                Commodity.CommodityCode = ListCommodities[i].CommodityCode;
                Commodity.CommodityName = ListCommodities[i].CommodityName;
                Commodity.CommodityTypeID = ListCommodities[i].CommodityTypeID;
                Commodity.Price = ListCommodities[i].Price;

            }
        }
        if (_find) {
            CommodityCode.value = Commodity.CommodityCode;
            CommodityName.value = Commodity.CommodityName;
            CommodityTypeID.value = Commodity.CommodityTypeID;
            Price.value = Commodity.Price;
        }
    }
}
function Remove(id) {
    if (!confirm("آیا عملیات انجام شود"))
        return;

    JQAjax("Post", "Remove", { "id": id }, function (Data) {
        //Commodity.ID = Data.ID;
        ShowCommodities();
        alert("عملیات با موفقیت انجام شد");
    });

}

function Register() {

    Commodity.CommodityCode = CommodityCode.value;
    Commodity.CommodityName = CommodityName.value;
    Commodity.CommodityTypeID = CommodityTypeID.value;
    Commodity.Price = Price.value;

    //var senddata = "ID=" + Commodity.ID + "&CommodityName=" + Commodity.CommodityName + "&CommodityTypeID=" + Commodity.CommodityTypeID + "&Price=" + Commodity.Price + "&CommodityCode="+Commodity.CommodityCode;

    JQAjax("Post", "Register", Commodity, function (Data) {
        Commodity.ID = Data.ID;
        ShowCommodities();
        alert("عملیات با موفقیت انجام شد");
    });
}