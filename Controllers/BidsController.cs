using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNet.Identity;
using UserManagement.Data;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Principal;

namespace UserManagement.Models
{
    public class BidsController : Controller
    {
        private readonly ApplicationDbContext _db;

        public BidsController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public IActionResult Bid()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Basic")]
        public IActionResult Bid(int ProductID, double BidAmount)
        {
            Bid bid = new Bid();

            if (User.Identity.IsAuthenticated) 
            {
                bid.ProductID = ProductID;
                bid.UserID = User.Identity.GetUserId();
                bid.BidAmount = BidAmount;
                bid.Timestamp = DateTime.Now;
            }

            AddBid(bid);

            return View();
        }

      
        public bool AddBid(Bid b)
        {
            _db.Bids.Add(b);
            return _db.SaveChanges() > 0;
        }
    }
}
