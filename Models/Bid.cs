using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagement.Models
{
    public class Bid
    {
        [Key]
        public int BidID { get; set; }
        public int ProductID { get; set; }
       
        public virtual Products Products { get; set; }

        public string UserID { get; set; }
        public ApplicationUser User { get; set; }

        public double BidAmount { get; set; }
        public DateTime Timestamp { get; set; }
      
    }
}
