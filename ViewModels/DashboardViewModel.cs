using System.Collections.Generic;

namespace UserManagement.ViewModels
{
    public class DashboardViewModel
    {
        //Entity Count
        public int Products_count { get; set; }
        public int Bids_count { get; set; }
        public int Users_count { get; set; }
        public int UserActivity_count { get; set; }

        //Category counts
        public int Coins_count { get; set; }
        public int Furniture_count { get; set; }
        public int Jewellery_count { get; set; }
        public int Art_count { get; set; }

        //Category counts
        public int Coins_BidCount { get; set; }
        public int Furniture_BidCount { get; set; }
        public int Jewellery_BidCount { get; set; }
        public int Art_BidCount { get; set; }

        //Monthly activity count
        public int Jan_ActivityCount { get; set; }
        public int Feb_ActivityCount { get; set; }
        public int Mar_ActivityCount { get; set; }
        public int Apr_ActivityCount { get; set; }
        public int Jun_ActivityCount { get; set; }
    }
}
