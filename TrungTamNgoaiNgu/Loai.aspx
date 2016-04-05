<%@ Page Title="Loại Hình" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="Loai.aspx.cs" Inherits="Loai" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="Type">

        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title" runat="server" id="TieuDe"></h1>
            </div>
        </div>

        <!-- Content-->
        <div class="container" id="Content">
            <!-- Path -->
            <ul class="breadcrumb">
                <li><a href="Default.aspx">Trang Chủ</a></li>
                <li><a href="DanhMuc.aspx?id=<%=idParent %>">Nước <%=NameParent %></a></li>
                <li class="active">Loại</li>
            </ul>

            <!-- MainContent-->
            <div id="MainContent" class="maincontent" runat="server"></div>
        </div>
    </div>
</asp:Content>
