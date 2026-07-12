package com.veloxdiag.starter.filter;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.web.filter.OncePerRequestFilter;

import com.veloxdiag.starter.client.TelemetryClient;
import com.veloxdiag.starter.model.Telemetry;
import com.veloxdiag.starter.properties.VeloxDiagProperties;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class TelemetryFilter extends OncePerRequestFilter {

    private final TelemetryClient telemetryClient;
    private final VeloxDiagProperties properties;

    public TelemetryFilter(
            TelemetryClient telemetryClient,
            VeloxDiagProperties properties) {

        this.telemetryClient = telemetryClient;
        this.properties = properties;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        long startTime = System.currentTimeMillis();

        filterChain.doFilter(request, response);

        long endTime = System.currentTimeMillis();

        long duration = endTime - startTime;

        Telemetry telemetry = new Telemetry();

        telemetry.setApplicationName(properties.getApplicationName());
        telemetry.setEndpoint(request.getRequestURI());
        telemetry.setMethod(request.getMethod());
        telemetry.setStatus(response.getStatus());
        telemetry.setDurationMs(duration);
        telemetry.setTimestamp(LocalDateTime.now());

        telemetryClient.sendTelemetry(telemetry);
    }
}