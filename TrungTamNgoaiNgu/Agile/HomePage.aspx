<%@ Page Title="Home Page" Language="C#" MasterPageFile="Agile.master" AutoEventWireup="true" CodeFile="HomePage.aspx.cs" Inherits="HomePage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="HomePage">
        <!-- Slider -->
        <div class="container-fluid">
            <!-- Start WOWSlider.com BODY section -->
            <div id="wowslider-container1">
                <div class="ws_images">
                    <ul>
                        <li>
                            <a href="http://www.google.com">
                                <img src="img/data1/images/slidercaronfire.jpg" alt="slider-car-on-fire" title="slider-car-on-fire" id="wows1_0" />mô tả ngắn</a></li>
                        <li>
                            <img src="img/data1/images/slidermanwithlaptop.jpg" alt="slider-man-with-laptop" title="slider-man-with-laptop" id="wows1_2" />mô tả ngắn</li>
                        <li>
                            <img src="img/data1/images/sliderskyline.jpg" alt="slider-sky-line" title="slider-sky-line" id="wows1_3" />mô tả ngắn</li>
                    </ul>
                </div>
                <div class="ws_bullets">
                    <div>
                        <a href="img/data1/images/slidercaronfire.jpg" title="slider-car-on-fire"><span>
                            <img src="img/data1/tooltips/slidercaronfire.jpg" alt="slider-car-on-fire" />1</span></a>
                        <a href="img/data1/images/slidermanwithlaptop.jpg" title="slider-man-with-laptop"><span>2</span></a>
                        <a href="img/data1/images/sliderskyline.jpg" title="slider-skyline"><span>3</span></a>
                    </div>
                </div>
            </div>

            <!-- End WOWSlider.com BODY section -->
        </div>
        <!-- End Slider-->
        <!-- Khau hieu-->
        <div class="container">
            <h1 id="Title">THE<br />
                <span class="highlight">BOLD & FLAT THEME</span><br />
                THAT MEANS BUSINESS</h1>
        </div>
        <!-- End Khau hieu-->
        <!-- Features -->
        <div id="Features">
            <div class="container">
                <h1 class="text-center title">BRANDING SERVICES</h1>
                <p class="text-center meta">We simply want to make sure your brand is getting the nourishment it needs and that our service is providing the best bang for your buck. Aliquam lorem ante, dapibus in.</p>
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-heart highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-cloud highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-euro highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-safari highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-signal highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-6 service wow fadeIn">
                        <h3 class="title"><i class="fa fa-exchange highlight"></i>&nbsp;&nbsp;TIMELESS DESIGN</h3>
                        <p class="meta">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet accusam takimata sanctus.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Features -->
        <!-- Portfolio -->
        <div id="Portfolio">
            <div class="container">
                <%--<div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-12">
                        <h1 class="title">THE<br />
                            PORTFOLIO</h1>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-12 text-right">
                        <!-- Button Filter -->
                        <div id="BtnFilter">
                            <button type="button" class="btn btn-default btn-highlight" data-filter="*">All</button>
                            <button type="button" class="btn btn-default btn-highlight" data-filter=".business">Business</button>
                            <button type="button" class="btn btn-default btn-highlight" data-filter=".inspiration">Inspiration</button>
                            <button type="button" class="btn btn-default btn-highlight" data-filter=".lifestyle">Lifestyle</button>
                            <button type="button" class="btn btn-default btn-highlight" data-filter=".nature">Nature</button>
                            <button type="button" class="btn btn-default btn-highlight" data-filter=".tech">Technology</button>
                        </div>
                    </div>
                </div>
                <div class="row isotope">
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item business wow fadeInUp">
                        <a href="img/portfolio-1.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-1.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item inspiration business wow fadeInUp">
                        <a href="img/portfolio-2.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-2.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item inspiration wow fadeInUp">
                        <a href="img/portfolio-3.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-3.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item lifestyle wow fadeInUp">
                        <a href="img/portfolio-4.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-4.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item nature wow fadeInUp">
                        <a href="img/portfolio-5.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-5.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12 element-item tech wow fadeInUp">
                        <a href="img/portfolio-6.jpg" rel="prettyPhoto">
                            <img src="img/portfolio-6.jpg" class="img-responsive" alt="" title="" />
                        </a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                        <button type="button" class="btn btn-default btn-lg btn-more">More</button>
                    </div>
                </div>--%>
                <h1 class="text-center">TEACHER</h1>
                <div class="row">
                    <!-- TEACHER-->
                    <asp:Repeater ID="rpTeacher" runat="server">
                        <ItemTemplate>
                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                                <div class="thumbnail teacher">
                                    <a href="GiaoVien.aspx?id=<%# Eval("GVID") %>"><img src="img/img-client1.jpg" class="img-responsive" alt="" /></a>
                                    <div class="caption">
                                        <h3 class="title"><a href="GiaoVien.aspx?id=<%# Eval("GVID") %>"><%# Eval("FirstName") + " " + Eval("LastName") %></a></h3>
                                        <p class="meta"><%# Eval("Email") %></p>
                                    </div>
                                </div>
                            </div>
                        </ItemTemplate>
                    </asp:Repeater>
                    <!-- END TEACHER-->
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                        <a href="ListTeachers.aspx" class="btn btn-info">Xem thêm</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- End Portfolio -->
        <%-- Info --%>
        <div id="Info">
            <div class="container-fluid">
                <h1 class="text-center">VIDEO LỚP HỌC</h1>
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 info">
                        <div class="preview">
                            <div class="embed-responsive embed-responsive-16by9 video">
                                <iframe src="https://www.youtube.com/embed/tq-tg0CzOKs?list=PLKn13M_KQnX2cAy78f6szSpYW1KiUFPrs"></iframe>
                            </div>
                        </div>
                        <h3 class="title">WATCH THE VIDEO</h3>
                        <p class="meta">Trust is built on the belief in the importance of each employee’s role, on the passion and enthusiasms.</p>
                        <a href="#" class="btn btn-link"><u>Play Video</u></a>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 info">
                        <div class="preview">
                            <a href="#">
                                <img src="img/img-portfolio2.jpg" class="img-responsive" alt="" title="" />
                            </a>
                        </div>
                        <h3 class="title">OUR QUALITY WORK</h3>
                        <p class="meta">Trust is built on the belief in the importance of each employee’s role, on the passion and enthusiasms.</p>
                        <a href="#" class="btn btn-link"><u>Learn More</u></a>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 info">
                        <div class="preview">
                            <a href="#">
                                <img src="img/img-shopping2.jpg" class="img-responsive" alt="" title="" />
                            </a>
                        </div>
                        <h3 class="title">PREMIUM PRODUCTS</h3>
                        <p class="meta">Trust is built on the belief in the importance of each employee’s role, on the passion and enthusiasms.</p>
                        <a href="#" class="btn btn-link"><u>Learn More</u></a>
                    </div>
                </div>
            </div>
        </div>
        <%-- Team --%>
        <%--<div id="Team">
            <div class="container">
                <h1 class="title">OUR TEAM</h1>
                <div class="carousel slide" data-ride="carousel" id="myTabSlider">
                    <!-- Indicators -->
                    <ul class="nav nav-tabs">
                        <li data-target="#myTabSlider" data-slide-to="0" class="active"><a href="#">SHARON EDWARD</a></li>
                        <li data-target="#myTabSlider" data-slide-to="1"><a href="#">MICHAEL JOHN</a></li>
                        <li data-target="#myTabSlider" data-slide-to="2"><a href="#">JOHN THOMPSON</a></li>
                    </ul>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        <div class="item active">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pic text-center">
                                    <img src="img/team-member01.jpg" class="img-responsive img-circle" />
                                    <h2 class="name">SHARON EDWARD</h2>
                                    <p class="role text-muted">Co-Founder and Chief Designer</p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 carousel-caption">
                                    <h2 class="title">ABOUT SHARON EDWARD</h2>
                                    <hr />
                                    <p class="meta">Steven Paul Jobs was born on February 24, 1955, in San Francisco, California, to Joanne Schieble (later Joanne Simpson) and Abdulfattah “John” Jandali, two University of Wisconsin graduate students who gave their unnamed son up for adoption. His father, Abdulfattah Jandali, was a Syrian political science professor and his mother, Joanne Schieble, worked as a speech therapist. Shortly after Steve was placed for adoption, his biological parents married and had another child, Mona Simpson.</p>
                                    <hr />
                                    <h4 class="conn">CONNECT NOW:  <a href="#"><i class="fa fa-envelope"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a><a href="#"><i class="fa fa-pinterest"></i></a><a href="#"><i class="fa fa-dribbble"></i></a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pic text-center">
                                    <img src="img/team-member02.jpg" class="img-responsive img-circle" />
                                    <h2 class="name">MICHAEL JOHN</h2>
                                    <p class="role text-muted">Chief Architect</p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 carousel-caption">
                                    <h2 class="title">ABOUT MICHAEL JOHN</h2>
                                    <hr />
                                    <p class="meta">Steven Paul Jobs was born on February 24, 1955, in San Francisco, California, to Joanne Schieble (later Joanne Simpson) and Abdulfattah “John” Jandali, two University of Wisconsin graduate students who gave their unnamed son up for adoption. His father, Abdulfattah Jandali, was a Syrian political science professor and his mother, Joanne Schieble, worked as a speech therapist. Shortly after Steve was placed for adoption, his biological parents married and had another child, Mona Simpson.</p>
                                    <hr />
                                    <h4 class="conn">CONNECT NOW:  <a href="#"><i class="fa fa-envelope"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a><a href="#"><i class="fa fa-pinterest"></i></a><a href="#"><i class="fa fa-dribbble"></i></a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 pic text-center">
                                    <img src="img/team-member03.jpg" class="img-responsive img-circle" />
                                    <h2 class="name">JOHN THOMPSON</h2>
                                    <p class="role text-muted">Co-Founder and CEO</p>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 carousel-caption">
                                    <h2 class="title">ABOUT JOHN THOMPSON</h2>
                                    <hr />
                                    <p class="meta">Steven Paul Jobs was born on February 24, 1955, in San Francisco, California, to Joanne Schieble (later Joanne Simpson) and Abdulfattah “John” Jandali, two University of Wisconsin graduate students who gave their unnamed son up for adoption. His father, Abdulfattah Jandali, was a Syrian political science professor and his mother, Joanne Schieble, worked as a speech therapist. Shortly after Steve was placed for adoption, his biological parents married and had another child, Mona Simpson.</p>
                                    <hr />
                                    <h4 class="conn">CONNECT NOW:  <a href="#"><i class="fa fa-envelope"></i></a><a href="#"><i class="fa fa-facebook"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-instagram"></i></a><a href="#"><i class="fa fa-pinterest"></i></a><a href="#"><i class="fa fa-dribbble"></i></a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>--%>
        <%-- % --%>
        <%--<div id="Percent">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <h4 class="title">Web Design 87%</h4>
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-warning" aria-valuemax="100" aria-valuemin="0" aria-valuenow="87">
                                <span class="sr-only">87% Completed</span>
                            </div>
                        </div>
                        <h4 class="title">Logo Design 60%</h4>
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-danger" aria-valuemax="100" aria-valuemin="0" aria-valuenow="60">
                                <span class="sr-only">87% Completed</span>
                            </div>
                        </div>
                        <h4 class="title">Brand Marketing 70%</h4>
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-success" aria-valuemax="100" aria-valuemin="0" aria-valuenow="70">
                                <span class="sr-only">87% Completed</span>
                            </div>
                        </div>
                        <h4 class="title">SEO Services 67%</h4>
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-info" aria-valuemax="100" aria-valuemin="0" aria-valuenow="67">
                                <span class="sr-only">87% Completed</span>
                            </div>
                        </div>
                        <h4 class="title">Print Collateral 40%</h4>
                        <div class="progress progress-striped">
                            <div class="progress-bar progress-bar-success" aria-valuemax="100" aria-valuemin="0" aria-valuenow="40">
                                <span class="sr-only">87% Completed</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center">
                        <img src="img/team-member01.jpg" class="img-responsive img-circle" alt="" title="" />
                        <h2 class="name">SHARON EDWARD</h2>
                        <p class="role">Co-Founder and Chief Designer</p>
                    </div>
                </div>
            </div>
        </div>--%>
        <%-- Team2 --%>
        <div id="Team2">
            <div class="container">
                <h1 class="text-center" style="margin-bottom: 5%;">CẢM NHẬN TỪ KHÁCH HÀNG</h1>
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner" role="listbox">
                        <div class="item active">
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pic">
                                    <img src="img/img-client1.jpg" alt="..." class="img-responsive img-circle" title="" />
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 info">
                                    <h3 class="name"><i class="fa fa-quote-left"></i>&nbsp;&nbsp;&nbsp;MARY NIMISH, COO, BUSINESS VENTURES</h3>
                                    <p class="meta text-muted">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum consetetur sadipscing elitr. Amet, montes sit turpis vel penatibus turpis in mid! Cras in magna.</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pic">
                                    <img src="img/img-client2.jpg" alt="..." class="img-responsive img-circle" title="" />
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 info">
                                    <h3 class="name"><i class="fa fa-quote-left"></i>&nbsp;&nbsp;&nbsp;MARY NIMISH, COO, BUSINESS VENTURES</h3>
                                    <p class="meta text-muted">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum consetetur sadipscing elitr. Amet, montes sit turpis vel penatibus turpis in mid! Cras in magna.</p>
                                </div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 pic">
                                    <img src="img/img-client3.jpg" alt="..." class="img-responsive img-circle" title="" />
                                </div>
                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 info">
                                    <h3 class="name"><i class="fa fa-quote-left"></i>&nbsp;&nbsp;&nbsp;MARY NIMISH, COO, BUSINESS VENTURES</h3>
                                    <p class="meta text-muted">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum consetetur sadipscing elitr. Amet, montes sit turpis vel penatibus turpis in mid! Cras in magna.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <%-- Pallarax Scroll --%>
        <div id="ParallaxScroll">
            <div class="container text-center">
                <h1>Two things are infinite: the universe and human stupidity; and I'm not sure about the universe</h1>
                <h2 class="author">ALBERT EINSTEIN</h2>
            </div>
        </div>
        <%-- Client --%>
        <div id="Client">
            <div class="container-fluid text-center">
                <h1 class="title">OUR CLIENTS</h1>
                <p class="meta">We have years of experience providing top notch brand development services to top quality companies throughout the World. Lorem ipsum dolor sit amet, consectetuer elit.</p>
                <img src="img/logo01.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo03.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo04.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo05.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo06.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo07.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo11.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo12.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo13.png" class="img-responsive pull-left" alt="" title="" />
                <img src="img/logo14.png" class="img-responsive pull-left" alt="" title="" />
            </div>
        </div>
        
    </div>
</asp:Content>
