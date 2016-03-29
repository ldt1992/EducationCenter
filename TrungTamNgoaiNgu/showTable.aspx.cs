using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class showTable : System.Web.UI.Page
{
    private BLL_MainMenu _MainMenu;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (this._MainMenu == null)
            this._MainMenu = new BLL_MainMenu();

        if (!IsPostBack)
        {
            GridView1.DataSource = _MainMenu.MainMenu();
            GridView1.DataBind();
            this.load_Menu();
        }
    }
    private void load_Menu()
    {
        DataTable tb = _MainMenu.MainMenu();
        foreach (DataRow r in tb.Rows)
        {
            test.Text += (string)r[1];
        }

    }
}