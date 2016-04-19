using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text.RegularExpressions;
using System.Text;

public partial class test_test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        //CHUYỂN TITLE TIẾNG VIỆT CÓ DẤU SANG KHÔNG DẤU DẠNG URL  ABC-CDE
        string str = TextBox1.Text;
        str = str.Replace(" ", "-");
        Regex regex = new Regex("\\p{IsCombiningDiacriticalMarks}+");
        string temp = str.Normalize(NormalizationForm.FormD);
        string str2 = regex.Replace(temp, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D');
        Response.Write("<script>alert('" + str2 + "')</script>");
    }
}