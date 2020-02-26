function ShowMessageValidation(Tag) {

    var TagMessage = document.getElementById("Valid" + Tag.id);
    TagMessage.innerHTML = "";
    Tag.setCustomValidity("");
    var display = Tag.getAttribute("data-display");
    var ErrorMessage = "";
    if (Tag.validity.valid) {
        if (Tag.getAttribute("data-remote") != null) {

            MyAjax("Get", Tag.getAttribute("data-remote"), { "Mobile": Tag.value }, function (Data) {
                if (Data) {
                    TagMessage.innerHTML = display + " تکراری است ";
                    Tag.setCustomValidity(TagMessage.innerHTML);
                }
            });
        }
        return;
    }

    if (Tag.validity.valueMissing) {
        ErrorMessage = "مقدار " + display + " معتیر نیست ";
    }
    if (Tag.validity.typeMismatch) {
        ErrorMessage = " فرمت " + display + " صحیح نیست ";
    }
    if (Tag.validity.patternMismatch) {
        ErrorMessage = " الگوی " + display + " صحیح نیست ";
    }
    if (Tag.validity.rangeOverflow || Tag.validity.rangeUnderflow) {
        ErrorMessage = " مقدار " + display + " باید بین " + Tag.min + " و " + Tag.max + " باشد ";
    }
    if (Tag.validity.stepMismatch) {
        ErrorMessage = " مقدار ورودی باید ضریب " + Tag.step + " باشد ";
    }
    TagMessage.innerHTML = ErrorMessage;
    Tag.title = ErrorMessage;

}

function SetValidation(Content) {
    var List = Content.querySelectorAll("input,textarea");

    for (var i = 0; i < List.length; i++) {
        List[i].addEventListener("invalid", function (e) {
            e.preventDefault();
            ShowMessageValidation(this);
        });
        List[i].addEventListener("blur", function (e) {
            ShowMessageValidation(this);
        });
        List[i].addEventListener("input", function (e) {
            ShowMessageValidation(this);
        });
    }

}


function CheckValidation(Content)
{
    var List = Content.querySelectorAll("input,textarea");
    var isvalid = true;
    for (var i = 0; i < List.length; i++) {
        isvalid = isvalid && List[i].validity.valid;
    }



    return isvalid;
}