using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Loai : System.Web.UI.Page
{
    private BLL_Category _Category = new BLL_Category();
    //Biến dùng cho Permalink
    public string idCurrent = "";
    public string idParent = "";
    public string nameCurrent = "";
    public string nameParent = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            ListItemLoai();
            Permalink();
        }
    }

    private void ListItemLoai()
    {
        string id = Request.QueryString["id"];
        repListLoai.DataSource = this._Category.LayItemLoai(id);
        repListLoai.DataBind();
    }

    private void Permalink()
    {
        string id = Request.QueryString["id"];

        DataTable dt1 = this._Category.LayDanhMucTheoID(id);
        foreach (DataRow item in dt1.Rows)
        {
            idCurrent = item[0].ToString();
            nameCurrent = item[1].ToString();
        }

        DataTable dt2 = this._Category.LayDanhMucChaByCateID(id);
        foreach (DataRow item in dt2.Rows)
        {
            idParent = item[0].ToString();
            nameParent = item[1].ToString();
        }


    }
}