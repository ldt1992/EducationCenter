<%@ Page Title="Kết Quả Tìm Kiếm" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="KetQuaTimKiem.aspx.cs" Inherits="KetQuaTimKiem" %>

<%@ Register TagPrefix="cc1" Namespace="SiteUtils" Assembly="CollectionPager" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="KetQuaTimKiem">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title">KẾT QUẢ TÌM KIẾM</h1>
            </div>
        </div>

        <!-- Content-->
        <div id="Content" class="container">
            <asp:Repeater ID="repKetQuaTimKiem" runat="server">
                <ItemTemplate>
                    <div class="thumbnail post">
                        <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="pull-left">
                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="img-responsive img-thumbnail" alt="" />
                        </a>
                        <div class="caption">
                            <h3 class="title"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" title=""><%# Eval("PostTitle") %></a></h3>
                            <p class="meta"><%# Eval("MetaDescription") %></p>
                            <p class="btnXem"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-info">Xem tiếp</a></p>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </ItemTemplate>
            </asp:Repeater>

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
                BackNextDisplay="Buttons" QueryStringKey="page" ControlCssClass="">
            </cc1:CollectionPager>
        </div>
    </div>
</asp:Content>
