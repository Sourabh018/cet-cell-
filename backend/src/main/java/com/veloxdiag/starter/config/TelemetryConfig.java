package com.veloxdiag.starter.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.veloxdiag.starter.client.TelemetryClient;
import com.veloxdiag.starter.filter.TelemetryFilter;
import com.veloxdiag.starter.properties.VeloxDiagProperties;

@Configuration
@EnableConfigurationProperties(VeloxDiagProperties.class)
public class TelemetryConfig {

    @Bean
    public TelemetryClient telemetryClient(VeloxDiagProperties properties) {
        return new TelemetryClient(properties);
    }

    @Bean
    public FilterRegistrationBean<TelemetryFilter> telemetryFilter(
            TelemetryClient telemetryClient,
            VeloxDiagProperties properties) {

        FilterRegistrationBean<TelemetryFilter> registrationBean =
                new FilterRegistrationBean<>();

        registrationBean.setFilter(
                new TelemetryFilter(telemetryClient, properties));

        registrationBean.addUrlPatterns("/*");

        registrationBean.setOrder(1);

        return registrationBean;
    }
}