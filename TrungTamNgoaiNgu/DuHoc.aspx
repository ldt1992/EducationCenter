<%@ Page Title="Du Học" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="DuHoc.aspx.cs" Inherits="DuHoc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="DuHoc">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title">DU HỌC</h1>
            </div>
        </div>

        <!-- MainContent -->
        <div id="MainContent" class="container">
            <!-- Path -->
            <ul class="breadcrumb">
                <li><a href="Default.aspx">Trang Chủ</a></li>
                <li class="active">Du Học</li>
            </ul>

            <div class="row" id="DH" runat="server">
                <%--<div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 country">
                    <a href="#">
                        <p class="text">Mỹ</p>
                        <img src="img/activity_1.jpg" class="img-responsive img-thumbnail" alt="" />
                    </a>
                </div>--%>
            </div>

        </div>

    </div>
</asp:Content>
