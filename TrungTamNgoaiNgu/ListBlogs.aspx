<%@ Page Title="List Blogs" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="ListBlogs.aspx.cs" Inherits="ThemeDinhCu_ListBlogs" %>

<%@ Register TagPrefix="cc1" Namespace="SiteUtils" Assembly="CollectionPager" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="ListBlogs">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title"><%=Title %></h1>
            </div>
        </div>

        <!-- Content-->
        <div id="Content">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">TRANG CHỦ</a></li>
                    <li><a href="DanhMuc.aspx?id=<%=id_parent2 %>"><%=name_parent2.ToUpper() %></a></li>
                    <li><a href="Loai.aspx?id=<%=id_parent1 %>"><%=name_parent1.ToUpper() %></a></li>
                    <li class="active"><%=ActivedPage.ToUpper() %></li>
                </ul>
            </div>

            <div class="container">
                <div class="row">
                    <!-- Main Content -->
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12" id="MainContent">
                        <asp:DataList ID="dlBaiViet" runat="server">
                            <ItemTemplate>
                                <div class="thumbnail blog">
                                    <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="pull-left">
                                        <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" alt="<%# Eval("ImagesUrl") %>" class="img-responsive img-thumbnail" />
                                    </a>
                                    <div class="caption">
                                        <h3 class="title"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>"><%# Eval("PostTitle") %></a></h3>
                                        <p class="meta"><%# Eval("MetaDescription") %></p>
                                        <p class="btnXem"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-info">Xem thêm</a></p>
                                    </div>
                                </div>
                            </ItemTemplate>
                        </asp:DataList>
                        <!-- Phân trang-->
                        <cc1:CollectionPager ID="pager"
                            FirstText="First"
                            BackText="«"
                            LabelText=""
                            LastText="Last"
                            NextText="»"
                            ShowFirstLast="True"
                            SliderSize="5" PagingMode="QueryString"
                            runat="server" BackNextLinkSeparator="" BackNextLocation="Split"
                            PageNumbersDisplay="Numbers" ResultsLocation="None"
                            BackNextDisplay="Buttons" QueryStringKey="page" ControlCssClass="phantrang">
                        </cc1:CollectionPager>
                        <!-- End phân trang -->
                    </div>
                    <!-- End MainContent-->

                    <!-- Sidebar -->
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" id="Sidebar">
                        <div id="TinMoiNhat">
                            <h3 class="title">TIN MỚI NHẤT</h3>
                            <asp:Repeater ID="repTinMoiNhat" runat="server">
                                <ItemTemplate>
                                    <div class="thumbnail post">
                                        <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>">
                                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" alt="<%# Eval("ImagesName") %>" class="img-responsive" />
                                        </a>
                                        <div class="caption">
                                            <h4 class="title media-heading"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>"><%# Eval("PostTitle") %></a></h3>
                                            <p class="btnXem"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-info">Xem Thêm</a></p>
                                        </div>
                                    </div>
                                </ItemTemplate>
                            </asp:Repeater>
                        </div>
                    </div>
                    <!-- End Sidebar-->
                </div>
            </div>

        </div>
        <!-- End Content-->
    </div>
</asp:Content>
