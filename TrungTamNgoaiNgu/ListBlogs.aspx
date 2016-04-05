<%@ Page Title="List Blogs" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="ListBlogs.aspx.cs" Inherits="ThemeDinhCu_ListBlogs" %>
<%@ Register TagPrefix="cc1" Namespace="SiteUtils" Assembly="CollectionPager" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="ListBlogs">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title" runat="server" id="TieuDe"></h1>
            </div>
        </div>

        <!-- Content-->
        <div id="Content" class="container">
            <ul class="breadcrumb">
                <li><a href="Default.aspx">Trang Chủ</a></li>
                <li><a href="DanhMuc.aspx?id=<%=idGrand %>">Nước Du Học</a></li>
                <li><a href="Loai.aspx?id=<%=idParent %>">Loại</a></li>
                <li class="active"><%=ActivedPage %></li>
            </ul>

            <div class="row">
                <!-- MainContent -->
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 maincontent">
                    <%--<div id="MainContent" runat="server"></div>--%>
                    <asp:DataList ID="dlBaiViet" runat="server">
                        <ItemTemplate>
                            <div class="thumbnail blog">
                                <a href="#" class="pull-left">
                                    <img src='<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>' alt='<%# Eval("ImagesUrl") %>' class="img-responsive img-thumbnail" />
                                </a>
                                <div class="caption">
                                    <h3 class="title"><a href="#"><%# Eval("PostTitle") %></a></h3>
                                    <p class="meta"><%# Eval("MetaDescription") %></p>
                                    <p class="btnXem"><a href="Blog_Detail.aspx" class="btn btn-info">Xem thêm</a></p>
                                </div>
                            </div>
                        </ItemTemplate>
                    </asp:DataList>
                    <!-- Phân trang -->
                    <%--<asp:DataPager ID="DataPager1" runat="server" QueryStringField="page" PageSize="5" PagedControlID="dlBaiViet">
                        <Fields>
                            <asp:NumericPagerField ButtonType="Link" />
                            <asp:NextPreviousPagerField ButtonType="Link" ButtonCssClass="btn btn-link" RenderNonBreakingSpacesBetweenControls="true" FirstPageText="Trang đầu" LastPageText="Trang cuối" 
                                NextPageText="Tiếp theo" PreviousPageText="Quay lại" ShowPreviousPageButton="true" ShowFirstPageButton="true" ShowLastPageButton="true" ShowNextPageButton="true" />
                        </Fields>
                    </asp:DataPager>--%>
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

                </div>

                <!-- Sidebar -->
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="Sidebar">
                    <div id="FeaturedPosts">
                        <h3 class="title">TIN MỚI NHẤT</h3>
                        <div id="TinMoiNhat" runat="server"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
