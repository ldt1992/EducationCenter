using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class HomePage : System.Web.UI.Page
{
    private BLL_GiaoVien _GiaoVien = new BLL_GiaoVien();
    private BLL_PhieuTuVan _PhieuTuVan = new BLL_PhieuTuVan();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ListGiaoVien();
        }
    }

    private void ListGiaoVien()
    {
        rpTeacher.DataSource = this._GiaoVien.DanhSachGiaoVien();
        rpTeacher.DataBind();
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string fname = "";
        string mail = "";
        string phone = "";
        string msg = "";

        fname = Fullname.Value;
        mail = Email.Value;
        phone = Phone.Value;
        msg = Message.Value;

        this._PhieuTuVan.ThemPhieuTuVan(fname, mail, phone, msg);

        Fullname.Value = "";
        Email.Value = "";
        Phone.Value = "";
        Message.Value = "";
    }
}