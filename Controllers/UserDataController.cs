using Microsoft.AspNetCore.Mvc;
using UserManagement.Data;
using UserManagement.Models;
using Microsoft.AspNet.Identity;
using System.Linq;
using System.Collections.Generic;
using UserManagement.ViewModels;

namespace UserManagement.Controllers
{
    public class UserDataController : Controller
    {
        private readonly ApplicationDbContext _db;
        public UserDataController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult MyAuction()
        {    
            var uid = User.Identity.GetUserId();
            
            List<Products> model = (from p in _db.Products
                                   where uid == p.UserID
                                   orderby p.ProductID
                                   select p).ToList();

            return View(model);   
        }

        public IActionResult MyBids()
        {
            Bid bid = new Bid
            {
                UserID = User.Identity.GetUserId(),
            };

            var model = (from bd in _db.Bids
                         join pd in _db.Products
                         on bd.ProductID equals pd.ProductID
                         where bd.UserID == bid.UserID
                         orderby bd.BidID
                         select new BidDetails
                         {
                             bids = bd,
                             products = pd
                         });

            return View(model);
        }

        public IActionResult AuctioneerRequest()
        {
            return View();
        }
    }
}
