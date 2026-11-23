package eu.bbmri_eric.portal.config;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest
@Import({SpaConfig.class, SecurityConfig.class})
class SpaConfigTest {

  @Autowired MockMvc mvc;

  @ParameterizedTest
  @ValueSource(strings = {"/index.html", "/biobanks", "/biobanks/42/samples"})
  void servesIndexForAppRoutes(String path) throws Exception {
    mvc.perform(get(path))
        .andExpect(status().isOk())
        .andExpect(content().string(containsString("spa-index")))
        .andExpect(header().string("Cache-Control", "no-cache"));
  }

  @Test
  void forwardsRootToIndex() throws Exception {
    mvc.perform(get("/")).andExpect(status().isOk()).andExpect(forwardedUrl("index.html"));
  }

  @ParameterizedTest
  @ValueSource(strings = {"/assets/missing.js", "/missing.png"})
  void missingFilesAreNotFound(String path) throws Exception {
    mvc.perform(get(path)).andExpect(status().isNotFound());
  }

  @ParameterizedTest
  @ValueSource(strings = {"/api", "/api/unknown"})
  void apiIsNotPublic(String path) throws Exception {
    mvc.perform(get(path)).andExpect(status().isForbidden());
  }
}
