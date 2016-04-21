<%@ Page Title="" Language="C#" MasterPageFile="~/NgoaiNgu/NgoaiNgu.master" AutoEventWireup="true" CodeFile="ListTeachers.aspx.cs" Inherits="NgoaiNgu_ListTeachers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="ListTeachers">
        <!-- Title -->
        <div id="Title">
            <div class="container">
                <h1 class="title">GIÁO VIÊN NGOẠI NGỮ</h1>
            </div>
        </div>
        <!-- End Title -->

        <!-- Main Content -->
        <div id="MainContent">
            <div class="container">
                <!-- Breadcrumb -->
                <div id="Breadcrumb">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/NgoaiNgu/trang-chu">TRANG CHỦ</a></li>
                            <li class="active">ĐỘI NGŨ GIÁO VIÊN</li>
                        </ul>
                    </div>
                </div>
                <!-- End Breadcrumb -->

                <h1 class="title">ĐỘI NGŨ GIÁO VIÊN</h1>
                <p class="meta">Đăng bởi: ABC vào ngày 12/04/2016</p>

                <div class="row">
                    <!-- Danh Sách giáo viên -->
                    <asp:Repeater ID="rpDSGiaoVien" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div class="thumbnail teacher">
                                    <a href="#">
                                        <img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                    <div class="caption">
                                        <h3 class="teacher-title"><a href="/NgoaiNgu/giao-vien-<%# Eval("GVID") %>"><%# Eval("LastName") + " " + Eval("FirstName") %></a></h3>
                                    </div>
                                </div>
                            </div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
            </div>
        </div>
        <!-- End Main Content -->
    </div>
</asp:Content>
