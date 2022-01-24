using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
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


        [HttpGet]
        public IActionResult Details(int? id)
        {

            Products detail = _db.Products.Find(id);
            List<Products> recommend = (from p in _db.Products
                                        where p.Category == detail.Category &&
                                        p.ProductID != detail.ProductID
                                        select p).ToList();
           

            Details model = new Details();
            model.listA = detail;
            model.listB = recommend;
            //calling function

            return View(model);
        }

        [HttpGet]
        public IActionResult BidInput(int Id,double BidAmount)
        {
            int Pid = Id;
            Bid bidin = new Bid();

            if (User.Identity.IsAuthenticated)
            {
                bidin.ProductID = Pid;
                bidin.UserID = User.Identity.GetUserId();
                bidin.BidAmount = BidAmount;
                bidin.Timestamp = DateTime.Now;
            }

            AddBid(bidin);
            return RedirectToAction("Index","Home" );
        }


        public bool AddBid(Bid b)
        {
            _db.Bids.Add(b);
            return _db.SaveChanges() > 0;
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

       
    }
}
