package com.veloxdiag.starter.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.veloxdiag.starter.model.Telemetry;

public class TelemetryClient {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String SERVER_URL =
            "https://veloxdiag-server.onrender.com/api/telemetry";

    public void sendTelemetry(Telemetry telemetry) {

        try {
            ResponseEntity<Telemetry> response =
                    restTemplate.postForEntity(
                            SERVER_URL,
                            telemetry,
                            Telemetry.class);

            System.out.println("Telemetry Sent : "
                    + response.getStatusCode());

        } catch (Exception e) {

            System.out.println("Telemetry failed : "
                    + e.getMessage());
        }
    }

}
