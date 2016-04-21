<%@ Page Title="Album" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="Album.aspx.cs" Inherits="Album" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div id="Album">
        <!-- Title-->
        <div id="Title">
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
                <div id="BtnFilter">
                    <button type="button" class="btn btn-default" data-filter="*">Show All</button>
                    <button type="button" class="btn btn-default" data-filter=".duhoc">Du Học</button>
                    <button type="button" class="btn btn-default" data-filter=".dulich">Du Lich</button>
                    <button type="button" class="btn btn-default" data-filter=".dinhcu">Định Cư</button>
                </div>

                <!-- Isotope Filter-->
                <div class="row isotope">
                    <div class="col-lg-3 element-item duhoc">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dinhcu">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dinhcu">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dulich">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item duhoc">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                    <div class="col-lg-3 element-item dinhcu">
                        <a href="#" rel="prettyPhoto[gallery4]">
                            <img src="img/hinh-1.jpg" alt="" class="img-responsive img-thumbnail" />
                        </a>
                    </div>
                </div>

                <nav>
                <ul class="pagination">
                    <li><a href="#" aria-label="Previous">&laquo;</a></li>
                    <li class="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#" aria-label="Next">&raquo;</a></li>
                </ul>
            </nav>

            </div>
        </div>
    </div>
</asp:Content>