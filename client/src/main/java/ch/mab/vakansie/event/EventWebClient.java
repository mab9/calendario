package ch.mab.vakansie.event;

import java.util.Objects;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class EventWebClient {

    private final WebClient client = WebClient.create("http://localhost:8080/reactive/event");

    public Mono<EventDto> getEventById(String id) {
        Objects.requireNonNull(id);
        return client.get()
            .uri("/{id}", id)
            .retrieve()
            .bodyToMono(EventDto.class);
    }

    public Flux<EventDto> getAllEvents() {
        return client.get()
            .retrieve()
            .bodyToFlux(EventDto.class);
    }
}
