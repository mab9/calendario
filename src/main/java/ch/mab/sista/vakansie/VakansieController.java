package ch.mab.sista.vakansie;

import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("vakansie")
public class VakansieController {

    private final Logger log = LoggerFactory.getLogger(this.getClass().getName());

    @PostMapping(value = "json", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody //curl -i -H "Content-Type: application/json"  -d "{\"from\":\"John Doe\",\"to\":\"gardener\"}" -X POST "http://localhost:8080/vakansie/json"
    public boolean postVakansie(@RequestBody @Validated Vakansie vakansie) {
        log.info(vakansie.toString());
        return vakansie.getTo() != null;
    }

    // curl -X POST localhost:8080/vakansie/v2?date=2021.12.15
    @PostMapping("v2")
    @ResponseBody
    public boolean dateTime(@RequestParam("date") @DateTimeFormat(pattern = "yyyy.MM.dd") LocalDate date) {
        System.out.println(date);
        return date.isBefore(LocalDate.now());
    }
}
