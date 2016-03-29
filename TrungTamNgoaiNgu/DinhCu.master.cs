using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class ThemeDinhCu_DinhCu : System.Web.UI.MasterPage
{
    private BLL_MainMenu _MainMenu;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this._MainMenu == null)
            this._MainMenu = new BLL_MainMenu();

        if (!IsPostBack)
        {
            this.ShowMenu();
        }
    }

    private void ShowMenu()
    {
        DataTable tb = this._MainMenu.GetMainMenu();
        string str = "";
        foreach (DataRow item in tb.Rows)
        {
            str += "<li><a href='" + item[2].ToString() +"'>" + item[1].ToString() + "</a></li>";
        }
        MainMenu.InnerHtml = str;
    }
}
