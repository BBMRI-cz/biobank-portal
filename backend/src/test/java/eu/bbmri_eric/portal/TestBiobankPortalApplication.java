package eu.bbmri_eric.portal;

import org.springframework.boot.SpringApplication;

public class TestBiobankPortalApplication {

  public static void main(String[] args) {
    SpringApplication.from(BiobankPortalApplication::main)
        .with(TestcontainersConfiguration.class)
        .run(args);
  }
}
