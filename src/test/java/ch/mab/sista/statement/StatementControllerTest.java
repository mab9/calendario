package ch.mab.sista.statement;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

//@WebMvcTest(StatementController.class)
//@WebMvcTest
@SpringBootTest
@AutoConfigureMockMvc
class StatementControllerTest {

    // https://spring.io/guides/gs/testing-web/

    @Autowired
    private MockMvc mockMvc;

    @Test
    void statement_shouldReturnMessage_fromController() throws Exception {
        this.mockMvc.perform(get("/statement")).andDo(print()).andExpect(status().isOk())
            .andExpect(content().string(containsString("Gans")));
    }
}


