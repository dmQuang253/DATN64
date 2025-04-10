package com.web.controller;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class AllViewUser {

    @RequestMapping(value = {"/about"}, method = RequestMethod.GET)
    public String about(Model model) {
        return "user/about.html";
    }

    @RequestMapping(value = {"/account"}, method = RequestMethod.GET)
    public String account() {
        return "user/account.html";
    }

    @RequestMapping(value = {"/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "user/blog.html";
    }

    @RequestMapping(value = {"/blogdetail"}, method = RequestMethod.GET)
    public String blogdetail() {
        return "user/blogdetail.html";
    }

@RequestMapping(value = {"/addvoucher"}, method = RequestMethod.GET)
    public String addvoucher() {
        return "admin/addvoucher.html";
    }

    @RequestMapping(value = {"/blog"}, method = RequestMethod.GET)
    public String blog() {
        return "admin/blog.html";
    }

    @RequestMapping(value = {"/danhmuc"}, method = RequestMethod.GET)
    public String danhmuc() {
        return "admin/danhmuc.html";
    }

    @RequestMapping(value = {"/banner"}, method = RequestMethod.GET)
    public String banner() {
        return "admin/banner.html";
    }

    @RequestMapping(value = {"/chat"}, method = RequestMethod.GET)
    public String chat() {
        return "admin/chat.html";
    }

    @RequestMapping(value = {"/doanhthu"}, method = RequestMethod.GET)
    public String doanhthu() {
        return "admin/doanhthu.html";
    }

    @RequestMapping(value = {"/importproduct"}, method = RequestMethod.GET)
    public String importproduct() {
        return "admin/importproduct.html";
    }

    @RequestMapping(value = {"/index"}, method = RequestMethod.GET)
    public String index() {
        return "admin/index.html";
    }

    @RequestMapping(value = {"/invoice"}, method = RequestMethod.GET)
    public String invoice() {
        return "admin/invoice.html";
    }

    @RequestMapping(value = {"/create-invoice"}, method = RequestMethod.GET)
    public String createInvoice() {
        return "admin/createinvoice.html";
    }

    @RequestMapping(value = {"/cart"}, method = RequestMethod.GET)
    public String cart() {
        return "user/cart.html";
    }

    @RequestMapping(value = {"/checkout"}, method = RequestMethod.GET)
    public String checkout() {
        return "user/checkout.html";
    }

    @RequestMapping(value = {"/confirm"}, method = RequestMethod.GET)
    public String confirm() {
        return "user/confirm.html";
    }

    @RequestMapping(value = {"/detail"}, method = RequestMethod.GET)
    public String detail() {
        return "user/detail.html";
    }

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String home() {
        return "redirect:/index";
    }

    @RequestMapping(value = {"/index"}, method = RequestMethod.GET)
    public String index() {
        return "user/index.html";
    }

   

    @RequestMapping(value = {"/regis"}, method = RequestMethod.GET)
    public String regis() {
        return "user/regis.html";
    }


}
