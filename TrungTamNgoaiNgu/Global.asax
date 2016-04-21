<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>

<script runat="server">

    void RegisterRoutes(RouteCollection routes)
    {
        //Du Học
        routes.MapPageRoute("Home", "trang-chu", "~/Default.aspx");
        routes.MapPageRoute("About", "gioi-thieu", "~/GioiThieu.aspx");
        routes.MapPageRoute("Contact", "lien-he", "~/LienHe.aspx");
        routes.MapPageRoute("Category", "danh-muc-{id}", "~/DanhMuc.aspx");
        routes.MapPageRoute("ListBlogs", "danh-sach-truong-{id}", "~/ListBlogs.aspx");
        routes.MapPageRoute("BlogDetail", "{title}-{id}", "~/Blog_Detail.aspx");

        //Ngoại ngữ
        routes.MapPageRoute("HomeNgoaiNgu", "NgoaiNgu/trang-chu", "~/NgoaiNgu/HomePage.aspx");
        routes.MapPageRoute("AboutNgoaiNgu", "NgoaiNgu/gioi-thieu", "~/NgoaiNgu/GioiThieu.aspx");
        routes.MapPageRoute("ContactNgoaiNgu", "NgoaiNgu/lien-he", "~/NgoaiNgu/LienHe.aspx");
        routes.MapPageRoute("KhaiGiangNgoaiNgu", "NgoaiNgu/lich-khai-giang", "~/NgoaiNgu/LichKhaiGiang.aspx");
        routes.MapPageRoute("ChuongTrinhHocNgoaiNgu", "NgoaiNgu/chuong-trinh-hoc", "~/NgoaiNgu/ChuongTrinhHoc.aspx");
        routes.MapPageRoute("TuyenDungNgoaiNgu", "NgoaiNgu/tuyen-dung", "~/NgoaiNgu/TuyenDung.aspx");
        routes.MapPageRoute("GiaoVienNgoaiNgu", "NgoaiNgu/nhom-giao-vien", "~/NgoaiNgu/ListTeachers.aspx");
        routes.MapPageRoute("ChiTietGiaoVienNgoaiNgu", "NgoaiNgu/giao-vien-{id}", "~/NgoaiNgu/GiaoVien.aspx");
        routes.MapPageRoute("FAQsNgoaiNgu", "NgoaiNgu/hoidap", "~/NgoaiNgu/FAQs.aspx");
        routes.MapPageRoute("Video","NgoaiNgu/video","~/NgoaiNgu/VideoLopHoc.aspx");
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
