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
        }
    }

    private void ChiTiet()
    {
        string id = Request.QueryString["id"];
        repChiTiet.DataSource = this._Post.ChiTiet(id);
        repChiTiet.DataBind();

        this._Post.TangView(id);
    }

    private void CungChuDe()
    {
        string id = Request.QueryString["id"];

        repPostLienQuan.DataSource = this._Post.PostCungChuDe(id);
        repPostLienQuan.DataBind();
    }

    private void XemNhieu()
    {
        repXemNhieu.DataSource = this._Post.PostXemNhieu(5);
        repXemNhieu.DataBind();
    }
}