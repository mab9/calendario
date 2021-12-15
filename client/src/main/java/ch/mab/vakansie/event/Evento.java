package ch.mab.vakansie.event;

import java.util.Scanner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Evento implements CommandLineRunner {

    private static final Logger LOG = LoggerFactory.getLogger(Evento.class.getName());
    private static final Scanner scanner = new Scanner(System.in);  // Create a Scanner object

    public static void main(String[] args) {
        LOG.info("STARTING THE APPLICATION");
        SpringApplication.run(Evento.class, args);
        LOG.info("APPLICATION FINISHED");
    }

    @Override
    public void run(String... args) {
        EventWebClient client = new EventWebClient();
        client.getAllEvents().subscribe((eventDto -> LOG.info("flux event '{}'", eventDto)));
        client.getEventById("1").subscribe((eventDto -> LOG.info("mono event '{}'", eventDto)));

        LOG.info("Enter event id");
        String eventId = scanner.nextLine();

        while (!eventId.equalsIgnoreCase("exit")) {
            LOG.info("Fetch event with id '{}'.", eventId);
            eventId = scanner.nextLine();
            if (!eventId.equalsIgnoreCase("exit")) {
                client.getEventById(eventId).subscribe((eventDto -> LOG.info("mono event '{}'", eventDto)));
            }
        }
    }
}