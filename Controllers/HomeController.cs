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
                                        orderby p.ImageID
                                        select p).ToList();
                return View(model);
            

        }
        // GET: Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ImageId,ImageName,Description,Category,MinPrice,MaxPrice,EndTime,LatestBid,ProductImage")] Products p)
        {
            if (ModelState.IsValid)
            {
                //Save image to wwwroot/image
                string wwwRootPath = _hostEnvironment.WebRootPath;
                string fileName = Path.GetFileNameWithoutExtension(p.ProductImage.FileName);
                string extension = Path.GetExtension(p.ProductImage.FileName);
                p.ImageName = fileName = fileName + DateTime.Now.ToString("yymmssfff") ;
                string path = Path.Combine(wwwRootPath + "/Image/", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await p.ProductImage.CopyToAsync(fileStream);
                }
                //Insert record
                _db.Add(p);
                await _db.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(p);
     
        }
 
            public async Task<IActionResult> Search(string searchByName)
            {
                var search = from m in _db.Products
                             select m;

                if (!String.IsNullOrEmpty(searchByName))
                {
                    search = search.Where(s => s.ImageName.Contains(searchByName));
                }

                 return View(await search.ToListAsync());
        } 
        }
    }
