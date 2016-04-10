<%@ Page Title="Loại Hình" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="Loai.aspx.cs" Inherits="Loai" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="Type">

        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title"><%=nameParent %> <%=nameCurrent.ToUpper() %></h1>
            </div>
        </div>

        <!-- Content-->
        <div id="Content">
            <div class="container">
                <!-- Path -->
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">TRANG CHỦ</a></li>
                    <li><a href="DanhMuc.aspx?id=<%=idParent %>"><%=nameParent.ToUpper() %></a></li>
                    <li class="active"><%=nameCurrent.ToUpper() %></li>
                </ul>

                <!-- MainContent-->
                <div id="MainContent">
                    <div class="row">
                        <asp:Repeater ID="repListLoai" runat="server">
                            <ItemTemplate>
                                <%--<div class="thumbnail post">
                                        <a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>" class="pull-left">
                                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="img-responsive" alt="" />
                                        </a>
                                        <div class="caption">
                                            <h3 class="title"><a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>"><%# Eval("CategoryName") %></a></h3>
                                            <p class="meta"><%# Eval("Descriptions") %></p>
                                            <p><a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>" class="btn btn-info">Xem thêm</a></p>
                                        </div>
                                    </div>--%>

                                <%--<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                                        <div class="post">
                                            <a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>">
                                                <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl")  %>" class="img-responsive" alt="" />
                                                <div class="overlay">
                                                    <h3 class="title"><%# Eval("CategoryName") %></h3>
                                                    <p class="meta"><%# Eval("Descriptions") %></p>
                                                </div>
                                            </a>
                                        </div>
                                    </div>--%>

                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 post">
                                    <div class="thumbnail">
                                        <a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>">
                                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" alt="" class="img-responsive" />
                                        </a>
                                        <div class="caption">
                                            <h3 class="title"><a href="ListBlogs.aspx?id=<%# Eval("CategoryID") %>"><%# Eval("CategoryName") %></a></h3>
                                            <p class="meta"><%# Eval("Descriptions") %></p>
                                        </div>
                                    </div>
                                </div>
                            </ItemTemplate>
                        </asp:Repeater>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
