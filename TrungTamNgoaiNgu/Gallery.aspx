<%@ Page Title="Gallery" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="Gallery.aspx.cs" Inherits="ThemeDinhCu_Gallery" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="Gallery">
        <div id="Path">
            <div class="container">
                <h1 class="title">Library Posts</h1>
            </div>
        </div>

        <div id="Content">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">Trang Chủ</a></li>
                    <li><a href="#">Chuyên Mục</a></li>
                    <li class="active">Library Posts</li>
                </ul>

                <%-- Filters --%>
                <div id="FilterGroup">
                    <button type="button" class="btn btn-default is-checked" data-filter="*">Show All</button>
                    <button type="button" class="btn btn-default" data-filter=".music">Music</button>
                    <button type="button" class="btn btn-default" data-filter=".sport">Sport</button>
                    <button type="button" class="btn btn-default" data-filter=".lesson">Lesson</button>
                </div>

                <%-- Isotope --%>
                <div class="row isotope">
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item music">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item sport">
                        <div class="post">
                            <img src="img/featured-post-2.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-2.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item lesson">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-3.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item sport">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item lesson">
                        <div class="post">
                            <img src="img/featured-post-2.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-2.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item music">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-3.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item sport">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item lesson">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-3.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
