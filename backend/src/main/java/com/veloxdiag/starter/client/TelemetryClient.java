package com.veloxdiag.starter.client;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.veloxdiag.starter.model.Telemetry;
import com.veloxdiag.starter.properties.VeloxDiagProperties;

public class TelemetryClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final VeloxDiagProperties properties;

    public TelemetryClient(VeloxDiagProperties properties) {
        this.properties = properties;
    }

    public void sendTelemetry(Telemetry telemetry) {

        try {

            ResponseEntity<Telemetry> response =
                    restTemplate.postForEntity(
                            properties.getServerUrl(),
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