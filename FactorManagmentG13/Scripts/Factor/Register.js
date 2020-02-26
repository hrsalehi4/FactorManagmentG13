var factor = new Factor(0, "", 0);
var ListFactorCommidities = [];
$(Load);
function Load() {
    ShowCustomers();
    FillComCodes();
    $("#btnAdd").click(AddRow);
    $("#BtnSave").click(Save);
}
function FillComCodes() {
    JQAjax("Get", "../Commodity/GetComCodes", null, function (ListCodes) {
        var str = "";
        for (var i in ListCodes) {
            str += '<option>' + ListCodes[i] + '</option>';
        }
        $("#ListComCode").html(str);
    });
}
function AddRow() {
    if (CheckEmptyRow()) {
        alert("سطرهای خالی را پر کنید");
        return;
    }
    var str = '<tr data-comid="0">';
    str += '<td class="ComCode"><input type="text" class="form-control"  list="ListComCode"/></td>';
    str += '<td Class="ComName"></td>';
    str += '<td class="Price"></td>';
    str += '<td class="Number"><input disabled type="text" class="form-control"/></td>';
    str += '<td Class="Total"></td>';
    str += '<td Class="Remove"> <img style="width:35px;height:35px;cursor:pointer;" src="../Images/shopping-cart-remove-icon.png" /></td>';
    str += '</tr>';
    $("#BodyData").append(str);

    AssignEvents();

}

function AssignEvents() {

    $("#BodyData tr td.ComCode input").keypress(function (e) {
        if (e.which == 13) {
            var ComCode = $(this).val();
            var tr = $(this).parent().parent();
            JQAjax("Get", "../Commodity/FindComCode", { "ComCode": ComCode },

                function (Commodity) {
                    if (Commodity.ID!=0) {
                        tr.attr("data-comid", Commodity.ID);
                        tr.children("td.ComName").first().html(Commodity.CommodityName);
                        tr.children("td.Price").first().html(Commodity.Price);
                        tr.children("td.Number").first().children("input").first().removeAttr("disabled");
                    }
                    else {
                        alert("کالایی با این کد وجود ندارد");
                    }
            });
        }

        
    });
    $("#BodyData tr td.Number input").keypress(function (e) {
       
        if (e.which == 13) {
            var Number = parseInt($(this).val());
            var Price = parseInt($(this).parent().parent().children("td.Price").first().html());
            var total = Number * Price;
            $(this).parent().parent().children("td.Total").first().html(total)
        }


    });
    $("#BodyData tr td.Remove img").click(function () {

        $(this).parent().parent().remove();
    });
}
function ShowCustomers() {

    FillSelectTag("../Customer/GetCustomers", Customer, function () {
        if ($("#FactorData").val().trim() != "")
        ShowOriginallInformation();
        
    });


}
function ShowOriginallInformation()
{
  
    factor = JSON.parse($("#FactorData").val().split(";;;")[0]);
    
    $("#Customer").val(factor.CustomerID);
    $("#FactorCode").val(factor.FactorCode);

    var _list = JSON.parse($("#FactorData").val().split(";;;")[1]);
    
    for (var i in _list) {
        var str = '<tr data-comid="' + _list[i].CommodityID+'">';
        str += '<td class="ComCode"><input type="text" class="form-control"  list="ListComCode" value="' + _list[i].CommodityCode +'"/></td>';
        str += '<td Class="ComName">' + _list[i].CommodityName +'</td>';
        str += '<td class="Price">' + _list[i].PriceInDay +'</td>';
        str += '<td class="Number"><input value="' + _list[i].Number +'" type="text" class="form-control"/></td>';
        str += '<td Class="Total">' + _list[i].Total +'</td>';
        str += '<td Class="Remove"> <img style="width:35px;height:35px;cursor:pointer;" src="../Images/shopping-cart-remove-icon.png" /></td>';
        str += '</tr>';
        $("#BodyData").append(str);
        AssignEvents();
    }

}
function CheckEmptyRow() {
    var isempty = false;
    $("#BodyData tr td input").each(function () {
        if ($(this).val().trim() == "")
            isempty = true;
    });

    return isempty;
}

function Save()
{
    if (CheckEmptyRow()) {
        alert("سطرهای خالی را پر کنید");
        return;
    }
    if ($("#FactorCode").val() == "") {
        alert("لطفا کد فاکتور را وارد کنید");
        return;
    }
    factor.CustomerID = $("#Customer").val();
    factor.FactorCode = $("#FactorCode").val();

    $("#BodyData tr").html(function (index, value) {
      
        ListFactorCommidities[index] = new FactorCommidity($(this).attr("data-comid"), factor.FactorID, $(this).children("td.Price").first().html(), $(this).children("td.Number").first().children("input").first().val());
    });

    var strData = JSON.stringify(factor) + ";" + JSON.stringify(ListFactorCommidities);
    JQAjax("Post", "Save", { "Data": strData }, function (Data) {
        factor = Data;
        alert("عملیات با موفقیت انجام شد");
    });
}