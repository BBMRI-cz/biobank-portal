package eu.bbmri_eric.portal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class SecurityConfig {

  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(
        auth ->
            auth.requestMatchers("/actuator/health", "/actuator/health/**")
                .permitAll()
                .requestMatchers("/api/**", "/actuator/**")
                .authenticated()
                .anyRequest()
                .permitAll());
    return http.build();
  }
}
