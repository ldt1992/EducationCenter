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

    public DataTable LayDanhMuc()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select * from Category order by CategoryID asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }
}