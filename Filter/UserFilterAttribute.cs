﻿using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using UserManagement.Data;
using UserManagement.Models;

namespace UserManagement.Filters
{
    public class UserFilterAttribute : IActionFilter
    {
        private readonly ApplicationDbContext context;

        public UserFilterAttribute(ApplicationDbContext context)
        {
            this.context = context;
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            string data = "";

            var routeData = context.RouteData;
            var controller = routeData.Values["controller"];
            var action = routeData.Values["action"];

            var url = $"{controller}/{action}";

            if (!string.IsNullOrEmpty(context.HttpContext.Request.QueryString.Value))
            {
                data = context.HttpContext.Request.QueryString.Value;
            }
            else
            {
                var arguments = context.ActionArguments;
                var value = arguments.FirstOrDefault().Value;
                var convertedValue = JsonConvert.SerializeObject(value);
                data = convertedValue;
            }

            var user = context.HttpContext.User.Identity.Name;

            var ipAddress = context.HttpContext.Connection.RemoteIpAddress.ToString();

            SaveUserActivity(data, url, user, ipAddress);
        }

        public void SaveUserActivity(string data, string url, string user, string ipAddress)
        {
            var userActivity = new UserActivity
            {
                Data = data,
                Url = url,
                UserName = user,
                IpAddress = ipAddress
            };

            context.UserActivities.Add(userActivity);
            context.SaveChanges();
        }
    }
}

