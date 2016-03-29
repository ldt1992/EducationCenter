<%@ Page Title="Blog Detail" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="Blog_Detail.aspx.cs" Inherits="ThemeDinhCu_Blog_Detail" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="Blog_Detail">
        <div id="Path">
            <div class="container">
                <h1 class="title">Blog Detail</h1>
            </div>
        </div>

        <div id="Content">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">Trang Chủ</a></li>
                    <li><a href="#">Chuyên Mục</a></li>
                    <li><a href="ListBlogs.aspx">Blogs</a></li>
                    <li class="active">Blog Detail</li>
                </ul>

                <div class="row">
                    <%-- MainContent --%>
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" id="MainContent">
                        <h2 class="title">Netflix đến Việt Nam, giá từ 180.000 đồng/tháng</h2>
                        <img src="img/news-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        <p class="meta">Tại Việt Nam, sau khi đăng ký thuê bao Netflix, người dùng có thể xem thông qua ứng dụng trên máy tính (Windows, Mac), ứng dụng trên di động (Android/iOS), hoặc thông qua Apple TV, Google TV, Google Chromecast. Các máy chơi game thế hệ mới như Play Station 3/4, Wii, Xbox 360, Xbox One cũng đều có ứng dụng giúp người dùng xem được Netflix.</p>
                        <p class="meta">Tại Việt Nam, sau khi đăng ký thuê bao Netflix, người dùng có thể xem thông qua ứng dụng trên máy tính (Windows, Mac), ứng dụng trên di động (Android/iOS), hoặc thông qua Apple TV, Google TV, Google Chromecast. Các máy chơi game thế hệ mới như Play Station 3/4, Wii, Xbox 360, Xbox One cũng đều có ứng dụng giúp người dùng xem được Netflix.</p>
                        <img src="img/news-2.jpg" alt="" class="img-responsive img-thumbnail" />
                    </div>
                    <%-- Sidebar --%>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="Sidebar">
                        <%-- Category --%>
                        <div id="Category">
                            <h2 class="title">Categories</h2>
                            <ul class="list-group">
                                <li class="list-group-item"><a href="Testimonials.aspx">Testimonials</a></li>
                                <li class="list-group-item"><a href="Gallery.aspx">Gallery</a></li>
                                <li class="list-group-item"><a href="FAQs.aspx">FAQs</a></li>
                                <li class="list-group-item"><a href="ListBlogs.aspx">Blogs</a></li>
                            </ul>
                        </div>
                        <%-- Featured Posts --%>
                        <div id="FeaturedPosts">
                            <h2 class="title">Featured Posts</h2>
                            <div class="media post">
                                <a href="#">
                                    <img src="img/featured-post-1.jpg" class="img-responsive pull-left img-thumbnail" alt="" /></a>
                                <div class="media-body">
                                    <a href="Blog_Detail.aspx"><h3 class="title media-heading">Nhiều người Việt tại Australia bị lừa vé máy bay Tết</h3></a>
                                    <a href="Blog_Detail.aspx" class="btn btn-default">Read More</a>
                                </div>
                            </div>
                            <div class="media post">
                                <a href="#">
                                    <img src="img/featured-post-1.jpg" class="img-responsive pull-left img-thumbnail" alt="" /></a>
                                <div class="media-body">
                                    <a href="Blog_Detail.aspx"><h3 class="title media-heading">Nhiều người Việt tại Australia bị lừa vé máy bay Tết</h3></a>
                                    <a href="Blog_Detail.aspx" class="btn btn-default">Read More</a>
                                </div>
                            </div>
                            <div class="media post">
                                <a href="#">
                                    <img src="img/featured-post-1.jpg" class="img-responsive pull-left img-thumbnail" alt="" /></a>
                                <div class="media-body">
                                    <a href="Blog_Detail.aspx"><h3 class="title media-heading">Nhiều người Việt tại Australia bị lừa vé máy bay Tết</h3></a>
                                    <a href="Blog_Detail.aspx" class="btn btn-default">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
