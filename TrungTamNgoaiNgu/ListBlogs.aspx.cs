using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class ThemeDinhCu_ListBlogs : System.Web.UI.Page
{
    private BLL_Post _Post = new BLL_Post();
    private BLL_Category _Category = new BLL_Category();

    public string idParent = "";
    public string idGrand = "";
    public string ActivedPage = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ListPost();
            TinTucMoiNhat();
            TieuDeBaiViet();
            //PhanTrang();
        }
    }

    private void ListPost()
    {
        string id = Request.QueryString["id"];
        //DataTable dt = this._Post.DanhSachBaiViet(id);
        //string str = "";
        //string homeurl = "http://192.168.10.3:8686/";
        //foreach (DataRow item in dt.Rows)
        //{
        //    str += "<div class='thumbnail blog'>";
        //    str += "<a href='#' class='pull-left'>";
        //    str += "<img src='" + homeurl + item[23].ToString() + "' alt='' class='img-responsive img-thumbnail' /></a>";

        //    str += "<div class='caption'>";
        //    str += "<a href='#' title='" + item[1].ToString() + "'>";
        //    str += "<h3 class='title'>" + item[1].ToString() + "</h3></a>";
        //    str += "<p class='meta'>" + item[3].ToString() + "</p>";
        //    str += "<p class='btnXem'><a href='Blog_Detail.aspx' class='btn btn-info'>Xem thêm</a></p>";
        //    str += "</div></div>";
        //    str += "<div class='clearfix'></div>";
        //}
        //MainContent.InnerHtml = str;

        dlBaiViet.DataSource = this._Post.DanhSachBaiViet(id);
        dlBaiViet.DataBind();
    }

    private void TinTucMoiNhat()
    {
        DataTable dt = this._Post.TinMoiNhat(6);
        string str = "";
        string homeurl = "http://192.168.10.3:8686/";
        foreach (DataRow item in dt.Rows)
        {
            str += "<div class='media post'>";
            str += "<a href='#'>";
            str += "<img src='" + homeurl + item[15].ToString() + "' alt='' class='img-responsive img-thumbnail pull-left' /></a>";
            str += "<div class='media-body'>";
            str += "<a href='#'><h4 class='title media-heading'>" + item[1].ToString() + "</h3></a>";
            str += "<p class='btnXem'><a href='#' class='btn btn-info'>Xem Thêm</a></p>";
            str += "</div></div>";
        }
        TinMoiNhat.InnerHtml = str;
    }

    private void TieuDeBaiViet()
    {
        string id = Request.QueryString["id"];
        DataTable dt1 = this._Category.LayDanhMucTheoID(id);

        string str1 = "";
        string str2 = "";
        string str3 = "";

        foreach (DataRow r1 in dt1.Rows)
        {
            str1 = r1[1].ToString().ToUpper();
            ActivedPage = r1[1].ToString();
        }

        DataTable dt3 = this._Category.LayDanhMucCha(id);
        string country = "";
        foreach (DataRow r3 in dt3.Rows)
        {
            str3 = r3[1].ToString().ToUpper();
            country = r3[0].ToString().ToUpper();
        }

        DataTable dt2 = this._Category.LayDanhMucCha(country);
        foreach (DataRow r2 in dt2.Rows)
        {
            str2 = r2[1].ToString().ToUpper();
            idGrand = r2[0].ToString();
        }

        TieuDe.InnerText = "CÁC TRƯỜNG " + str1 + " " + str2 + " " + str3;
        idParent = country;

    }

    private void PhanTrang()
    {
        string id = Request.QueryString["id"];
        pager.DataSource = this._Post.DanhSachBaiViet(id).DefaultView;
        //pager.BindToControl = MainContent;
    }
}