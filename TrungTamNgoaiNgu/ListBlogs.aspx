<%@ Page Title="List Blogs" Language="C#" MasterPageFile="DinhCu.master" AutoEventWireup="true" CodeFile="ListBlogs.aspx.cs" Inherits="ThemeDinhCu_ListBlogs" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="ListBlogs">
        <div id="Path">
            <div class="container">
                <h1 class="title">Blogs</h1>
            </div>
        </div>

        <div id="Content" class="container">
            <ul class="breadcrumb">
                <li><a href="Default.aspx">Trang Chủ</a></li>
                <li><a href="#">Chuyên Mục</a></li>
                <li class="active">Blogs</li>
            </ul>
            <div class="row">
                <%-- MainContent --%>
                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12" id="MainContent">
                    <div class="thumbnail blog">
                        <a href="#">
                            <img src="img/activity_1.jpg" alt="" class="img-responsive" /></a>
                        <div class="caption">
                            <a href="#">
                                <h3 class="title">Tiêu đề bài 1</h3>
                            </a>
                            <p class="meta">Vụ thử nghiệm diễn ra một cách an toàn và hoàn hảo, đồng thời không tác động xấu tới môi trường sinh thái. Vụ thử là giai đoạn phát triển cao hơn của lực lượng hạt nhân của Cộng hòa Dân chủ Nhân dân Triều Tiên (DPRK). Bằng việc thử nghiệm thành công bom H theo cách hoàn hảo nhất được ghi nhận trong lịch sử, Triều Tiên tự hào gia nhập hàng ngũ các nước tiên tiến sở hữu bom H và người dân Triều Tiên đã chứng minh tinh thần của dân tộc", tuyên bố chính thức của Triều Tiên viết.</p>
                            <a href="Blog_Detail.aspx" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                    <div class="thumbnail blog">
                        <a href="#">
                            <img src="img/activity_4.jpg" alt="" class="img-responsive" /></a>
                        <div class="caption">
                            <a href="#">
                                <h3 class="title">Tiêu đề bài 4</h3>
                            </a>
                            <p class="meta">Vụ thử nghiệm diễn ra một cách an toàn và hoàn hảo, đồng thời không tác động xấu tới môi trường sinh thái. Vụ thử là giai đoạn phát triển cao hơn của lực lượng hạt nhân của Cộng hòa Dân chủ Nhân dân Triều Tiên (DPRK). Bằng việc thử nghiệm thành công bom H theo cách hoàn hảo nhất được ghi nhận trong lịch sử, Triều Tiên tự hào gia nhập hàng ngũ các nước tiên tiến sở hữu bom H và người dân Triều Tiên đã chứng minh tinh thần của dân tộc", tuyên bố chính thức của Triều Tiên viết.</p>
                            <a href="Blog_Detail.aspx" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                    <div class="thumbnail blog">
                        <a href="#">
                            <img src="img/activity_2.jpg" alt="" class="img-responsive" /></a>
                        <div class="caption">
                            <a href="#">
                                <h3 class="title">Tiêu đề bài 2</h3>
                            </a>
                            <p class="meta">Vụ thử nghiệm diễn ra một cách an toàn và hoàn hảo, đồng thời không tác động xấu tới môi trường sinh thái. Vụ thử là giai đoạn phát triển cao hơn của lực lượng hạt nhân của Cộng hòa Dân chủ Nhân dân Triều Tiên (DPRK). Bằng việc thử nghiệm thành công bom H theo cách hoàn hảo nhất được ghi nhận trong lịch sử, Triều Tiên tự hào gia nhập hàng ngũ các nước tiên tiến sở hữu bom H và người dân Triều Tiên đã chứng minh tinh thần của dân tộc", tuyên bố chính thức của Triều Tiên viết.</p>
                            <a href="Blog_Detail.aspx" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                    <div class="thumbnail blog">
                        <a href="#">
                            <img src="img/activity_3.jpg" alt="" class="img-responsive" /></a>
                        <div class="caption">
                            <a href="#">
                                <h3 class="title">Tiêu đề bài 3</h3>
                            </a>
                            <p class="meta">Vụ thử nghiệm diễn ra một cách an toàn và hoàn hảo, đồng thời không tác động xấu tới môi trường sinh thái. Vụ thử là giai đoạn phát triển cao hơn của lực lượng hạt nhân của Cộng hòa Dân chủ Nhân dân Triều Tiên (DPRK). Bằng việc thử nghiệm thành công bom H theo cách hoàn hảo nhất được ghi nhận trong lịch sử, Triều Tiên tự hào gia nhập hàng ngũ các nước tiên tiến sở hữu bom H và người dân Triều Tiên đã chứng minh tinh thần của dân tộc", tuyên bố chính thức của Triều Tiên viết.</p>
                            <a href="Blog_Detail.aspx" class="btn btn-info">Read More</a>
                        </div>
                    </div>
                    <%-- Pagination --%>
                    <nav>
                        <ul class="pagination">
                            <li><a href="#">&laquo;</a></li>
                            <li class="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">&raquo;</a></li>
                        </ul>
                    </nav>
                </div>
                <%-- Sidebar --%>
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
</asp:Content>
