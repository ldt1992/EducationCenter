using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

/// <summary>
/// Summary description for BLL_MainMenu
/// </summary>
public class BLL_MainMenu
{
    private DAL_Connection _connect;
    public BLL_MainMenu()
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
    //MENU DU HỌC
    public DataTable GetMainMenu(int top)
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select top " + top + " * from MainMenu order by ItemIndex asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }

    //MENU NGOẠI NGỮ
    public DataTable GetMainMenu_NgoaiNgu()
    {
        if (!this.OpenConnect())
            this.OpenConnect();

        string query = "select  * from MainMenu where MenuID >=5 order by ItemIndex asc";
        DataTable result = this._connect.GetDataTable(query);

        this.CloseConnect();
        return result;
    }
}