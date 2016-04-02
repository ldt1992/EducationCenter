<%@ Page Title="Blog Detail" Language="C#" MasterPageFile="Agile.master" AutoEventWireup="true" CodeFile="Blog_detail.aspx.cs" Inherits="Blogs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="Blog_Detail">
        <%-- Title --%>
        <div id="Title">
            <div class="container">
                <h1 class="title">BLOG</h1>
            </div>
        </div>
        <%-- Content --%>
        <div id="Content">
            <div class="container">
                <%-- Path --%>
                <div id="Path">
                    <ol class="breadcrumb">
                        <li><a href="HomePage.aspx">Home</a></li>
                        <li class="active">Blogs</li>
                    </ol>
                </div>
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" id="MainContent">
                        <div class="blog_detail">
                            <div class="page-header">
                                <h1 class="title">GALLERY POST</h1>
                            </div>
                            <img src="img/pic14-820x400.jpg" class="img-responsive" alt="" title="" />
                            <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically strategize user friendly value and holistic relationships. Uniquely formulate out-of-the-box interfaces and economically sound users. Objectively promote alternative leadership skills after client-centered functionalities. Seamlessly transform market positioning relationships whereas user friendly supply chains value and holistic relationships.</p>
                            <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically strategize user friendly value and holistic relationships. Uniquely formulate out-of-the-box interfaces and economically sound users. Objectively promote alternative leadership skills after client-centered functionalities. Seamlessly transform market positioning relationships whereas user friendly supply chains value and holistic relationships.</p>
                            <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically strategize user friendly value and holistic relationships. Uniquely formulate out-of-the-box interfaces and economically sound users. Objectively promote alternative leadership skills after client-centered functionalities. Seamlessly transform market positioning relationships whereas user friendly supply chains value and holistic relationships.</p>
                            <p class="meta">Efficiently generate cross-unit channels rather than competitive quality vectors. Dramatically strategize user friendly value and holistic relationships. Uniquely formulate out-of-the-box interfaces and economically sound users. Objectively promote alternative leadership skills after client-centered functionalities. Seamlessly transform market positioning relationships whereas user friendly supply chains value and holistic relationships.</p>
                        </div>
                        <nav>
                            <ul class="pager">
                                <li class="previous"><a href="#">&larr; Older</a></li>
                                <li class="next"><a href="#"> Newer &rarr;</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 hidden-xs" id="Sidebar">
                        <%-- Photos --%>
                        <div id="Photos">
                            <h1 class="title">MY PHOTOS</h1>
                            <hr />
                            <a href="#">
                                <img src="img/photo-1.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-1.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-2.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-3.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-4.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-1.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-5.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                            <a href="#">
                                <img src="img/photo-6.jpg" class="img-responsive img-thumbnail" alt="" title="" /></a>
                        </div>
                        <%-- Video --%>
                        <div id="Video">
                            <h1 class="title">Video</h1>
                            <hr />
                            <div class="embed-responsive embed-responsive-4by3">
                                <iframe src="https://www.youtube.com/embed/woyXiG9LCrY"></iframe>
                            </div>
                        </div>
                        <%-- Popular posts --%>
                        <div id="PopularPost">
                            <h1 class="title">MOST POPULAR POSTS</h1>
                            <hr />
                            <div class="post">
                                <a href="#">
                                    <h2 class="title">Blog Post – Right Sidebar</h2>
                                </a>
                                <p class="meta">Nunc tempus faucibus porttitor. Mauris commodo augue auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                <hr />
                            </div>
                            <div class="post">
                                <a href="#">
                                    <h2 class="title">Blog Post – Right Sidebar</h2>
                                </a>
                                <p class="meta">Nunc tempus faucibus porttitor. Mauris commodo augue auctor nunc facilisis parturient ac tempor, montes etiam tortor rhoncus! In, aliquam. Elementum urna, tincidunt? Nisi ut urna? Arcu, odio facilisis urna magna vel, elementum integer quis nisi nisi scelerisque etiam.</p>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
