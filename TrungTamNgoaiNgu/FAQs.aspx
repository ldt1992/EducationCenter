<%@ Page Title="FAQs" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="FAQs.aspx.cs" Inherits="ThemeDinhCu_FAQs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="FAQs">
        <div id="Path">
            <div class="container">
                <h1 class="title">Câu hỏi thường xuyên</h1>
            </div>
        </div>

        <div id="Content">
            <div class="container">
                <ul class="breadcrumb">
                    <li><a href="Default.aspx">Trang Chủ</a></li>
                    <li><a href="#">Chuyên Mục</a></li>
                    <li class="active">FAQs</li>
                </ul>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" id="MainContent">
                        <div id="accFAQs" class="panel-group">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="#Reply1" data-toggle="collapse" data-parent="#accFAQs">Câu hỏi 1</a>
                                    </h4>
                                </div>
                                <div id="Reply1" class="panel-collapse collapse in">
                                    <div class="panel-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="#Reply2" data-toggle="collapse" data-parent="#accFAQs">Câu hỏi 2</a>
                                    </h4>
                                </div>
                                <div id="Reply2" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h4 class="panel-title">
                                        <a href="#Reply3" data-toggle="collapse" data-parent="#accFAQs">Câu hỏi 3</a>
                                    </h4>
                                </div>
                                <div id="Reply3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12" id="Sidebar">
                        <div id="Category">
                            <h2 class="title">Category</h2>
                            <ul class="list-group">
                                <li class="list-group-item"><a href="Testimonials.aspx">Testimonials</a></li>
                                <li class="list-group-item"><a href="Gallery.aspx">Gallery</a></li>
                                <li class="list-group-item"><a href="FAQs.aspx">FAQs</a></li>
                                <li class="list-group-item"><a href="ListBlogs.aspx">Blogs</a></li>
                            </ul>
                        </div>
                        <div id="FeaturedPosts">
                            <h3 class="title">Featured Posts</h3>
                            <div class="media post">
                                <img src="img/news-1.jpg" alt="" class="img-responsive pull-left" />
                                <div class="media-body">
                                    <a href="#">
                                        <h3 class="media-heading title">The College Interview</h3>
                                    </a>
                                    <p class="meta">May 12, 2012 || <span class="text-muted">5 Comments</span></p>
                                </div>
                            </div>
                            <div class="media post">
                                <img src="img/news-2.jpg" alt="" class="img-responsive pull-left" />
                                <div class="media-body">
                                    <a href="#">
                                        <h3 class="media-heading title">The College Interview</h3>
                                    </a>
                                    <p class="meta">May 12, 2012 || <span class="text-muted">5 Comments</span></p>
                                </div>
                            </div>
                            <div class="media post">
                                <img src="img/news-3.jpg" alt="" class="img-responsive pull-left" />
                                <div class="media-body">
                                    <a href="#">
                                        <h3 class="media-heading title">The College Interview</h3>
                                    </a>
                                    <p class="meta">May 12, 2012 || <span class="text-muted">5 Comments</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
