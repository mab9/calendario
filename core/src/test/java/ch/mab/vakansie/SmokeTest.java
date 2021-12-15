package ch.mab.vakansie;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

import ch.mab.vakansie.event.controller.EventController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SmokeTest {

    // https://spring.io/guides/gs/testing-web/

    @Autowired
    private EventController controller;

    @Test
    void contextLoads() {
        assertThat(controller).isNotNull();
    }
}


