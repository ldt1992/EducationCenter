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
        {
            ThanhPhanDanhMuc();
            repDanhMuc_content.DataSource = Nuoc();
            repDanhMuc_content.DataBind();
        }
    }

    private void ThanhPhanDanhMuc()
    {
        string id = Request.QueryString["id"];
        string idCategory = "";

        DataTable dt = this._Category.LayDanhMucTheoID(id);
        foreach (DataRow item in dt.Rows)
        {
            DanhMuc = item[1].ToString();
        }

        repDanhMuc_nav.DataSource = this._Category.LayListCountry(id);
        repDanhMuc_nav.DataBind();

        

        DataTable dt2 = this._Category.LayListCountry(id);
        foreach (DataRow item in dt2.Rows)
        {
            idCategory = item[0].ToString();
        }
    }

    public DataTable Nuoc()
    {
        string id = Request.QueryString["id"];
        DataTable ListCountry = this._Category.LayListCountry(id);
        return ListCountry;
    }

    public DataTable LoaiHinh(string loaihinh_id)
    {
        DataTable ListLoaiHinh = this._Category.LayItemLoai(loaihinh_id);
        return ListLoaiHinh;
    }
}