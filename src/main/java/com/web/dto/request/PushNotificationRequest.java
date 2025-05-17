package com.web.dto.request;

public class PushNotificationRequest {

    private String title;
    private String message;
    private String topic;
    private String token;


    public PushNotificationRequest() {
        super();
    }


    public PushNotificationRequest(String title, String message, String topic, String token) {
        super();
        this.title = title;
        this.message = message;
        this.topic = topic;
        this.token = token;
    }
    public String getTitle() {
        return title;
    }
    @NotBlank(message = "Mã sản phẩm không được bỏ trống")
    private String code;

    private String alias;

    @NotBlank(message = "Tên sản phẩm không được bỏ trống")
    private String name;

    private String imageBanner;

    @NotNull(message = "Giá tiền không được bỏ trống")
    private Double price;

    private String description;

    private Trademark trademark;
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getTopic() {
        return topic;
    }
    public void setTopic(String topic) {
        this.topic = topic;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }


}
