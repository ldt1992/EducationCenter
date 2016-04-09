using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for BLL_Post
/// </summary>
public class BLL_Post
{
    private DAL_Connection _connect;
    public BLL_Post()
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

    //Danh sách tin tức mới nhất
    public DataTable ListTinMoiNhat(int top)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top " + top + " p.PostID, p.PostTitle, p.PostContentVN, img.ImagesUrl, img.ImagesName from POST p join Images img on p.PostImage = img.ImagesID order by DateOfCreate desc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Danh sách bài viết
    public DataTable DanhSachBaiViet(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from POST p join Post_Category_relationships p_ct on p.PostID=p_ct.PostID join Category ct on p_ct.CategoryID=ct.CategoryID join Images img on p.PostImage=img.ImagesID where ct.CategoryID = " + id;
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Thông tin chi tiết bài viết theo id
    public DataTable ChiTiet(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from POST p join Images img on p.PostImage = img.ImagesID join ImagesType typeimg on img.ImagesTypeID = typeimg.ImagesTypeID where PostID =" + id;
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //List post cùng chủ đề với current post
    public DataTable PostCungChuDe(string idPost)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from POST p join Post_Category_relationships p_ct on p.PostID = p_ct.PostID join Images img on p.PostImage = img.ImagesID where p_ct.CategoryID = ( select p_ct.CategoryID from POST p join Post_Category_relationships p_ct on p.PostID = p_ct.PostID where p.PostID = " + idPost + " ) and p.PostID != " + idPost;
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Tăng lượt xem
    public int TangView(string post_id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "update POST set ViewCount = (ViewCount + 1) where PostID = @post_id";
        List<SqlParameter> listParams = new List<SqlParameter>();
        listParams.Add(new SqlParameter("@post_id", post_id));

        int result = this._connect.ExecQuery(query, listParams);

        this.CloseConnect();
        return result;
    }

    //List post xem nhiều
    public DataTable PostXemNhieu(int top)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top " + top + " p.PostID, p.PostTitle, img.ImagesUrl, img.ImagesName, p.ViewCount from POST p join Images img on p.PostImage=img.ImagesID order by p.ViewCount desc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //Tìm kiếm Full Text Search
    public DataTable TimKiemFTS(string keyword)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from POST p join Images img on p.PostImage = img.ImagesID where FREETEXT((PostContentVN , PostTitle), '" + keyword + "')";
        //string query = "select * from POST where PostContentVN like N'%" + keyword + "%'";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }
}