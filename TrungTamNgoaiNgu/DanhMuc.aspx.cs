using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class DuHoc : System.Web.UI.Page
{
    private BLL_Category _Category;
    public string DanhMuc = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        this._Category = new BLL_Category();

        if (!Page.IsPostBack)
            ThanhPhanDanhMuc();
    }

    private void ThanhPhanDanhMuc()
    {
        string id = Request.QueryString["id"];

        DataTable dt = this._Category.LayDanhMucTheoID(id);
        foreach (DataRow item in dt.Rows)
        {
            DanhMuc = item[1].ToString();
        }

        repDanhMuc.DataSource = this._Category.LayListCountry(id);
        repDanhMuc.DataBind();
    }
}