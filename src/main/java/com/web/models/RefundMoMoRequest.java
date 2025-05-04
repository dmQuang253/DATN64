package com.web.models;


import com.web.constants.Language;

public class RefundMoMoRequest extends Request {
    private Long amount;
    private Long transId;
    private String signature;
    private String description;

    public RefundMoMoRequest(Long amount, Long transId, String signature, String description) {
        this.amount = amount;
        this.transId = transId;
        this.signature = signature;
        this.description = description;
    }

    public RefundMoMoRequest(String partnerCode, String orderId, String requestId, Language lang, Long amount, Long transId, String signature, String description) {
        super(partnerCode, orderId, requestId, lang);
        this.amount = amount;
        this.transId = transId;
        this.signature = signature;
        this.description = description;
    }

    public Long getTransId() {
        return transId;
    }

    public void setTransId(Long transId) {
        this.transId = transId;
    }

    public String getPartnerCode() {
        return partnerCode;
    }

    public void setPartnerCode(String partnerCode) {
        this.partnerCode = partnerCode;
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getLang() {
        return lang.getLanguage();
    }

    public void setLang(Language lang) {
        this.lang = lang;
    }


    public void setSignature(String signature) {
        this.signature = signature;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
