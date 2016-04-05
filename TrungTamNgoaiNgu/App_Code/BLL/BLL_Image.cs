using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for BLL_Image
/// </summary>
public class BLL_Image
{
    private DAL_Connection _connect;
    public BLL_Image()
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

    public DataTable LayHinhAnh()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top 8 * from Images where ImagesTypeID = 7";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    public DataTable HinhAnhTheoLoai(int id)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top 12 * from Images where ImagesTypeID = " + id + " order by NEWID()";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

}