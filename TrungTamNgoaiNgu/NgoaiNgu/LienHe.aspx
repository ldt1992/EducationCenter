<%@ Page Title="" Language="C#" MasterPageFile="~/NgoaiNgu/NgoaiNgu.master" AutoEventWireup="true" CodeFile="LienHe.aspx.cs" Inherits="NgoaiNgu_LienHe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="LienHe">
        <!-- Title-->
        <div id="Title">
            <div class="container">
                <h1 class="title">LIÊN HỆ</h1>
            </div>
        </div>
        <!-- End Title-->

        <!-- Google Map -->
        <div id="Map">
            <div class="embed-responsive embed-responsive-4by3 ggmap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.629608643017!2d106.63517061535639!3d10.83963116098663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752983a5725757%3A0x563989ccc1d56797!2zMjMwIFBoYW4gSHV5IMONY2gsIHBoxrDhu51uZyAxMiwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1458896499248" frameborder="0" style="border: 0" allowfullscreen></iframe>
            </div>
        </div>
        <!-- End Google Map -->

        <!-- MainContent-->
        <div id="MainContent">
            <!-- Contact 1 -->
            <div id="Contact1">
                <div class="container-fluid text-center">
                    <div class="container">
                        <h1 class="title">GIỮ LIÊN LẠC VỚI CHÚNG TÔI</h1>
                        <p class="meta">
                            Cụ thể, theo Báo cáo tài chính hợp nhất đã được kiểm toán thì năm 2015, HAGL chỉ đạt 502 tỷ đồng lợi nhuận sau thuế, giảm tới 65% so với cùng kỳ năm 2014. Nguyên nhân dẫn tới kết quả kinh doanh bết bát của HAGL chủ yếu đến từ việc giá cao su giảm thê thảm, có lúc xuống dưới giá thành 1.300 USD/tấn so với mức giá 5.500 USD/tấn ở thời điểm cao nhất.
                        </p>
                    </div>
                    <div class="parallaxScroll">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-left">
                                    <h3 class="title">ĐỊA CHỈ</h3>
                                    <address>
                                        Du Học đỉnh cao châu mỹ<br />
                                        230/2 Phan Huy ích, P12, Q.Gò Vấp, TP.HCM<br />
                                    </address>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-left">
                                    <h3 class="title">LIÊN HỆ</h3>
                                    <address>
                                        Điện thoại: 0909 999 888<br />
                                        Fax: 999 999 999<br />
                                        Email: <a href="#">contact@invent.edu</a>
                                    </address>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 text-left">
                                    <h3 class="title">GIỜ LÀM VIỆC</h3>
                                    <address>
                                        Thứ Hai đến Thứ Bảy<br />
                                        9h - 18h30<br />
                                        19h - 21h30
                                    </address>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- End Contact 1 -->

            <!-- Contact 2 -->
            <div id="Contact2">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Name</label>
                                <asp:TextBox ID="TextBox1" runat="server" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Email</label>
                                <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Phone</label>
                                <asp:TextBox ID="TextBox3" runat="server" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            <div class="form-group">
                                <label>Url</label>
                                <asp:TextBox ID="TextBox4" runat="server" CssClass="form-control"></asp:TextBox>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group">
                                <label>Message</label>
                                <asp:TextBox ID="TextBox5" runat="server" TextMode="MultiLine" CssClass="form-control" Rows="10"></asp:TextBox>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <asp:Button ID="Button1" runat="server" Text="SEND THE MESSAGE" CssClass="btn btn-more btn-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Contact 2 -->
        </div>
        <!-- End MainContent-->
    </div>
</asp:Content>

