<%@ Page Title="Kết Quả Tìm Kiếm" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="KetQuaTimKiem.aspx.cs" Inherits="KetQuaTimKiem" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
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
                            <img src="#" class="img-responsive img-thumbnail" alt="" />
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
        </div>
    </div>
</asp:Content>