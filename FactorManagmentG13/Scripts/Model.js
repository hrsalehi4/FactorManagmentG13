
function Commodity(id,commidityname,price,comTypeid,Comcode) {
    this.ID = id;
    this.CommodityName = commidityname;
    this.Price = price;
    this.CommodityTypeID = comTypeid;
    this.CommodityCode = Comcode;
}
function Factor(PID, PFactorCode, PCustomerID) {
    this.FactorID = PID;
    this.FactorCode = PFactorCode;
    this.CustomerID = PCustomerID;
}
function FactorCommidity(CommodityID, FactorID, PriceInDay, Number) {
    this.CommodityID = CommodityID;
    this.FactorID = FactorID;
    this.PriceInDay = PriceInDay;
    this.Number = Number;
}