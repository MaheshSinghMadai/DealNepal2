using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
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
        public IActionResult AddBid()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Buyer")]
        public async Task<IActionResult> AddBid(Bid b)
        {
            Bid bid = new Bid
            {
                ProductID = b.ProductID,
                UserID = User.Identity.Name,
                BidAmount = b.BidAmount,
                Timestamp = DateTime.Now
            };


            _db.Bids.Add(bid);
            await _db.SaveChangesAsync();

            return View();
        }
    }
}
