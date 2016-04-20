using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class NgoaiNgu_NgoaiNgu : System.Web.UI.MasterPage
{
    BLL_MainMenu _Menu = new BLL_MainMenu();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            LoadMenu();
        }
    }

    private void LoadMenu()
    {
        rpMenu.DataSource = this._Menu.GetMainMenu_NgoaiNgu();
        rpMenu.DataBind();
    }
}
