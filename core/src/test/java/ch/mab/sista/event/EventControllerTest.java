package ch.mab.sista.event;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(EventController.class)
class EventControllerTest {

    private static final String CONTROLLER_PATH = "/event";

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    @Autowired
    private MockMvc mockMvc;

    private String urlPath() {
        return CONTROLLER_PATH;
    }

    private String urlPath(String path) {
        return urlPath() + path;
    }

    @Test
    void getEvent_shouldReturnEvent_fromEventId() throws Exception {
        String eventId = "1";
        EventDto dto = new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));

        String jsonEvent = objectMapper.writeValueAsString(dto);

        this.mockMvc.perform(get(urlPath("/" + eventId)))
            .andExpect(status().isOk())
            .andExpect(content().json(jsonEvent));
    }

    @Test
    void postEvent_shouldReturnEventId_fromCreatedEvent() throws Exception {
        EventDto dtoPost = new EventDto("1", null, LocalDate.now(), LocalDate.now().plusDays(1));
        String jsonEventPost = objectMapper.writeValueAsString(dtoPost);

        EventDto dtoExpected = new EventDto("1", "1", LocalDate.now(), LocalDate.now().plusDays(1));
        String jsonEventExpected = objectMapper.writeValueAsString(dtoExpected);

        this.mockMvc.perform(post(urlPath())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(jsonEventPost))
            .andExpect(status().isOk())
            .andExpect(content().json(jsonEventExpected));
    }

    @Test
    void putEvent_shouldReturnUpdatedEvent_fromSentEvent() throws Exception {
        String eventId = "1";
        EventDto dtoPut = new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));
        String jsonEventPut = objectMapper.writeValueAsString(dtoPut);

        EventDto dtoExpected = new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(2));
        String jsonEventExpected = objectMapper.writeValueAsString(dtoExpected);

        this.mockMvc.perform(put(urlPath())
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(jsonEventPut))
            .andExpect(status().isOk())
            .andExpect(content().json(jsonEventExpected));
    }

    @Test
    void deleteEvent_shouldReturnDeletedEvent_fromEventId() throws Exception {
        String eventId = "1";

        EventDto dtoExpected = new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));
        String jsonEventExpected = objectMapper.writeValueAsString(dtoExpected);

        this.mockMvc.perform(delete(urlPath("/1")))
            .andExpect(status().isOk())
            .andExpect(content().json(jsonEventExpected));
    }
}


