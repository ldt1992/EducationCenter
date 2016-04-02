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

    public DataTable TinMoiNhat()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top 3 * from POST p join Images img on p.PostImage = img.ImagesID order by DateOfCreate desc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }
}