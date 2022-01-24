using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using UserManagement.Data;
using UserManagement.Models;

namespace UserManagement.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

       
        public IActionResult Details(int? Id)
        {
            Products b = _db.Products.Find(Id);
        

            return View(b);
        }

        public IActionResult Art()
        {

            List<Products> model = (from p in _db.Products
                                    where p.Category == "Art"
                                    select p).ToList();
            return View(model);
        }


        public IActionResult Jewellery()
        {
            List<Products> model = (from p in _db.Products
                                    where p.Category == "Jwellery"
                                    select p).ToList();
            return View(model);
        }


        public IActionResult Furniture()
        {
            List<Products> model = (from p in _db.Products
                                    where p.Category == "Furniture"
                                    select p).ToList();
            return View(model);
        }

        public IActionResult Coins()
        {
            List<Products> model = (from p in _db.Products
                                    where p.Category == "Coins"
                                    select p).ToList();
            return View(model);
        }

        public IActionResult SortByPrice()
        {
            List<Products> model = (from p in _db.Products
                                    orderby p.MinPrice
                                    select p).ToList();
            return View(model);
        }

        public bool AddBid(Bid b)
        {
            _db.Bids.Add(b);
            return _db.SaveChanges() > 0;
        }

    }
}
