using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Text;
using System.Text.RegularExpressions;

public partial class ThemeDinhCu_Blog_Detail : System.Web.UI.Page
{
    private BLL_Post _Post = new BLL_Post();
    private BLL_Category _Category = new BLL_Category();
    public string CurrentPageUrl = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ChiTiet();
            CungChuDe();
            XemNhieu();
            Permalink();
            CurrentPageUrl = Request.RawUrl;
        }
    }
    //Chi Tiết
    private void ChiTiet()
    {
        string id = RouteData.Values["id"].ToString();
        repChiTiet.DataSource = this._Post.ChiTiet(id);
        repChiTiet.DataBind();

        this._Post.TangView(id);
    }

    //Cùng chủ đề
    private void CungChuDe()
    {
        string id = RouteData.Values["id"].ToString();

        repPostLienQuan.DataSource = this._Post.PostCungChuDe(id);
        repPostLienQuan.DataBind();
    }

    //Xem nhiều
    private void XemNhieu()
    {
        repXemNhieu.DataSource = this._Post.PostXemNhieu(5);
        repXemNhieu.DataBind();
    }

    //List biến permalink
    public string id_parent1 = "";
    public string name_parent1 = "";
    public string id_parent2 = "";
    public string name_parent2 = "";
    public string id_parent3 = "";
    public string name_parent3 = "";

    //Permalink
    private void Permalink()
    {
        string id_post = RouteData.Values["id"].ToString();

        DataTable dt1 = this._Category.LayDanhMucChaByPostID(id_post);
        foreach (DataRow row1 in dt1.Rows)
        {
            id_parent1 = row1[0].ToString();
            name_parent1 = row1[1].ToString();
        }

        DataTable dt2 = this._Category.LayDanhMucChaByCateID(id_parent1);
        foreach (DataRow row2 in dt2.Rows)
        {
            id_parent2 = row2[0].ToString();
            name_parent2 = row2[1].ToString();
        }

        DataTable dt3 = this._Category.LayDanhMucChaByCateID(id_parent2);
        foreach (DataRow row3 in dt3.Rows)
        {
            id_parent3 = row3[0].ToString();
            name_parent3 = row3[1].ToString();
        }
    }

    //Chuyển tiêu đề tiếng việt có dấu sang không dấu dạng URL abc-def-ghi
    public string XoaKyTuDacBiet(string str)
    {
        string title_url = "";
        str = str.Replace(" ", "-");
        Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
        string temp = str.Normalize(NormalizationForm.FormD);
        title_url = regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        return title_url;
    }
}