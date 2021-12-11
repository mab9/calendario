package ch.mab.sista.event;

import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("event")
public class EventController {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());


    // curl -i -H -X GET "http://localhost:8080/event/1"
    @GetMapping("{id}")
    @ResponseBody
    public EventDto getEvent(@PathVariable("id") String eventId) {
        log.info("get event with id '{}'", eventId);
        return new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));
    }

    // curl -i -H "Content-Type: application/json"  -d "{\"userId\":\"1\",\"id\":\"1\",\"from\":\"2020-06-12\",\"to\":\"2020-06-12\"}" -X POST "http://localhost:8080/event"
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EventDto postEvent(@RequestBody @Validated EventDto dto) {
        log.info("post event '{}'", dto);
        return new EventDto(dto.userId(), "1", dto.from(), dto.to());
    }

    // curl -i -H "Content-Type: application/json"  -d "{\"userId\":\"1\",\"id\":\"1\",\"from\":\"2020-06-12\",\"to\":\"2020-06-12\"}" -X PUT "http://localhost:8080/event"
    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EventDto putEvent(@RequestBody @Validated EventDto dto) {
        log.info("put event '{}'", dto);
        return new EventDto(dto.userId(), dto.id(), dto.from(), dto.to());
    }

    // curl -i -H -X DELETE "http://localhost:8080/event/1"
    @DeleteMapping("{id}")
    @ResponseBody
    public EventDto deleteEvent(@PathVariable("id") String eventId) {
        log.info("delete event with id '{}'", eventId);
        return new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));
    }
}
