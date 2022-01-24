using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement.Models
{
    [Table("Products")]
    public class Products 
    {
        [Key]
        public int ProductID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [DisplayName("Product Name")]
        public string ProductName { get; set; }

        public string ProductImageName { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime  EndTime { get; set; }

        public double LatestBid { get; set; }

        [NotMapped]
        [DisplayName("Upload Image")]

        public IFormFile ProductImage { get; set; }
        public ApplicationUser LatestBidder { get; set; }

        public virtual List<Bid> Bids { get; set; }
     
    }
  
}
