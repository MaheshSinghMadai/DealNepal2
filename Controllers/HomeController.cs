using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.Data;
using UserManagement.Models;
using Microsoft.AspNet.Identity;
using UserManagement.ViewModels;

namespace UserManagement.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _db;
        private readonly IWebHostEnvironment _hostEnvironment;

        public HomeController(ApplicationDbContext db, IWebHostEnvironment hostEnvironment)
        {
            _db = db;
            
            this._hostEnvironment = hostEnvironment;
        }
        public IActionResult Index()
        {
            
                List<Products> model = (from p in _db.Products
                                        orderby p.ProductID
                                        select p).Take(6).ToList();
                return View(model);
        }

        public IActionResult SeeAll(string sortOrder)
        {
            //sorting logic
            switch (sortOrder)
            {
                case "Name":
                    List<Products> model = (from p in _db.Products                                          
                                            orderby p.ProductName
                                            select p).ToList();
                    return View(model);                   

                case "Price":
                    List<Products> model1 = (from p in _db.Products
                                             orderby p.MinPrice
                                             select p).ToList();
                    return View(model1);
                  
                case "EndTime":
                    List<Products> model2 = (from p in _db.Products
                                             orderby p.EndTime
                                             select p).ToList();
                    return View(model2);                  

                default:
                    List<Products> model3 = (from p in _db.Products
                                             select p).ToList();
                    return View(model3);               
            }
        }
        // GET: Create
        public IActionResult Create()
        {
            if (User.Identity.IsAuthenticated)
            {
                return View();
            }
            else
            {
                return RedirectToPage("/Account/Login", new { area = "Identity" });
            }
               
        }

        // POST: Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProductID,ProductName,Description,Category,MinPrice,MaxPrice,EndTime,LatestBid,ProductImage")] Products p)
        {
            if (User.Identity.IsAuthenticated)
            {
                p.UserID = User.Identity.GetUserId();
                p.UserName = User.Identity.GetUserName();
                p.StartTime = DateTime.Now;
                if (ModelState.IsValid)
                {
                    //Save image to wwwroot/image
                    string wwwRootPath = _hostEnvironment.WebRootPath;
                    string fileName = Path.GetFileNameWithoutExtension(p.ProductImage.FileName);
                    string extension = Path.GetExtension(p.ProductImage.FileName);
                    p.ProductImageName = fileName += DateTime.Now.ToString("yymmssfff") + extension;
                    string path = Path.Combine(wwwRootPath + "/image/", fileName);
                    using (var fileStream = new FileStream(path, FileMode.Create))
                    {
                        await p.ProductImage.CopyToAsync(fileStream);
                    }
                    //Insert record

                    _db.Add(p);
                    await _db.SaveChangesAsync();

                    TempData["AlertMessage"] = "Created Successfully";
                    return RedirectToAction("MyAuction","UserData");
                }
            }
            return View(p);   
        }

        public async Task<IActionResult> Search(string searchString)
        {
            var search = from m in _db.Products
                         select m;

            TempData["search"] = searchString;

            if (!String.IsNullOrEmpty(searchString))
            {
                var search1 = from m in _db.Products
                              where m.ProductName.Contains(searchString) ||
                              searchString == m.Category
                              select m;
                return View(await search1.ToListAsync());
            }
            return View(await search.ToListAsync());
        }

        public IActionResult BidsWon()
        {
            var currentUser = User.Identity.GetUserName();
            var model = (from bd in _db.Bids
                         join pd in _db.Products
                         on bd.ProductID equals pd.ProductID
                         where (pd.EndTime <= DateTime.Now)
                         &&
                         (bd.BidAmount == pd.LatestBid)
                         &&
                         (bd.UserName == currentUser)
                         select new BidDetails
                         {
                             bids = bd,
                             products = pd
                         }
                        
                         );

            return View(model);
        }
    }
 }
