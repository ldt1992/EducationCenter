using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class KetQuaTimKiem : System.Web.UI.Page
{
    private BLL_Post _Post = new BLL_Post();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
            KQTK();
    }

    private void KQTK()
    {
        string kw = Request.QueryString["keyword"];
        Response.Write("<script>alert('" + kw + "')</script>");
        repKetQuaTimKiem.DataSource = this._Post.TimKiemFTS(kw);
        repKetQuaTimKiem.DataBind();
    }
}