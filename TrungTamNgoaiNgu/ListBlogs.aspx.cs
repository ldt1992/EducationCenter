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

    public string id_parent1 = "";
    public string name_parent1 = "";
    public string id_parent2 = "";
    public string name_parent2 = "";
    public string ActivedPage = "";
    public string Title = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ListPost();
            TinTucMoiNhat();
            Permalink();
        }
    }

    private void ListPost()
    {
        string id = Request.QueryString["id"];

        //Using ListView & DataPager
        //dlBaiViet.DataSource = this._Post.DanhSachBaiViet(id);
        //dlBaiViet.DataBind();

        //Using DataList & CollectionPager
        pager.PageSize = 5;
        pager.DataSource = this._Post.DanhSachBaiViet(id).DefaultView;
        pager.BindToControl = dlBaiViet;
        dlBaiViet.DataSource = pager.DataSourcePaged;
    }

    private void TinTucMoiNhat()
    {
        repTinMoiNhat.DataSource = this._Post.ListTinMoiNhat(3);
        repTinMoiNhat.DataBind();
    }

    private void Permalink()
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

        DataTable dt3 = this._Category.LayDanhMucChaByCateID(id);
        string country = "";
        foreach (DataRow r3 in dt3.Rows)
        {
            str3 = r3[1].ToString().ToUpper();
            country = r3[0].ToString().ToUpper();
        }

        DataTable dt2 = this._Category.LayDanhMucChaByCateID(country);
        foreach (DataRow r2 in dt2.Rows)
        {
            str2 = r2[1].ToString().ToUpper();
            id_parent2 = r2[0].ToString();
        }

        Title = "CÁC TRƯỜNG " + str1 + " " + str2 + " " + str3;
        id_parent1 = country;
        name_parent1 = str3;
        name_parent2 = str2;
    }
}