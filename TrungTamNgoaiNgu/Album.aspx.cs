using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Album : System.Web.UI.Page
{
    private BLL_Image _Image;
    protected void Page_Load(object sender, EventArgs e)
    {
        this._Image = new BLL_Image();

        if (!Page.IsPostBack)
            this.Albums();
    }

    private void Albums()
    {
        DataTable dt = this._Image.HinhAnhTheoLoai(7);
        string str = "";
        string homeurl = "http://192.168.10.3:8686/";
        foreach (DataRow r in dt.Rows)
        {
            str += "<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item duhoc'>";
            str += "<div class='post'>";
            str += "<a href='" + homeurl + r[2].ToString() + "' rel='prettyPhoto[gallery2]'>";
            str += "<img src='" + homeurl + r[2].ToString() + "' class='img-responsive img-thumbnail' alt='' /></a>";
            str += "</div></div>";
        }
        HinhAnh.InnerHtml = str;
    }
}