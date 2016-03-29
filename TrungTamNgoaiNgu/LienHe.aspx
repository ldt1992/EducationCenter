<%@ Page Title="Liên Hệ" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="LienHe.aspx.cs" Inherits="LienHe" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">
    <div id="LienHe">
        <%-- Map --%>
        <div id="Map">
            <div class="embed-responsive embed-responsive-4by3 ggmap">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.629608643017!2d106.63517061535639!3d10.83963116098663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752983a5725757%3A0x563989ccc1d56797!2zMjMwIFBoYW4gSHV5IMONY2gsIHBoxrDhu51uZyAxMiwgR8OyIFbhuqVwLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1458896499248" frameborder="0" style="border: 0" allowfullscreen></iframe>
            </div>
        </div>
        <%-- Contact --%>
        <div id="LH">
            <div class="container">
                <h2 class="title text-center">GIỮ LIÊN LẠC VỚI CHÚNG TÔI</h2>
                <hr />
                <p class="meta text-center">Hôm 20/3, một nhà phân tích quân sự Trung Quốc đăng bức ảnh trên trang mạng Weibo, thể hiện cảnh lực lượng nước này phóng tên lửa chống hạm YJ-62 cùng mái vòm radar bố trí xung quanh.</p>
            </div>
        </div>
        <%-- Image --%>
        <div id="Bg">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 bg">
                        <h3 class="title">ĐỊA CHỈ</h3>
                        <address>
                            Du Học đỉnh cao châu mỹ<br />
                            230/2 Phan Huy ích, P12, Q.Gò Vấp, TP.HCM<br />
                        </address>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 bg">
                        <h3 class="title">LIÊN HỆ</h3>
                        <address>
                            Điện thoại: 0909 999 888<br />
                            Fax: 999 999 999<br />
                            Email: <a href="#">contact@invent.edu</a>
                        </address>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 bg">
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
        <%-- Form --%>
        <div id="Form">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="form-group">
                            <label>Name:</label>
                            <asp:TextBox ID="TextBox1" runat="server" CssClass="form-control"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="form-group">
                            <label>Email:</label>
                            <asp:TextBox ID="TextBox2" runat="server" CssClass="form-control"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="form-group">
                            <label>Phone:</label>
                            <asp:TextBox ID="TextBox3" runat="server" CssClass="form-control"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div class="form-group">
                            <label>Url:</label>
                            <asp:TextBox ID="TextBox4" runat="server" CssClass="form-control"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label>Subject:</label>
                            <asp:TextBox ID="TextBox5" runat="server" CssClass="form-control"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="form-group">
                            <label>Message:</label>
                            <asp:TextBox ID="TextBox6" runat="server" CssClass="form-control" TextMode="MultiLine" Rows="10"></asp:TextBox>
                        </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <input type="submit" value="Submit" class="btn btn-info" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
