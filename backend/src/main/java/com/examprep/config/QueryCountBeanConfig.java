// CET_CELL/backend/src/main/java/com/examprep/config/QueryCountBeanConfig.java
package com.examprep.config;

import com.veloxdiag.starter.query.QueryCountInspector;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueryCountBeanConfig {

    @Bean
    public HibernatePropertiesCustomizer queryCountHibernateCustomizer() {
        return hibernateProperties ->
            hibernateProperties.put("hibernate.session_factory.statement_inspector", new QueryCountInspector());
    }
}