
function MyAjax(Method, Action, SendData, CallBackFunction, ResponseType) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4) {

            if (http.status >= 200 && http.status < 300) {
                if (http.response.IsNotValid)
                {
                    alert(http.response.ErrorMessage);
                }
                else
                CallBackFunction(http.response);
            }
            else {
                ShowError(http.status);
            }
        }
    }

    http.onloadstart = function () {
        Loading.style.display = "block";
    }
    http.onloadend = function () {
        Loading.style.display = "none";
    }

    if (ResponseType == null)
        http.responseType = "json";
    else http.responseType = ResponseType;

    var strsenddata = ConvertObjectToQueryString(SendData);

    if (Method == "Get" && strsenddata != "") {
        Action = Action + "?" + strsenddata;
        strsenddata = "";
    }

    http.open(Method, Action, true);
    http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    http.send(strsenddata);
}
function JQAjax(Method, Action, SendData, CallBackFunction, ResponseType) {
    if (ResponseType == null)
        ResponseType = "json";

    $.ajax({
        url: Action,
        type: Method,
        dataType: ResponseType,
        data: SendData,
        success: function (Data, Status, jqXHR) {
            if (Data.IsNotValid) {
                alert(Data.ErrorMessage);
            }
            else {
                CallBackFunction(Data);
            }
        },
        error: function (jqXHR, Status, ErrorMessage) {
            ShowError(Status);
        },
        beforeSend: function (jqXHR, Setting) {
            Loading.style.display = "block";
        },
        complete: function (jqXHR, Status) {
            Loading.style.display = "none";
        }

    });
}
function ShowError(Code)
{
    var str = "خطا";
    if (Code >= 400 )
        str = "خطای سمت مشتری";
    if (Code >= 500)
        str = "خطای سمت سرور";
    if (Code == 404)
        str = "منبع درخواستی معتبر نیست";
    if(Code==401 || Code==403)
    {
        str = "شما مجوز انجام چنین عملیاتی ندارید";
    }
    if(Code==521)
        str = "خطای فرمت";
    if (Code == 523)
        str = "خطای تقسیم بر صفر";
    if (Code == 522)
        str = " خطا در بازیابی رشته ";
    if (Code == 531)
        str = "اطلاعات تکراری است";
    if (Code == 532)
        str = "به دلیل اینکه این اطلاعات پیش نیاز اطلاعات دیگر هستند قابل تغییر نیستند";
    if (Code == 533)
        str = " به پایگاه داده دسترسی ندارید";
    if (Code == 534)
        str = " شما به داده دسترسی ندارید ";
    if (Code == 525)
        str = "شما به این قسمت دسترسی ندارید";
    alert(str);

}
function ConvertObjectToQueryString(ob) {
    if (ob == null)
        return "";
    var str = "";
    var countprop = Object.keys(ob).length;
    var i = 1;
    for (var prop in ob) {
        str += prop + "=" + ob[prop];
        if (i < countprop)
            str += "&";
        i++;
    }

    return str;
}






