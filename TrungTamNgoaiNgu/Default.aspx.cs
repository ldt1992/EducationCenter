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
        //DataTable dt = this._Img.LayHinhAnh();
        //string str = "";
        //foreach (DataRow r in dt.Rows)
        //{
        //    str += "<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn'>";
        //    str += "<img src='http://192.168.10.3:8686/" + r[2].ToString() + "' class='img-responsive' />";
        //    str += "<div class='caption'><h3 class='title'>Soccer</h3><a href = 'img/" + r[2].ToString() + "' rel='prettyPhoto[gallery1]' class='btn btn-default'>EXPAND</a></div>";
        //    str += "</div>";
        //}
        //HinhAnh.InnerHtml = str;

        repHoatDong.DataSource = this._Img.LayHinhAnh();
        repHoatDong.DataBind();
    }

}