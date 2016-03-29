<%@ Page Title="Album" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="Album.aspx.cs" Inherits="Album" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="Album">
        <div id="Path">
            <div class="container">
                <h1 class="title">Album</h1>
            </div>
        </div>

        <div id="Content">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">Trang Chủ</a></li>
                    <li><a href="#">Chuyên Mục</a></li>
                    <li class="active">Album</li>
                </ul>

                <%-- Filters --%>
                <div id="FilterGroup">
                    <button type="button" class="btn btn-default is-checked" data-filter="*">Show All</button>
                    <button type="button" class="btn btn-default" data-filter=".duhoc">Du Học</button>
                    <button type="button" class="btn btn-default" data-filter=".dulich">Du Lich</button>
                    <button type="button" class="btn btn-default" data-filter=".dinhcu">Định Cư</button>
                </div>

                <%-- Isotope --%>
                <div class="row isotope">
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item duhoc">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dulich">
                        <div class="post">
                            <img src="img/featured-post-2.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-2.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dinhcu">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-3.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dulich">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dinhcu">
                        <div class="post">
                            <img src="img/featured-post-2.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-2.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item duhoc">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-3.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dulich">
                        <div class="post">
                            <img src="img/featured-post-1.jpg" class="img-responsive img-thumbnail" alt="" />
                            <div class="caption">
                                <h3 class="title">The King Lion</h3>
                                <a href="img/featured-post-1.jpg" class="btn btn-default" rel="prettyPhoto">EXPAND</a>
                                <a href="#" class="btn btn-default">DETAILS</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 element-item dinhcu">
                        <div class="post">
                            <img src="img/featured-post-3.jpg" class="img-responsive img-thumbnail" alt="" />
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