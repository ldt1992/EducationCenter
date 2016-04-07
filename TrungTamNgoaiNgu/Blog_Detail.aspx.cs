using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class ThemeDinhCu_Blog_Detail : System.Web.UI.Page
{
    private BLL_Post _Post = new BLL_Post();
    private BLL_Category _Category = new BLL_Category();

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ChiTiet();
            CungChuDe();
            XemNhieu();
            Permalink();
        }
    }
    //Chi Tiết
    private void ChiTiet()
    {
        string id = Request.QueryString["id"];
        repChiTiet.DataSource = this._Post.ChiTiet(id);
        repChiTiet.DataBind();

        this._Post.TangView(id);
    }

    //Cùng chủ đề
    private void CungChuDe()
    {
        string id = Request.QueryString["id"];

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

    private void Permalink()
    {
        string id_post = Request.QueryString["id"];

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
}