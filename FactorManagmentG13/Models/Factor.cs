//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace FactorManagmentG13.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Factor
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Factor()
        {
            this.FactorCommodities = new HashSet<FactorCommodity>();
        }
    
        public int ID { get; set; }
        public System.DateTime FactorDate { get; set; }
        public int CustomerID { get; set; }
        public string FactorCode { get; set; }
    
        public virtual Customer Customer { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<FactorCommodity> FactorCommodities { get; set; }
    }
}