var SelectRow = null;
var FirstRow = null;
var LastRow = null;
function MyGrid(ListData, Content, Columns, Buttons, Option) {
    if (ListData == null || ListData.lenght == 0) {
        return;
    }


    var str = ' <table class="table table-bordered table-hover"  style="margin:10px auto;font-size:18px; ">';
    str += '<thead style="font-weight:bolder"><tr>';

    if (Option.RowNumber) {
        str += "<td>ردیف</td>";
    }
    for (var i in Columns) {
        if (Columns[i].Data.toUpperCase() == "ID")
            continue;
        else
            str += '<td>' + Columns[i].Title + '</td>';
    }

    if (Buttons != null) {
        for (var i in Buttons) {
            str += "<td>" + Buttons[i].Text + "</td>";
        }
    }

    str += '</tr> </thead>';
    str += "<tbody>";

    for (var i in ListData) {

        var trContent = "";
        var trid = "";
        if (Option.RowNumber) {
            var r = parseInt(i) + 1;
            trContent += "<td>" + r + "</td>";
        }
        for (var j in Columns) {


            if (Columns[j].Data.toUpperCase() == "ID") {
                trid = 'data-id="' + ListData[i][Columns[j].Data] + '"';
            }
            else
                trContent += '<td>' + ListData[i][Columns[j].Data] + '</td>';
        }
        if (Buttons != null) {
            for (var j in Buttons) {
                trContent += '<td><button data-Number="' + j + '" class="btn btn-primary"><span class="glyphicon glyphicon-' + Buttons[j].Icon + '"></span>&nbsp;</button></td>';
            }
        }
        str += '<tr ' + trid + '>' + trContent + '</tr>';
    }

    str += '</tbody></table>';

    if (Option.IsNavigated) {
        str += '<div>';
        str += '<button class="btn btn-primary"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;</button>&nbsp;';
        str += '<button class="btn btn-primary"><span class="glyphicon glyphicon-arrow-right"></span>&nbsp;</button>';
        str += '</div>';
    }

    Content.innerHTML = str;


    // CheckForSelectedRow
    if (Option.Selected) {

        var Listtr = document.querySelectorAll("#" + Content.id + " table tbody tr");
        FirstRow = Listtr[0];
        LastRow = Listtr[Listtr.length - 1];
        for (var i = 0; i < Listtr.length; i++) {
            Listtr[i].addEventListener("click", function () {

                if (SelectRow != null) {
                    SelectRow.className = "row1";
                }
                SelectRow = this;


                SelectRow.className = "bg-info";
                var id = SelectRow.getAttribute("data-id");
                if (Option.SelectEvent != null)
                    Option.SelectEvent(id);
            });
        }

        if (Option.IsNavigated) {
            var _btns = document.querySelectorAll("#" + Content.id + " div button");
            if (_btns != null) {
                _btns[0].addEventListener('click', function () {
                    if (SelectRow == null) {
                        SelectRow = FirstRow;
                    }
                    else {
                        SelectRow.className = "row1";
                        if (SelectRow == LastRow)
                            SelectRow = FirstRow;
                        else
                            SelectRow = SelectRow.nextSibling;
                    }


                    SelectRow.className = "bg-info";
                    var id = SelectRow.getAttribute("data-id");
                    if (Option.SelectEvent != null)
                        Option.SelectEvent(id);
                });
                _btns[1].addEventListener('click', function () {
                    if (SelectRow == null) {
                        SelectRow = LastRow;
                    }
                    else {
                        SelectRow.className = "row1";
                        if (SelectRow == FirstRow)
                            SelectRow = LastRow;
                        else
                            SelectRow = SelectRow.previousSibling;
                    }


                    SelectRow.className = "bg-info";
                    var id = SelectRow.getAttribute("data-id");
                    if (Option.SelectEvent != null)
                        Option.SelectEvent(id);
                });
            }
        }
    }


    // Assign  Event To Buttons
    if (Buttons != null) {

        var ListtrButtons = document.querySelectorAll("#" + Content.id + " table tbody tr td button");
        for (var i = 0; i < ListtrButtons.length; i++) {

            ListtrButtons[i].addEventListener("click", function () {

                var id = this.parentNode.parentNode.getAttribute("data-id");
                Buttons[this.getAttribute("data-Number")].Event(id);
            });
        }
    }
}


function CreateModal(Content) {
    var str = '<div id="' + Content.id + 'Modal" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><form class="form-horizontal">';
    str += '<div id="' + Content.id + 'Header" class="modal-header bg-primary"><button type="button" class="close" data-dismiss="modal">&times;</button></div>';
    str += '            <div id="' + Content.id + 'Body" class="modal-body"></div><div id="' + Content.id + 'Footer" class="modal-footer"> </div></form></div></div></div>';

    Content.innerHTML = str;

    return {
        Header: document.getElementById(Content.id + 'Header'),
        Body: document.getElementById(Content.id + 'Body'),
        Footer: document.getElementById(Content.id + 'Footer')
    };
}


function CreateFormControl(name, caption, type) {
    var str = '<div class="form-group"> <label class="control-label col-sm-2" for="' + name + '">' + caption + ':</label>';
    str += '<div class="col-sm-7">';
    if (type == 'select') {
        str += '<select class="form-control" id="' + name + '" name="' + name + '" placeholder="لطفا ' + caption + ' وارد کنید"></select>';

    }
    else {
        str += '<input type="' + type + '"  class="form-control" id="' + name + '" name="' + name + '" placeholder="لطفا ' + caption + ' وارد کنید" >';
    }

    str += '</div><div class="col-sm-3"></div></div>';

    return str;
}

function CreateForms(Content, Title, inputs, Buttons) {
    var ModalForm = CreateModal(Content);
    ModalForm.Header.innerHTML += "<h4>" + Title + "</h4>";

    var strinput = "";
    if (inputs != null) {
        for (var i in inputs) {
            strinput += CreateFormControl(inputs[i].name, inputs[i].caption, inputs[i].type);
        }

        ModalForm.Body.innerHTML = strinput;
    }


    var strbtns = "";
    if (Buttons != null) {
        for (var i in Buttons) {
            strbtns += '<button data-number="' + i + '" type="button" class="btn btn-primary" data-dismiss="modal">' + Buttons[i].text + '</button>';
        }
        ModalForm.Footer.innerHTML = strbtns;

        var btns = ModalForm.Footer.getElementsByTagName("button");
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {

                var number = this.getAttribute("data-number");

                if (Buttons[number].event != null)
                    Buttons[number].event();
            });

        }
    }


}

function FillSelectTag(Action, Content,CallBackFunction) {
    MyAjax("Get", Action, "", function (ListData) {
        var str = "";
        for (var i in ListData) {
            str += '<option value="' + ListData[i].Value + '">' + ListData[i].Display + '</option>';
        }
        Content.innerHTML = str;
        CallBackFunction();
    });
}