using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for BLL_GiaoVien
/// </summary>
public class BLL_GiaoVien
{
    private DAL_Connection _connect;
    public BLL_GiaoVien()
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

    //LẤY DANH SÁCH GIÁO VIÊN
    public DataTable DanhSachGiaoVien()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from  kus_GVHopDong";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //LẤY THÔNG TIN CHI TIẾT CỦA GIÁO VIÊN
    public DataTable GiaoVienChiTiet(string id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from  kus_GVHopDong where GVID = " + id;
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }
}