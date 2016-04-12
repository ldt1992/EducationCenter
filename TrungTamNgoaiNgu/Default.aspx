<%@ Page Title="Home Page" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="ThemeDinhCu_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="TrangChu">
        <!-- SLIDER -->
        <div id="Slider">
            <!-- Start WOWSlider.com BODY section -->
            <div id="wowslider-container1">
                <div class="ws_images">
                    <ul>
                        <li>
                            <img src="img/wowslider/images/bgslide1.jpg" alt="bg-slide1" title="bg-slide1" id="wows1_0" />qwertyuio</li>
                        <li>
                            <img src="img/wowslider/images/bgslide2.jpg" alt="bg-slide2" title="bg-slide2" id="wows1_1" />aaaaaaasdfghj";lkjhgfd</li>
                        <li>
                            <img src="img/wowslider/images/bgslide3.jpg" alt="wowslideshow" title="bg-slide3" id="wows1_2" />zxcvbnm,.</li>
                        <li>
                            <img src="img/wowslider/images/bgslide4.jpg" alt="bg-slide4" title="bg-slide4" id="wows1_3" />thmujk,dfvb </li>
                    </ul>
                </div>
                <div class="ws_bullets">
                    <div>
                        <%--<a href="#" title="bg-slide1"><span>
                            <img src="img/wowslider/tooltips/bgslide1.jpg" alt="bg-slide1" />1</span></a>
                        <a href="#" title="bg-slide2"><span>
                            <img src="img/wowslider/tooltips/bgslide2.jpg" alt="bg-slide2" />2</span></a>
                        <a href="#" title="bg-slide3"><span>
                            <img src="img/wowslider/tooltips/bgslide3.jpg" alt="bg-slide3" />3</span></a>
                        <a href="#" title="bg-slide4"><span>
                            <img src="img/wowslider/tooltips/bgslide4.jpg" alt="bg-slide4" />4</span></a>--%>

                        <a href="#" title="bg-slide1"><span>1</span></a>
                        <a href="#" title="bg-slide2"><span>2</span></a>
                        <a href="#" title="bg-slide3"><span>3</span></a>
                        <a href="#" title="bg-slide4"><span>4</span></a>
                    </div>
                </div>
            </div>
            <!-- End WOWSlider.com BODY section -->
        </div>
        <!-- DANH MỤC -->
        <div id="DanhMuc">
            <div class="container">
                <div class="row">
                    <asp:Repeater ID="dlDanhMuc" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-4 col-md-6 col-sm-4 col-xs-12 act wow fadeIn">
                                <h2 class="title text-center"><a href="<%# Eval("Permalink") + "?id=" + Eval("CategoryID") %>"><%# Eval("CategoryName") %></a></h2>
                                <div>
                                    <a href="<%# Eval("Permalink") + "?id=" + Eval("CategoryID") %>">
                                        <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" /></a>
                                </div>
                            </div>
                        </ItemTemplate>
                    </asp:Repeater>
                </div>
            </div>
        </div>
        <!-- TIN TỨC MỚI NHẤT -->
        <div id="News">
            <div class="container text-center">
                <h1 class="title">TIN TỨC MỚI NHẤT</h1>
                <hr />
                <asp:Repeater ID="repTinMoiNhat" runat="server">
                    <ItemTemplate>
                        <div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                            <div class="thumbnail news">
                                <div class="overlay">
                                    <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="img-responsive" />
                                    <div class="mask text-center">
                                        <h4 class="title"><%# Eval("PostTitle") %></h4>
                                        <a href="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                        <a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>" class="btn btn-default">DETAILS</a>
                                    </div>
                                </div>
                                <a href="#" class="tag btn btn-warning">School</a>
                                <div class="caption">
                                    <h4 class="title"><a href="Blog_Detail.aspx?id=<%# Eval("PostID") %>"><%# Eval("PostTitle") %></a></h4>
                                    <hr />
                                    <p class="meta"><%# Eval("PostContentVN") %></p>
                                </div>
                            </div>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>
            </div>
        </div>
        <!-- CẢM NHẬN TỪ KHÁCH HÀNG -->
        <div id="Numbers">
            <div class="container text-center">
                <h1 class="title">CẢM NHẬN TỪ KHÁCH HÀNG</h1>
                <hr />
                <div id="Owl-carousel-number" class="carousel slide" data-ride="carousel">
                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <p>
                                <img src="img/footer_image1.jpg" class="img-circle img-thumbnail" alt="" />
                            </p>
                            <h3 class="author">Lê Hoàng Kim Ngân</h3>
                            <p class="position">Du Học úc</p>
                            <p class="content">Sau khi đến công ty, tôi cảm thấy rất hài lòng về dịch vụ và chất lượng làm việc của công ty</p>
                        </div>
                        <div class="item">
                            <p>
                                <img src="img/footer_image1.jpg" class="img-circle img-thumbnail" alt="" />
                            </p>
                            <h3 class="author">Lê Hoàng Kim Ngân</h3>
                            <p class="position">Du Học úc</p>
                            <p class="content">Sau khi đến công ty, tôi cảm thấy rất hài lòng về dịch vụ và chất lượng làm việc của công ty</p>
                        </div>
                        <div class="item">
                            <p>
                                <img src="img/footer_image1.jpg" class="img-circle img-thumbnail" alt="" />
                            </p>
                            <h3 class="author">Lê Hoàng Kim Ngân</h3>
                            <p class="position">Du Học úc</p>
                            <p class="content">Sau khi đến công ty, tôi cảm thấy rất hài lòng về dịch vụ và chất lượng làm việc của công ty</p>
                        </div>
                    </div>
                    <!-- Controls -->
                    <a class="left carousel-control" href="#Owl-carousel-number" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="right carousel-control" href="#Owl-carousel-number" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <a href="CamNhan.aspx" class="btn btn-info btn-lg">Xem thêm</a>
            </div>
        </div>
        <!-- HÌNH ẢNH HOẠT ĐỘNG CỦA CÔNG TY -->
        <div id="HoatDong" class="text-center">
            <h1 class="title text-center">HÌNH ẢNH HOẠT ĐỘNG</h1>
            <hr />
            <h3 class="text-center">Các hoạt động của công ty</h3>
            <div class="row" id="HinhAnh">
                <asp:Repeater ID="repHoatDong" runat="server">
                    <ItemTemplate>
                        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus wow fadeIn">
                            <img src="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" class="img-responsive" alt="<%# Eval("ImagesName") %>" />
                            <div class="caption">
                                <h3 class="title">Soccer</h3>
                                <a href="<%# "http://192.168.10.3:8686/" + Eval("ImagesUrl") %>" rel="prettyPhoto[gallery1]" class="btn btn-default">EXPAND</a>
                            </div>
                        </div>
                    </ItemTemplate>
                </asp:Repeater>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <a href="Album.aspx" class="btn btn-info btn-lg">Xem Album</a>
                </div>
            </div>
        </div>
        <!-- BLOGS -->
        <div id="Blogs">
            <div class="container">
                <h1 class="title text-center">OUR BLOG</h1>
                <hr />
                <p class="meta text-center">Stet clita kasd gubergren, no sea takimata sanctus est lorem ipsum dolor sit amet.</p>
                <div class="row">
                    <div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                        <div class="thumbnail blog">
                            <div class="overlay text-center">
                                <img src="img/news-1.jpg" alt="" class="img-responsive" />
                                <div class="mask">
                                    <h3 class="title">Gallery Post</h3>
                                    <a href="img/news-1.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                                <a href="#" class="tag btn btn-success">Nature</a>
                            </div>
                            <div class="caption">
                                <h2 class="title">Gallery Post</h2>
                                <hr />
                                <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                        <div class="thumbnail blog">
                            <div class="overlay text-center">
                                <img src="img/news-2.jpg" alt="" class="img-responsive" />
                                <div class="mask">
                                    <h3 class="title">Gallery Post</h3>
                                    <a href="img/news-2.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                                <a href="#" class="tag btn btn-danger">Nature</a>
                            </div>
                            <div class="caption">
                                <h2 class="title">Gallery Post</h2>
                                <hr />
                                <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                        <div class="thumbnail blog last-item">
                            <div class="overlay text-center">
                                <img src="img/news-3.jpg" alt="" class="img-responsive" />
                                <div class="mask">
                                    <h3 class="title">Gallery Post</h3>
                                    <a href="img/news-3.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                                <a href="#" class="tag btn btn-info">Nature</a>
                            </div>
                            <div class="caption">
                                <h2 class="title">Gallery Post</h2>
                                <hr />
                                <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- PHIẾU ĐĂNG KÝ TƯ VẤN -->
        <div id="PhieuTuVan">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" id="LoiGoi">
                        <p>Hãy gọi cho chúng tôi</p>
                        <p class="text-danger">(08) 62 88 35 66</p>
                        <p>Hay để chúng tôi</p>
                        <p class="text-info">gọi lại cho bạn</p>
                        <%--<div id="timer"></div>--%>
                    </div>
                    <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12" id="Phieu">
                        <div class="row">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input  type="text" id="fullname" placeholder="Full name: " class="form-control" />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input  type="text" id="Email" placeholder="Email: " class="form-control" />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input  type="text" id="Phone" placeholder="Phone: " class="form-control" />
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                <input  type="text" id="Code" placeholder="Promotion Code: " class="form-control" />
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <textarea id="Message" placeholder="Message: " rows="10" class="form-control"></textarea>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <input type="submit" value="GỬI" class="btn btn-danger btn-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- SỨ MỆNH -->
        <div id="Mission">
            <div class="container text-center">
                <div class="overlay">
                    <h1 class="title wow fadeIn">SỨ MỆNH</h1>
                    <p class="meta wow fadeIn">To provide high quality, student-centered education and lifelong learning opportunities for the communities we serve.</p>
                    <p class="meta wow fadeIn">At Invent, students pursue their goals in an environment that values diversity, individuality, mutual respect and free exchange of ideas.</p>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
