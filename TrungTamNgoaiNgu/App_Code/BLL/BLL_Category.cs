using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for BLL_Category
/// </summary>
public class BLL_Category
{
    private DAL_Connection _connect;
    public BLL_Category()
    {
        this._connect = new DAL_Connection();
    }

    public bool OpenConnect()
    {
        return this._connect.OpenConnect();
    }

    public void CloseConnect()
    {
        this._connect.CloseConnect();
    }

    //Lấy danh mục lớn DU HỌC - DU LỊCH - ĐỊNH CƯ
    public DataTable LayDanhMuc()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        //string query = "select * from Category order by CategoryID asc";
        string query = "select top 3 * from Category ct full outer join Images img on ct.CateogryImage=img.ImagesID where ct.CategoryID is not null order by CategoryID asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Lấy danh sách các nước 
    public DataTable LayListCountry(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category ct full outer join Images img on ct.CateogryImage=img.ImagesID where ct.Parent = " + id + " order by CategoryID asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Lấy các loại hình đào tạo theo từng nước
    public DataTable LayItemLoai(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category ct join Images img on ct.CateogryImage=img.ImagesID where Parent =  " + id + " order by ItemIndex asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Lấy loại danh mục theo id
    public DataTable LayDanhMucTheoID(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category where CategoryID = " + id;
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Lấy danh mục cha theo id category con
    public DataTable LayDanhMucChaByCateID(string idSubCategory)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category where CategoryID = (select Parent from Category where CategoryID = " + idSubCategory + ")";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Lấy danh mục cha theo post id
    public DataTable LayDanhMucChaByPostID(string id_post)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category where CategoryID = (select p_ct.CategoryID from POST p join Post_Category_relationships p_ct on p.PostID = p_ct.PostID where p.PostID = " + id_post + ")";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

}