using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using NReco.CF.Taste.Impl.Model;
using NReco.CF.Taste.Impl.Model.File;
using NReco.CF.Taste.Impl.Neighborhood;
using NReco.CF.Taste.Impl.Recommender;
using NReco.CF.Taste.Impl.Similarity;
using NReco.CF.Taste.Model;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
//using System.Web.Mvc;

namespace UserManagement.Controllers
{
    public class RecommendController : Controller
    {
		public IActionResult RecommendProductPage()
		{
			return View();
		}

		static IDataModel dataModel;

		public IActionResult GetRecommendedProduct(string ProdIdsJson)
		{
			var ProdIds = (new JavaScriptSerializer()).Deserialize<long[]>(ProdIdsJson);


			var plusAnonymModel = new PlusAnonymousUserDataModel(dataModel);
			var prefArr = new GenericUserPreferenceArray(ProdIds.Length);
			prefArr.SetUserID(0, PlusAnonymousUserDataModel.TEMP_USER_ID);
			for (int i = 0; i < ProdIds.Length; i++)
			{
				prefArr.SetItemID(i, ProdIds[i]);


				prefArr.SetValue(i, 5);
			}
			plusAnonymModel.SetTempPrefs(prefArr);

			var similarity = new LogLikelihoodSimilarity(plusAnonymModel);
			var neighborhood = new NearestNUserNeighborhood(15, similarity, plusAnonymModel);
			var recommender = new GenericUserBasedRecommender(plusAnonymModel, neighborhood, similarity);
			var recommendedItems = recommender.Recommend(PlusAnonymousUserDataModel.TEMP_USER_ID, 5, null);

			return Json(recommendedItems.Select(ri => new Dictionary<string, object>() {
				{"Prod_id", ri.GetItemID() },
				{"user", ri.GetValue() },
				}).ToArray());
		}


        //public IActionResult GetProduct()
        //{
        //    //var csv = new CsvReader(new StreamReader(HttpContext.Server.MapPath("~/App_Data/product.csv")));
        //    var records = csv.GetRecords<ProductRecord>();
        //    return Json(records, JsonRequestBehavior.AllowGet);
        //}

        public class ProductRecord
		{
			public int ProdId { get; set; }
			public string Name { get; set; }
		}
	}
}
