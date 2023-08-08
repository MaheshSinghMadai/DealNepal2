using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using UserManagement.Data;
using UserManagement.Models;
using System.Threading.Tasks;

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
        //public  IActionResult Details(int? id)
        public async Task<IActionResult> Details(int? id)
        {
            //Get product details
            Products detail = _db.Products.Find(id);

            // Display other products belonging to the same category
            var recommend =  (from p in _db.Products
                             where ( p.Category == detail.Category ||
                             p.ProductName.Contains(detail.Category)) &&
                             p.ProductID != detail.ProductID
                             select p).Take(5).ToList();

            await Task.Delay(100);

            //Display bid history
            List<Bid> bidhistory = (from p in _db.Bids                                     
                                    where detail.ProductID == p.ProductID                                    
                                    orderby p.Timestamp descending
                                    select p).ToList();


            Details model = new Details();

            model.listA = detail;
            model.listB = (List <Products>)recommend;
            model.listD = bidhistory;
            //calling function
            
            return View( model);
        }

        [HttpGet]
        public IActionResult BidInput(int Id,double BidAmount)
        {

            Bid bidin = new Bid();

            //Get product details
            Products detail = _db.Products.Find(Id);

            //Get bid data from form
            if (User.Identity.IsAuthenticated)
            {  
                bidin.ProductID = Id;
                bidin.UserID = User.Identity.GetUserId();
                bidin.UserName = User.Identity.GetUserName();
                bidin.BidAmount = BidAmount;
                bidin.Timestamp = DateTime.Now;
            }

            //passing  bid object to AddBid() function
            AddBid(bidin);
            
            //rewriting latest bid           
            if(bidin.BidAmount > detail.LatestBid)
            {
                detail.LatestBid = bidin.BidAmount;
            }

            if (ModelState.IsValid) {
                UpdateProducts(detail);
                TempData["BidSuccess"] = "Bid Success";
            }
           
            return RedirectToAction("Details",new { @id = Id } );
        }


        public bool AddBid(Bid b)
        {
            if (ModelState.IsValid) {
                _db.Bids.Add(b);
               
            }
            //Add bid amount to database
            return _db.SaveChanges() > 0;
        }

        public bool UpdateProducts(Products b)
        {
            _db.Products.Update(b);
            return _db.SaveChanges() > 0;
        }


        public IActionResult Art(string sortOrder)
        {
            //sorting logic
            switch (sortOrder)
            {
                case "Name":
                    List<Products> model = (from p in _db.Products
                                            where p.Category == "Art"
                                            orderby p.ProductName
                                            select p).ToList();
                    return View(model);                  

                case "Price":
                    List<Products> model1 = (from p in _db.Products
                                             where p.Category == "Art"
                                             orderby p.MinPrice
                                             select p).ToList();
                    return View(model1);

                case "EndTime":
                    List<Products> model2 = (from p in _db.Products
                                             where p.Category == "Art"
                                             orderby p.EndTime
                                             select p).ToList();
                    return View(model2);

                default:
                    List<Products> model3 = (from p in _db.Products
                                             where p.Category == "Art"
                                             select p).ToList();
                    return View(model3);
            }
        }

        public IActionResult Coins(string sortOrder)
        {
            //sorting logic
            switch (sortOrder)
            {
                case "Name":
                    List<Products> model = (from p in _db.Products
                                            where p.Category == "Coins"
                                            orderby p.ProductName
                                            select p).ToList();
                    return View(model);

                case "Price":
                    List<Products> model1 = (from p in _db.Products
                                             where p.Category == "Coins"
                                             orderby p.MinPrice
                                             select p).ToList();
                    return View(model1);

                case "EndTime":
                    List<Products> model2 = (from p in _db.Products
                                             where p.Category == "Coins"
                                             orderby p.EndTime
                                             select p).ToList();
                    return View(model2);

                default:
                    List<Products> model3 = (from p in _db.Products
                                             where p.Category == "Coins"
                                             select p).ToList();
                    return View(model3);
            }
        }

        public IActionResult Jewellery(string sortOrder)
        {
            //sorting logic
            switch (sortOrder)
            {
                case "Name":
                    List<Products> model = (from p in _db.Products
                                            where p.Category == "Jewellery"
                                            orderby p.ProductName
                                            select p).ToList();
                    return View(model);

                case "Price":
                    List<Products> model1 = (from p in _db.Products
                                             where p.Category == "Jewellery"
                                             orderby p.MinPrice
                                             select p).ToList();
                    return View(model1);

                case "EndTime":
                    List<Products> model2 = (from p in _db.Products
                                             where p.Category == "Jewellery"
                                             orderby p.EndTime
                                             select p).ToList();
                    return View(model2);

                default:
                    List<Products> model3 = (from p in _db.Products
                                             where p.Category == "Jewellery"
                                             select p).ToList();
                    return View(model3);
            }
        }

        public IActionResult Furniture(string sortOrder)
        {
            //sorting logic
            switch (sortOrder)
            {
                case "Name":
                    List<Products> model = (from p in _db.Products
                                            where p.Category == "Furniture"
                                            orderby p.ProductName
                                            select p).ToList();
                    return View(model);

                case "Price":
                    List<Products> model1 = (from p in _db.Products
                                             where p.Category == "Furniture"
                                             orderby p.MinPrice
                                             select p).ToList();
                    return View(model1);

                case "EndTime":
                    List<Products> model2 = (from p in _db.Products
                                             where p.Category == "Furniture"
                                             orderby p.EndTime
                                             select p).ToList();
                    return View(model2);

                default:
                    List<Products> model3 = (from p in _db.Products
                                             where p.Category == "Furniture"
                                             select p).ToList();
                    return View(model3);
            }
        }
    }
}
