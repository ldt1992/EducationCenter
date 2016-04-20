<%@ Page Title="" Language="C#" MasterPageFile="~/NgoaiNgu/NgoaiNgu.master" AutoEventWireup="true" CodeFile="ListTeachers.aspx.cs" Inherits="NgoaiNgu_ListTeachers" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="ListGiaoVien">
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
                <div class="row">
                    <!-- Danh Sách giáo viên -->
                    <asp:Repeater ID="rpDSGiaoVien" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div class="thumbnail teacher">
                                    <a href="#">
                                        <img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                    <div class="caption">
                                        <h3 class="title"><a href="#">Teacher 1</a></h3>
                                        <p class="meta">MÔ tả về giáo viên</p>
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
