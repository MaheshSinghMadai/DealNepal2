using System;

namespace UserManagement.Models
{
    public class AuctioneerRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int UserName { get; set; }
        public string Data { get; set; }

        public DateTime ActivityDate { get; set; } = DateTime.Now;
    }
}
