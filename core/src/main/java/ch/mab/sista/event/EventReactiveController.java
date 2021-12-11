package ch.mab.sista.event;

import java.time.LocalDate;
import java.util.List;
import java.util.function.Supplier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Controller
@RequestMapping("reactive/event")
public class EventReactiveController {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());

    private final EventDto event1 = new EventDto("1", "1", LocalDate.now(), LocalDate.now().plusDays(1));
    private final EventDto event2 = new EventDto("1", "2", LocalDate.now(), LocalDate.now().plusDays(2));
    private final EventDto event3 = new EventDto("1", "3", LocalDate.now(), LocalDate.now().plusDays(3));

    // curl -i -H -X GET "http://localhost:8080/reactive/event/1"
    @GetMapping("{id}")
    @ResponseBody
    public Mono<EventDto> getEvent(@PathVariable("id") String eventId) {
        log.info("get event with id '{}'", eventId);
        Supplier<EventDto> supplier = () -> new EventDto("1", eventId, LocalDate.now(), LocalDate.now().plusDays(1));
        return Mono.fromSupplier(supplier);
    }

    @GetMapping
    @ResponseBody
    public Flux<EventDto> getAllEvents() {
        return Flux.fromIterable(List.of(event1, event2, event3));
    }
}
