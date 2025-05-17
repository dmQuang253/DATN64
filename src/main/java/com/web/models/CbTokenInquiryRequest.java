package com.web.models;

import com.web.constants.Language;

public class CbTokenInquiryRequest extends Request {
    private String partnerClientId;
    private String signature;

    public CbTokenInquiryRequest(String partnerClientId, String signature) {
        this.partnerClientId = partnerClientId;
        this.signature = signature;
    }

    public CbTokenInquiryRequest(String partnerCode, String orderId, String requestId, Language lang, String partnerClientId, String signature) {
        super(partnerCode, orderId, requestId, lang);
        this.partnerClientId = partnerClientId;
        this.signature = signature;
    }

    public String getPartnerClientId() {
        return partnerClientId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public String getPartnerClientId() {
        return partnerClientId;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getPayUrl() {
        return payUrl;
    }

    public void setPayUrl(String payUrl) {
        this.payUrl = payUrl;
    }

    public String getShortLink() {
        return shortLink;
    }

    public void setShortLink(String shortLink) {
        this.shortLink = shortLink;
    }

    public String getDeeplink() {
        return deeplink;
    }

    public String getAesToken() {
        return aesToken;
    }
    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }
}
