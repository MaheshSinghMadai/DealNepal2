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
        public int ImageID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [DisplayName("Image Name")]
        public string ImageName { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public int MinPrice { get; set; }

        public int MaxPrice { get; set; }

        public int EndTime { get; set; }

        public int LatestBid { get; set; }

        [NotMapped]
        [DisplayName("Upload Image")]
       
        public IFormFile ProductImage { get; set; }
    }
  
}
