#pragma checksum "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b7c19bd82941a92d570c63659b3085733955bc3b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Admin_BidDetails), @"mvc.1.0.view", @"/Views/Admin/BidDetails.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\_ViewImports.cshtml"
using UserManagement;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\_ViewImports.cshtml"
using UserManagement.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b7c19bd82941a92d570c63659b3085733955bc3b", @"/Views/Admin/BidDetails.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5269e730751c59b5c27f9bb3e0faf3f71d5fbf7", @"/Views/_ViewImports.cshtml")]
    #nullable restore
    public class Views_Admin_BidDetails : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<UserManagement.ViewModels.BidDetails>>
    #nullable disable
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"

<br />
<h1 class=""fw-normal"" style=""color: #333;font-family:monospace"">BID DETAILS</h1>
<hr />

<table class=""table table-hover table-striped"">
    <thead>
        <tr>
            
            <th>
                User
            </th>
            <th>
               Bid Amount
            </th>
            <th>
                Timestamp
            </th>
           <th>
               Product Name
            </th>
        </tr>
    </thead>
    <tbody>
");
#nullable restore
#line 27 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
 foreach (var item in Model) {

#line default
#line hidden
#nullable disable
            WriteLiteral("        <tr>\n           \n            <td>\n                ");
#nullable restore
#line 31 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
           Write(Html.DisplayFor(modelItem => item.bids.UserName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n            </td>\n            <td>\n                ");
#nullable restore
#line 34 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
           Write(Html.DisplayFor(modelItem => item.bids.BidAmount));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n            </td>\n            <td>\n                ");
#nullable restore
#line 37 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
           Write(Html.DisplayFor(modelItem => item.bids.Timestamp));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n            </td>\n            <td>\n                ");
#nullable restore
#line 40 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
           Write(Html.DisplayFor(modelItem => item.products.ProductName));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n            </td>\n        </tr>\n");
#nullable restore
#line 43 "C:\Users\mahes\Downloads\DealNepal2-20220303T050939Z-001\Views\Admin\BidDetails.cshtml"
}

#line default
#line hidden
#nullable disable
            WriteLiteral("    </tbody>\n</table>\n");
        }
        #pragma warning restore 1998
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; } = default!;
        #nullable disable
        #nullable restore
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<UserManagement.ViewModels.BidDetails>> Html { get; private set; } = default!;
        #nullable disable
    }
}
#pragma warning restore 1591