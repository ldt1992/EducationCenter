using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class NgoaiNgu_ListTeachers : System.Web.UI.Page
{
    private BLL_GiaoVien _GiaoVien = new BLL_GiaoVien();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ListGiaoVien();
        }
    }

    private void ListGiaoVien()
    {
        rpDSGiaoVien.DataSource = this._GiaoVien.DanhSachGiaoVien();
        rpDSGiaoVien.DataBind();
    }
}