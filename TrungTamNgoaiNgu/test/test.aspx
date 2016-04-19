<%@ Page Title="" Language="C#" MasterPageFile="~/DinhCu.master" AutoEventWireup="true" CodeFile="test.aspx.cs" Inherits="test_test" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" Runat="Server">
    <div>
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <asp:Button ID="Button1" runat="server" Text="Button" OnClick="Button1_Click" />
    </div>
</asp:Content>