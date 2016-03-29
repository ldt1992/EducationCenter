<%@ Page Title="Home Page" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="ThemeDinhCu_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="TrangChu">
        <%-- Slider --%>
        <div id="Slider">
            <!-- Start WOWSlider.com BODY section -->
            <div id="wowslider-container1">
                <div class="ws_images">
                    <ul>
                        <li>
                            <img src="img/wowslider/images/bgslide1.jpg" alt="bg-slide1" title="bg-slide1" id="wows1_0" />qwertyuio</li>
                        <li>
                            <img src="img/wowslider/images/bgslide2.jpg" alt="bg-slide2" title="bg-slide2" id="wows1_1" />aaaaaaasdfghj';lkjhgfd</li>
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
        <%-- Welcome --%>
        <%--<div id="Welcome">
            <div class="container">
                <h1 class="title">WELCOME TO INVENT</h1>
                <!-- Tab Slider -->
                <div id="myWelcome" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ul class="nav nav-pills">
                        <li data-target="#myWelcome" data-slide-to="0" class="active"><a href="#">01 About</a></li>
                        <li data-target="#myWelcome" data-slide-to="1"><a href="#">02 Academics</a></li>
                        <li data-target="#myWelcome" data-slide-to="2"><a href="#">03 Admissions & Aid</a></li>
                        <li data-target="#myWelcome" data-slide-to="3"><a href="#">04 After Invent</a></li>
                    </ul>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pic">
                                    <img src="img/welcome-1.jpg" class="img-responsive wow fadeIn" />
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 carousel-caption content wow fadeIn">
                                    <h2 class="title">Great Career Outcomes</h2>
                                    <p class="meta">Vut sagittis a, magna ridiculus! Scelerisque parturient! Cum duis nunc in, dignissim, porta porta enim, proin turpis egestas! Mauris dapibus sed integer placerat, scelerisque! Ac enim nascetur rhoncus facilisis phasellus eu sit turpis purus magna auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                    <a href="#" class="btn btn-info btn-lg">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12 pic">
                                    <img src="img/welcome-2.jpg" class="img-responsive" />
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12 carousel-caption content">
                                    <h2 class="title">Great Career Outcomes</h2>
                                    <p class="meta">Vut sagittis a, magna ridiculus! Scelerisque parturient! Cum duis nunc in, dignissim, porta porta enim, proin turpis egestas! Mauris dapibus sed integer placerat, scelerisque! Ac enim nascetur rhoncus facilisis phasellus eu sit turpis purus magna auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                    <a href="#" class="btn btn-info btn-lg">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12 pic">
                                    <img src="img/welcome-3.jpg" class="img-responsive" />
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12 carousel-caption content">
                                    <h2 class="title">Great Career Outcomes</h2>
                                    <p class="meta">Vut sagittis a, magna ridiculus! Scelerisque parturient! Cum duis nunc in, dignissim, porta porta enim, proin turpis egestas! Mauris dapibus sed integer placerat, scelerisque! Ac enim nascetur rhoncus facilisis phasellus eu sit turpis purus magna auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                    <a href="#" class="btn btn-info btn-lg">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12 pic">
                                    <img src="img/welcome-4.jpg" class="img-responsive" />
                                </div>
                                <div class="col-md-6 col-sm-6 col-xs-12 carousel-caption content">
                                    <h2 class="title">Great Career Outcomes</h2>
                                    <p class="meta">Vut sagittis a, magna ridiculus! Scelerisque parturient! Cum duis nunc in, dignissim, porta porta enim, proin turpis egestas! Mauris dapibus sed integer placerat, scelerisque! Ac enim nascetur rhoncus facilisis phasellus eu sit turpis purus magna auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                    <a href="#" class="btn btn-info btn-lg">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
        <%-- Activities --%>
        <div id="Activities" class="row activities" runat="server">
            <%--<div class="col-lg-4 col-md-6 col-sm-4 col-xs-12 act wow fadeIn">
                <div>
                    <a href="#">
                        <img src="img/activity_1.jpg" /></a>
                </div>
                <div class="caption">
                    <h2 class="title">Take A Virtual Tour</h2>
                    <p class="meta">Fully residential and strikingly beautiful, Invent’s 160-acre campus boasts 80 buildings, hiking trails, woods and multiple scenic lakes.</p>
                    <a href="#" class="btn btn-link">Play Video</a>
                </div>
            </div>--%>
        </div>
        <%-- News --%>
        <div id="News">
            <div class="container text-center">
                <h1 class="title">TIN TỨC MỚI NHẤT</h1>
                <hr />
                <div class="row" id="MoiNhat" runat="server">
                    <%--<div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                        <div class="thumbnail news">
                            <div class="overlay">
                                <img src="img/news-1.jpg" class="img-responsive" />
                                <div class="mask text-center">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                    <a href="img/news-1.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                            </div>
                            <a href="#" class="tag btn btn-warning">School</a>
                            <div class="caption">
                                <a href="#">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                </a>
                                <hr />
                                <p class="meta">Quo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquidQuo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquid</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-6 col-xs-12 wow fadeIn">
                        <div class="thumbnail news">
                            <div class="overlay">
                                <img src="img/news-2.jpg" class="img-responsive" />
                                <div class="mask text-center">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                    <a href="img/news-2.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                            </div>
                            <a href="#" class="tag btn btn-success">Facilities</a>
                            <div class="caption">

                                <a href="#">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                </a>
                                <hr />
                                <p class="meta">Quo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquidQuo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquid</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12 col-xs-12 wow fadeIn">
                        <div class="thumbnail news last-item">
                            <div class="overlay">
                                <img src="img/news-3.jpg" class="img-responsive" />
                                <div class="mask text-center">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                    <a href="img/news-3.jpg" class="btn btn-default" rel="prettyPhoto[gallery1]">EXPAND</a>
                                    <a href="#" class="btn btn-default">DETAILS</a>
                                </div>
                            </div>
                            <a href="#" class="tag btn btn-info">Facilities</a>
                            <div class="caption">

                                <a href="#">
                                    <h4 class="title">Sport meet sees enthusiastic participation from all</h4>
                                </a>
                                <hr />
                                <p class="meta">Quo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquidQuo dui, occaecat dolores potenti proin minim nonummy orci, cillum arcu aliquid</p>
                            </div>
                        </div>
                    </div>--%>
                </div>
            </div>
        </div>
        <%-- Numbers --%>
        <div id="Numbers">
            <div class="container text-center">
                <h1 class="title">The <strong>Numbers</strong> Say it All</h1>
                <hr />
                <div id="Owl-carousel-number" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="row item active">
                            <div class="col-md-4 col-sm-4 col-xs-12 wow fadeIn">
                                <div class="number first">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">410+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12 wow fadeIn">
                                <div class="number">
                                    <i class="fa fa-navicon img-circle"></i>
                                    <h1 class="num">420+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12 wow fadeIn">
                                <div class="number">
                                    <i class="fa fa-tablet img-circle"></i>
                                    <h1 class="num">430+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                        </div>
                        <%--<div class="row item">
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">440+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">450+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">460+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row item">
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">470+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">480+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">490+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                        </div>
                        <div class="row item">
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">500+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">510+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-12">
                                <div class="number">
                                    <i class="fa fa-user img-circle"></i>
                                    <h1 class="num">520+</h1>
                                    <h2 class="title">Students</h2>
                                </div>
                            </div>
                        </div>--%>
                    </div>
                    <%-- Indicators --%>
                    <ul class="nav nav-tabs">
                        <li data-target="#Owl-carousel-number" data-slide-to="0" class="active"><a href="#"><span class="icon-bar"></span></a></li>
                        <li data-target="#Owl-carousel-number" data-slide-to="1"><a href="#"><span class="icon-bar"></span></a></li>
                        <li data-target="#Owl-carousel-number" data-slide-to="2"><a href="#"><span class="icon-bar"></span></a></li>
                        <li data-target="#Owl-carousel-number" data-slide-to="3"><a href="#"><span class="icon-bar"></span></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <%-- Campus --%>
        <div id="Campus" class="text-center">
            <h1 class="title text-center">HÌNH ẢNH HOẠT ĐỘNG</h1>
            <hr />
            <h3 class="text-center">Các hoạt động của công ty</h3>
            <div class="row HinhAnh" id="HinhAnh" runat="server">
                <%--<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn">
                    <img src="img/activity_1.jpg" class="img-responsive" />
                    <div class="caption">
                        <h3 class="title">Soccer</h3>
                        <a href="img/activity_1.jpg" rel="prettyPhoto[gallery1]" class="btn btn-default">EXPAND</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn">
                    <img src="img/activity_2.jpg" class="img-responsive" />
                    <div class="caption">
                        <h3 class="title">Soccer</h3>
                        <a href="img/activity_1.jpg" rel="prettyPhoto[gallery1]" class="btn btn-default">EXPAND</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn">
                    <img src="img/activity_3.jpg" class="img-responsive" />
                    <div class="caption">
                        <h3 class="title">Soccer</h3>
                        <a href="img/activity_1.jpg" rel="prettyPhoto[gallery1]" class="btn btn-default">EXPAND</a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 thumbnail campus first wow fadeIn">
                    <img src="img/activity_4.jpg" class="img-responsive" />
                    <div class="caption">
                        <h3 class="title">Soccer</h3>
                        <a href="img/activity_1.jpg" rel="prettyPhoto[gallery1]" class="btn btn-default">EXPAND</a>
                    </div>
                </div>--%>
            </div>
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                    <a href="Album.aspx" class="btn btn-info btn-lg">Xem Album</a>
                </div>
            </div>
        </div>
        <%-- Blogs --%>
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
        <%-- Missions --%>
        <div id="Mission">
            <div class="container text-center">
                <div class="overlay">
                    <h1 class="title wow fadeIn">SỨ MỆNH</h1>
                    <p class="meta wow fadeIn">To provide high quality, student-centered education and lifelong learning opportunities for the communities we serve.</p>
                    <p class="meta wow fadeIn">At Invent, students pursue their goals in an environment that values diversity, individuality, mutual respect and free exchange of ideas.</p>
                </div>
            </div>
        </div>
        <%-- Invent --%>
        <div id="Invent">
            <div class="container text-center wow fadeIn">
                <h1 class="title">BRAND</h1>
                <hr />
                <label>TOMS</label>
                <label>TOMS</label>
                <label>TOMS</label>
                <label>TOMS</label>
                <label>TOMS</label>
                <label>TOMS</label>
            </div>
        </div>
    </div>
</asp:Content>