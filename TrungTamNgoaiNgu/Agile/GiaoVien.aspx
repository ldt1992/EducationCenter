<%@ Page Title="Thông tin giáo viên" Language="C#" MasterPageFile="Agile.master" AutoEventWireup="true" CodeFile="GiaoVien.aspx.cs" Inherits="Agile_GiaoVien" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="GiaoVien">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title">THÔNG TIN GIÁO VIÊN</h1>
            </div>
        </div>
        <!-- End Title-->

        <!-- MainContent-->
        <div id="MainContent">
            <div class="container">
                <div class="row">
                    <asp:Repeater ID="repGiaoVien" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <img src="img/img-client1.jpg" alt="" />
                            </div>
                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                                <h2 class="title"><%# Eval("FirstName") + " " + Eval("LastName") %></h2>
                                <p class="birthday"><%# Eval("Birthday") %></p>
                                <p class="email"><%# Eval("Email") %></p>
                                <p class="meta"><%# Eval("MoTaGV") %></p>
                            </div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
            </div>
        </div>
        <!-- End MainContent-->
    </div>
</asp:Content>
