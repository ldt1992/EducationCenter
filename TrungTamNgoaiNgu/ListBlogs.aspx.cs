using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text.RegularExpressions;
using System.Text;

public partial class ThemeDinhCu_ListBlogs : System.Web.UI.Page
{
    private BLL_Post _Post = new BLL_Post();
    private BLL_Category _Category = new BLL_Category();

    public string id_parent1 = "";
    public string name_parent1 = "";
    public string id_parent2 = "";
    public string name_parent2 = "";
    public string ActivedPage = "";
    public string title_url_main = "";
    public string title_url_sidebar = "";

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            DanhSachPost();
            Permalink();
            TinTucMoiNhat_Sidebar();
        }
    }

    //DANH SÁCH POST
    private void DanhSachPost()
    {
        string idCategory = RouteData.Values["id"].ToString();

        //Danh sách post theo category giảm dần lượt xem
        //Using DataList & CollectionPager
        pager.PageSize = 5;
        pager.DataSource = this._Post.DanhSachBaiViet(idCategory).DefaultView;
        pager.BindToControl = dlBaiViet;
        dlBaiViet.DataSource = pager.DataSourcePaged;
    }

    //Chuyển tiêu đề tiếng việt có dấu sang không dấu dạng URL abc-def-ghi
    public string XoaKyTuDacBiet(string str)
    {
        str = str.Replace(" ", "-");
        Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
        string temp = str.Normalize(NormalizationForm.FormD);
        title_url_main = regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        return title_url_main;
    }
    //TIN TỨC MỚI NHẤT SIDEBAR
    private void TinTucMoiNhat_Sidebar()
    {
        string idCategory = RouteData.Values["id"].ToString();

        //Tin tức mới nhất theo category
        repTinMoiNhat.DataSource = this._Post.PostByCategoryID(5, idCategory);
        repTinMoiNhat.DataBind();
    }

    //PERMALINK
    private void Permalink()
    {
        string id = RouteData.Values["id"].ToString();
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