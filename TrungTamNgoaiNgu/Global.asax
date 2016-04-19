<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>

<script runat="server">

    void RegisterRoutes(RouteCollection routes)
    {
        //Du Học
        routes.MapPageRoute("Home", "", "~/Default.aspx");
        routes.MapPageRoute("About", "gioi-thieu", "~/GioiThieu.aspx");
        routes.MapPageRoute("Contact", "lien-he", "~/LienHe.aspx");
        routes.MapPageRoute("Category", "danh-muc-{id}", "~/DanhMuc.aspx");
        routes.MapPageRoute("ListBlogs", "bai-viet-{id}", "~/ListBlogs.aspx");
        routes.MapPageRoute("BlogDetail", "{title}-{id}", "~/Blog_Detail.aspx");
    }

    void Application_Start(object sender, EventArgs e)
    {
        RegisterRoutes(RouteTable.Routes);
        // Code that runs on application startup
    }

    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown

    }

    void Application_Error(object sender, EventArgs e)
    {
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e)
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e)
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }

</script>
