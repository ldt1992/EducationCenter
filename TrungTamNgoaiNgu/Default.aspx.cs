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
        DataTable dt = this._Category.LayDanhMuc();
        string str = "";
        str += "<div class='container'>";
        foreach (DataRow r in dt.Rows)
        {
            str += "<div class='col-lg-4 col-md-6 col-sm-4 col-xs-12 act wow fadeIn'>";
            //Lấy id để truy xuất danh mục con, xài xong sẽ xóa
            str += "<h2 class='title'>" + r[0].ToString().ToUpper() + "</h2>";
            str += "<h2 class='title'>" + r[1].ToString().ToUpper() + "</h2>";
            str += "<div><a href='"+r[3].ToString()+"'><img src='http://192.168.10.3:8686/" + r[8].ToString()+"' /></a></div>";
            str += "</div>";

        }
        str += "</div>";
        Activities.InnerHtml = str;
    }

    private void TinMoiNhat()
    {
        DataTable dt = this._Post.TinMoiNhat();
        string str = "";
        foreach (DataRow r in dt.Rows)
        {
            str += "<div class='col-md-4 col-sm-6 col-xs-12 wow fadeIn'>";
            str += "<div class='thumbnail news'><div class='overlay'>";
            str += "<img src='http://192.168.10.3:8686/" + r[15].ToString()+"' class='img-responsive' />";
            str += "<div class='mask text-center'><h4 class='title'>" + r[1].ToString() + "</h4><a href='http://192.168.10.3:8686/" + r[15].ToString()+"' class='btn btn-default' rel='prettyPhoto[gallery1]'>EXPAND</a><a href='#' class='btn btn-default'>DETAILS</a></div>";
            str += "</div>";
            str+= "<a href='#' class='tag btn btn-warning'>School</a>";
            str += "<div class='caption'><a href = '#' ><h4 class='title'>" + r[1].ToString() + "</h4></a><hr /><p class='meta'>"+r[4].ToString()+"</p></div>";
            str += "</div></div>";
        }
        MoiNhat.InnerHtml = str;
    }

    private void HinhAnhHoatDong()
    {
        DataTable dt = this._Img.LayHinhAnh();
        string str = "";
        foreach (DataRow r in dt.Rows)
        {
            str += "<div class='col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn'>";
            str += "<img src='http://192.168.10.3:8686/" + r[2].ToString() + "' class='img-responsive' />";
            str += "<div class='caption'><h3 class='title'>Soccer</h3><a href = 'img/"+r[2].ToString()+"' rel='prettyPhoto[gallery1]' class='btn btn-default'>EXPAND</a></div>";
            str += "</div>";
        }
        HinhAnh.InnerHtml = str;
    }

}