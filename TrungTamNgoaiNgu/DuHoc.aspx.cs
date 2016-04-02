using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class DuHoc : System.Web.UI.Page
{
    private BLL_Category _Category;
    protected void Page_Load(object sender, EventArgs e)
    {
        this._Category = new BLL_Category();

        if (!Page.IsPostBack)
            DanhMucCon_DuHoc();
    }

    private void DanhMucCon_DuHoc()
    {
        string id = Request.QueryString["id"];

        if (id == "9")
            tieude.InnerText = "DU HỌC";
        else if (id == "10") tieude.InnerText = "DU LỊCH";
        else if (id == "11") tieude.InnerText = "ĐỊNH CƯ";

        DataTable dt = this._Category.LayDanhMucDuHoc(id);
        string str = "";
        string homeUrl = "http://192.168.10.3:8686/";
        foreach (DataRow item in dt.Rows)
        {
            str += "<div class='col-lg-3 col-md-3 col-sm-3 col-xs-12 country'>";
            str += "<a href='#'>";
            str += "<img src='" + homeUrl + item[8].ToString() + "' class='img-responsive img-thumbnail' alt='' />";
            str += "<p class='text text-center'>" + item[1].ToString() + "</p>";
            str += "</a></div>";
        }
        DH.InnerHtml = str;
    }
}