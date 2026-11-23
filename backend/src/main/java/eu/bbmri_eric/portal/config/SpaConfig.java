package eu.bbmri_eric.portal.config;

import java.io.IOException;
import java.time.Duration;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

@Configuration
class SpaConfig implements WebMvcConfigurer {

  private static final String STATIC_LOCATION = "classpath:/static/";
  private static final String INDEX_HTML = "index.html";

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler("/assets/**")
        .addResourceLocations(STATIC_LOCATION + "assets/")
        .setCacheControl(CacheControl.maxAge(Duration.ofDays(365)).cachePublic().immutable());

    registry
        .addResourceHandler("/**")
        .addResourceLocations(STATIC_LOCATION)
        .setCacheControl(CacheControl.noCache())
        .resourceChain(false)
        .addResolver(new SpaFallbackResolver());
  }

  private static final class SpaFallbackResolver extends PathResourceResolver {

    @Override
    protected Resource getResource(String resourcePath, Resource location) throws IOException {
      if (resourcePath.equals("api") || resourcePath.startsWith("api/")) {
        return null;
      }
      Resource resource = resourcePath.isEmpty() ? null : super.getResource(resourcePath, location);
      if (resource != null) {
        return resource;
      }
      if (lastSegment(resourcePath).contains(".")) {
        return null;
      }
      return super.getResource(INDEX_HTML, location);
    }

    private static String lastSegment(String path) {
      return path.substring(path.lastIndexOf('/') + 1);
    }
  }
}
