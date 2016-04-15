﻿<%@ Page Title="LỊch Khai Giảng" Language="C#" MasterPageFile="~/Agile/Agile.master" AutoEventWireup="true" CodeFile="LichKhaiGiang.aspx.cs" Inherits="Agile_LichKhaiGiang" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="LichKhaiGiang">
        <!-- Title -->
        <div id="Title">
            <div class="container">
                <h1 class="title">LỊCH KHAI GIẢNG</h1>
            </div>
        </div>
        <!-- End Title -->

        <!-- Content -->
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
                        <table class="table table-hover">
                            <tr>
                                <th>LỚp học</th>
                                <th>Ngày khai giảng</th>
                                <th>Mô tả</th>
                            </tr>
                            <tr>
                                <td>Giao tiếp cơ bản</td>
                                <td>12/12/2016</td>
                                <td>lớp dành cho người mới bắt đầu</td>
                            </tr>
                        </table>
                    </div>
                    <!-- End MainContent -->
                    <!-- Sidebar -->
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" id="Sidebar">
                        <div id="ThongBao">
                                <h2 class="title">Thông Báo Mới</h2>
                            <div class="thumbnail news">
                                <a href="#">
                                    <img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                            <div class="thumbnail news">
                                <a href="#">
                                    <img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                            <div class="thumbnail news">
                                <a href="#">
                                    <img src="img/img-client3.jpg" alt="" class="img-responsive" /></a>
                                <div class="caption">
                                    <h3 class="title"><a href="#">Thông báo 1</a></h3>
                                </div>
                            </div>
                        </div>
                        <!-- Hỏi đáp nhanh Faqs -->
                        <div id="FAQs">
                            <h2 class="title">HỎI ĐÁP NHANH</h2>
                            <a href="FAQs.aspx">
                                <img src="img/faqs.jpg" alt="" class="img-responsive" /></a>
                        </div>
                    </div>
                    <!-- Sidebar -->
                </div>
            </div>
        </div>
        <!-- End Content -->
    </div>
</asp:Content>
