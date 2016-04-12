using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class ThemeDinhCu_Default : System.Web.UI.Page
{
    private BLL_Category _Category;
    private BLL_Post _Post;
    private BLL_Image _Img;
    private BLL_PhieuTuVan _PhieuTuVan = new BLL_PhieuTuVan();

    protected void Page_Load(object sender, EventArgs e)
    {
        this._Category = new BLL_Category();
        this._Post = new BLL_Post();
        this._Img = new BLL_Image();

        if (!IsPostBack)
        {
            this.DanhMuc();
            this.TinMoiNhat();
            this.HinhAnhHoatDong(); 
        }
    }

    private void DanhMuc()
    {
        dlDanhMuc.DataSource = this._Category.LayDanhMuc();
        dlDanhMuc.DataBind();
    }

    private void TinMoiNhat()
    { 
        repTinMoiNhat.DataSource = this._Post.ListTinMoiNhat(3);
        repTinMoiNhat.DataBind();
    }

    private void HinhAnhHoatDong()
    {
        repHoatDong.DataSource = this._Img.LayHinhAnh();
        repHoatDong.DataBind();
    }
    //LẤY  PHIẾU TƯ VẤN
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