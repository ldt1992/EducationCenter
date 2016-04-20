<%@ Page Title="" Language="C#" MasterPageFile="~/NgoaiNgu/NgoaiNgu.master" AutoEventWireup="true" CodeFile="GiaoVien.aspx.cs" Inherits="NgoaiNgu_GiaoVien" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="GiaoVien">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title">THÔNG TIN GIÁO VIÊN</h1>
            </div>
        </div>
        <!-- End Title-->

        <!-- Content-->
        <div id="Content">
            <!-- Breadcrumb -->
            <div id="Breadcrumb">
                <div class="container">
                    <ul class="breadcrumb">
                        <li><a href="#">TRANG CHỦ</a></li>
                        <li><a href="#">CẤP 2</a></li>
                        <li class="active">BÀI VIẾT</li>
                    </ul>
                </div>
            </div>
            <!-- End Breadcrumb -->
            <div class="container">
                <div class="row">
                    <!-- MainContent -->
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12" id="MainContent">
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
                    <!-- End MainContent -->
                    <!-- Sidebar -->
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" id="Sidebar">
                        <div id="ThongBao">
                            <div class="page-header">
                                <h2 class="title">Thông Báo Mới</h2>
                            </div>
                            <div class="thumbnail news">
                                <a href="#"><img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                            <div class="thumbnail news">
                                <a href="#"><img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                            <div class="thumbnail news">
                                <a href="#"><img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Sidebar -->
                </div>
            </div>
        </div>
        <!-- End Content-->
    </div>
</asp:Content>

