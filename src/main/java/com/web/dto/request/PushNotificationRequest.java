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
    public void setTitle(String title) {
        this.title = title;
    }
    
    public void setToken(String token) {
        this.token = token;
    }


}
