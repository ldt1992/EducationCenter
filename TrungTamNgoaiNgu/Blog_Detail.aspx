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
                    <!-- MainContent -->
                    <asp:Repeater ID="repChiTiet" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" id="MainContent">
                                <h2 class="title"><%# Eval("PostTitle") %></h2>
                                <h3 class="view">Lượt xem: <%# Eval("ViewCount") %></h3>
                                <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" alt="<%# Eval("ImagesName") %>" class="img-responsive img-thumbnail" />
                                <div class="meta"><%# Eval("PostContentVN") %></div>
                            </div>
                        </ItemTemplate>
                    </asp:Repeater>

                    <!-- Sidebar -->
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="Sidebar">
                        <!-- BÀI VIẾT LIÊN QUAN -->
                        <div id="FeaturedPosts">
                            <h2 class="title">BÀI VIẾT CÙNG CHỦ ĐỀ</h2>
                            <asp:Repeater ID="repPostLienQuan" runat="server">
                                <ItemTemplate>
                                    <div class="media post">
                                        <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>">
                                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="img-responsive pull-left img-thumbnail" alt="<%# Eval("ImagesName") %>" /></a>
                                        <div class="media-body">
                                            <h3 class="title media-heading">
                                                <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>"><%# Eval("PostTitle") %></a>
                                            </h3>
                                            <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-default">Xem tiếp</a>
                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </div>
                        <!-- BÀI VIẾT XEM NHIỀU-->
                        <div id="XemNhieu">
                            <h2>BÀI VIẾT XEM NHIỀU</h2>
                            <asp:Repeater ID="repXemNhieu" runat="server">
                                <ItemTemplate>
                                    <div class="media post">
                                        <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>">
                                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" alt="<%# Eval("ImagesName") %>" class="img-responsive img-thumbnail" />
                                        </a>
                                        <div class="media-body">
                                            <h3 class="title media-heading">
                                                <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>"><%# Eval("PostTitle") %></a>
                                            </h3>
                                            <p class="view">Views: <%# Eval("ViewCount") %></p>
                                            <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-info">Xem tiếp</a>
                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
