<%@ Page Title="Video Lớp Học" Language="C#" MasterPageFile="~/NgoaiNgu/NgoaiNgu.master" AutoEventWireup="true" CodeFile="VideoLopHoc.aspx.cs" Inherits="NgoaiNgu_VideoLopHoc" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="VideoLopHoc">
        <!-- Title -->
        <div id="Title">
            <div class="container">
                <h1 class="title">VIDEO LỚP HỌC</h1>
            </div>
        </div>
        <!-- End Title -->

        <!-- MainContent -->
        <div id="MainContent">
            <div class="container">
                <!-- Breadcrumb -->
                <div id="Breadcrumb">
                    <div class="container">
                        <ul class="breadcrumb">
                            <li><a href="/NgoaiNgu/trang-chu">TRANG CHỦ</a></li>
                            <li class="active">VIDEO LỚP HỌC</li>
                        </ul>
                    </div>
                </div>
                <!-- End Breadcrumb -->

                <div id="BtnFilter">
                    <button type="button" class="btn btn-default" data-filter="*">All</button>
                    <button type="button" class="btn btn-default" data-filter=".congso">Anh văn công sở</button>
                    <button type="button" class="btn btn-default" data-filter=".treem">Anh văn trẻ em</button>
                    <button type="button" class="btn btn-default" data-filter=".nguoilon">Anh văn người lớn</button>
                </div>

                <div class="row isotope">
                    <div class="col-lg-3 element-item congso">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item treem">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item nguoilon">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item congso">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item treem">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item treem">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item congso">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item nguoilon">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item treem">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-3 element-item nguoilon">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ScWTTgLMCrw" frameborder="0" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End MainContent -->
    </div>
</asp:Content>
