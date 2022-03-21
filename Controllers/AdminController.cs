using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using UserManagement.Data;
using UserManagement.Models;
using System.Linq;
using UserManagement.ViewModels;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System;
using System.Threading.Tasks;

namespace UserManagement.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AdminController(ApplicationDbContext db, IWebHostEnvironment hostEnvironment)
        {
            _db = db;

            this._hostEnvironment = hostEnvironment;
        }


        [Authorize(Roles ="Admin")]
        public IActionResult Index()
        {
            //joining products and bid table
            var model = (from pd in _db.Products
                         join bd in _db.Bids
                         on pd.ProductID equals bd.ProductID
                         select pd);

            DashboardViewModel dashboard = new DashboardViewModel
            {
                //Categorical bid Count
                Art_BidCount = model.Count(p => p.Category == "Art"),
                Coins_BidCount = model.Count(p => p.Category == "Coins"),
                Furniture_BidCount = model.Count(p => p.Category == "Furniture"),
                Jewellery_BidCount = model.Count(p => p.Category == "Jewellery"),

                //Entity Count
                Products_count = _db.Products.Count(),
                Bids_count = _db.Bids.Count(),
                Users_count = _db.Users.Count(),
                UserActivity_count = _db.UserActivities.Count(),

                //Category counts
                Coins_count = _db.Products.Count(p => p.Category == "Coins"),
                Art_count = _db.Products.Count(p => p.Category == "Art"),
                Jewellery_count = _db.Products.Count(p => p.Category == "Jewellery"),
                Furniture_count = _db.Products.Count(p => p.Category == "Furniture"),

                //Monthly Activity Count
                Jan_ActivityCount = _db.UserActivities.Count(p => p.ActivityDate.Month == 01),
                Feb_ActivityCount = _db.UserActivities.Count(p => p.ActivityDate.Month == 02 ),
                Mar_ActivityCount = _db.UserActivities.Count(p => p.ActivityDate.Month == 03),
                Apr_ActivityCount = _db.UserActivities.Count(p => p.ActivityDate.Month == 04),
                Jun_ActivityCount = _db.UserActivities.Count(p => p.ActivityDate.Month == 05),
            };           

            return View(dashboard);
        }

        public IActionResult CR()
        {
            TempData["Message"] = "Bid Success";

            return View();
        }

        public IActionResult ProductDetails()
        {
            List<Products> model = (from pd in _db.Products
                                    orderby pd.ProductID
                                    select pd).ToList();

            return View(model);
        }

        public IActionResult BidDetails()
        {
            var model = (from bd in _db.Bids 
                               join pd in _db.Products 
                               on bd.ProductID equals pd.ProductID
                               select new BidDetails
                               {
                                  bids = bd,
                                  products = pd
                               });

            return View(model);
        }

        public IActionResult UserDetails()
        {
            return RedirectToAction("Index", "UserRoles");
        }

        public IActionResult UserActivityDetails()
        {
            List<UserActivity> model = (from pd in _db.UserActivities
                               orderby pd.Id
                               select pd).ToList();

            return View(model);
        }

        public IActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }

            var obj = _db.Products.Find(id);
            if (obj == null)
            {
                return NotFound();
            }
            return View(obj);
        }

        //POST-Edit
        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public async Task<IActionResult> Edit(Products obj, int Id)
        {
            if (ModelState.IsValid)
            {
                var obj1 = _db.Products.Find(Id);
                obj1.ProductName = obj.ProductName;
                obj1.Category = obj.Category;
                obj1.Description = obj.Description;
                obj1.EndTime = obj.EndTime;
                obj1.MaxPrice = obj.MaxPrice;
                obj1.MinPrice = obj.MinPrice;
                if (obj.ProductImage != null)
                {
                    string wwwRootPath = _hostEnvironment.WebRootPath;
                    string fileName = Path.GetFileNameWithoutExtension(obj.ProductImage.FileName);
                    string extension = Path.GetExtension(obj.ProductImage.FileName);
                    obj1.ProductImageName = fileName += DateTime.Now.ToString("yymmssfff") + extension;
                    string path = Path.Combine(wwwRootPath + "/image/", fileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        await obj.ProductImage.CopyToAsync(fileStream);
                    }
                }
                await _db.SaveChangesAsync();

                //display message upon edit success
                TempData["AlertMessage"] = "Created Successfully";

                return RedirectToAction("ProductDetails");
            }
            return View(obj);
        }

        //GET-Delete
        public IActionResult Delete(int? id)
        {
            if (id == null || id == 0)
            {
                return NotFound();
            }

            var obj = _db.Products.Find(id);
            if (obj == null)
            {
                return NotFound();
            }
            return View(obj);
        }

        //POST-Delete
        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public IActionResult DeletePost(int? id)
        {
            _db.Products.Remove(_db.Products.Find(id));
            _db.SaveChanges();
            return RedirectToAction("ProductDetails");
        }

        public  async Task<IActionResult> Details(int? id)
        {
            Products detail = _db.Products.Find(id);

            await Task.Delay(100);
            //Display bid history
            List<Bid> bidhistory = (from p in _db.Bids
                                    where detail.ProductID == p.ProductID
                                    orderby p.Timestamp descending
                                    select p).ToList();

            Details model = new Details();
            model.listA = detail;
            model.listD = bidhistory;

            return View(model);
        }
    }
}
