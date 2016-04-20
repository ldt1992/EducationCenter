using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class NgoaiNgu_GiaoVien : System.Web.UI.Page
{
    private BLL_GiaoVien _GiaoVien = new BLL_GiaoVien();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ThongTinGiaoVien();
        }
    }

    private void ThongTinGiaoVien()
    {
        //string idGV = Request.QueryString["id"];
        string idGV = RouteData.Values["id"].ToString();
        repGiaoVien.DataSource = this._GiaoVien.GiaoVienChiTiet(idGV);
        repGiaoVien.DataBind();
    }
}